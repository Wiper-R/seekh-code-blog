import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  DRAGSTART_COMMAND,
  LexicalCommand,
  LexicalEditor,
} from "lexical";
import { $createImageNode, ImageNode, ImagePayload } from "../nodes/ImageNode";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND");
export function InsertImageUriDialogBody({
  onClick,
}: {
  onClick: (payload: InsertImagePayload) => void;
}) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  return (
    <>
      <Input
        placeholder="Image Source"
        onChange={(e) => {
          setSrc(e.target.value);
        }}
        value={src}
        data-test-id="image-modal-url-input"
      />
      <Input
        placeholder="Alt Text"
        onChange={(e) => setAltText(e.target.value)}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <Button
        data-test-id="image-modal-confirm-btn"
        disabled={isDisabled}
        onClick={() => onClick({ altText, src })}
      >
        Confirm
      </Button>
    </>
  );
}

export function InsertImageDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {
  const hasModifier = useRef(false);

  useEffect(() => {
    hasModifier.current = false;
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [activeEditor]);

  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };
  return <InsertImageUriDialogBody onClick={onClick} />;
}
export default function ImagesPlugin({
  captionsEnabled,
}: {
  captionsEnabled?: boolean;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
      // editor.registerCommand<DragEvent>(
      //   DRAGSTART_COMMAND,
      //   (event) => {
      //     return $onDragStart(event);
      //   },
      //   COMMAND_PRIORITY_HIGH
      // ),
      // editor.registerCommand<DragEvent>(
      //   DRAGOVER_COMMAND,
      //   (event) => {
      //     return $onDragover(event);
      //   },
      //   COMMAND_PRIORITY_LOW
      // ),
      // editor.registerCommand<DragEvent>(
      //   DROP_COMMAND,
      //   (event) => {
      //     return $onDrop(event, editor);
      //   },
      //   COMMAND_PRIORITY_HIGH
      // )
    );
  }, [captionsEnabled, editor]);

  return null;
}
