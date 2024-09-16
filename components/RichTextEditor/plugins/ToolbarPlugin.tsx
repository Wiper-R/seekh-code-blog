"use client";
import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isLinkNode } from "@lexical/link";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  AlignCenterIcon,
  AlignEndVerticalIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignStartVerticalIcon,
  BoldIcon,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  LucideIcon,
  RedoIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getSelectedNode } from "../utils/getSelectedNode";
import { $setBlocksType } from "@lexical/selection";
import { $createCodeNode, $isCodeNode } from "@lexical/code";
import ImageComponent from "../nodes/ImageComponent";
import { InsertImageDialog } from "./ImagesPlugin";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from "@lexical/list";

enum RichTextAction {
  BOLD,
  ITALIC,
  UNDERLINE,
  STRIKETHROUGH,
  CODE,
  HIGHLIGHT,
  SUPERSCRIPT,
  SUBSCRIPT,
  UNDO,
  REDO,
}
const blockTypeToBlockName = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  code: "Code Block",
  quote: "Quote",
  number: "Number List",
  bullet: "Bullet List",
};

type BlockFormatDropdownProps = {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
};

function BlockFormatDropdown({ blockType, editor }: BlockFormatDropdownProps) {
  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  };
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };
  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };
  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };
  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  };
  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();
        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertRawText(textContent);
            }
          }
        }
      });
    }
  };
  return (
    <Select
      value={blockType}
      onValueChange={(value: keyof typeof blockTypeToBlockName) => {
        console.log(value);
        if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(value)) {
          formatHeading(value as HeadingTagType);
        } else if (value === "paragraph") {
          formatParagraph();
        } else if (value == "code") {
          formatCode();
        } else if (value == "number") {
          formatNumberedList();
        } else if (value == "bullet") {
          formatBulletList();
        } else if (value == "quote") {
          formatQuote();
        }
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(blockTypeToBlockName).map(([value, label], idx) => (
          <SelectItem value={value} key={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function handleRichTextAction(editor: LexicalEditor, action: RichTextAction) {
  switch (action) {
    case RichTextAction.BOLD:
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      break;

    case RichTextAction.ITALIC:
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      break;
    case RichTextAction.UNDERLINE:
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
      break;
    case RichTextAction.STRIKETHROUGH:
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
      break;
    case RichTextAction.CODE:
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
      break;
    case RichTextAction.HIGHLIGHT:
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
      break;
    case RichTextAction.SUPERSCRIPT:
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
      break;
    case RichTextAction.SUBSCRIPT:
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
      break;
    case RichTextAction.UNDO:
      editor.dispatchCommand(UNDO_COMMAND, undefined);
      break;
    case RichTextAction.REDO:
      editor.dispatchCommand(REDO_COMMAND, undefined);
      break;
    default:
      throw new Error("Unhandled action");
  }
}

type RichTextOptionsProps = {
  editor: LexicalEditor;
  selectionMap: { [id: number]: boolean };
  disabledMap: { [id: number]: boolean };
};

function RichTextOptions({
  editor,
  selectionMap,
  disabledMap,
}: RichTextOptionsProps) {
  // Undefined is used for dividers
  const actions: ({ icon: LucideIcon; action: RichTextAction } | undefined)[] =
    [
      { icon: BoldIcon, action: RichTextAction.BOLD },
      { icon: ItalicIcon, action: RichTextAction.ITALIC },
      { icon: UnderlineIcon, action: RichTextAction.UNDERLINE },
      { icon: StrikethroughIcon, action: RichTextAction.STRIKETHROUGH },
      undefined,
      { icon: HighlighterIcon, action: RichTextAction.HIGHLIGHT },
      { icon: CodeIcon, action: RichTextAction.CODE },
      { icon: SuperscriptIcon, action: RichTextAction.SUPERSCRIPT },
      { icon: SubscriptIcon, action: RichTextAction.SUBSCRIPT },
      undefined,
      { icon: UndoIcon, action: RichTextAction.UNDO },
      { icon: RedoIcon, action: RichTextAction.REDO },
    ];

  return (
    <>
      {actions.map((action, idx) =>
        !action ? (
          <Separator
            key={`${idx}-separator`}
            orientation="vertical"
            className="self-stretch h-[unset]"
          />
        ) : (
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={() => handleRichTextAction(editor, action.action)}
            key={idx}
            className={cn({
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground":
                selectionMap[action.action],
            })}
            disabled={disabledMap[action.action]}
          >
            <action.icon width={20} height={20} />
          </Button>
        )
      )}
    </>
  );
}

type ElementFormatDropdownProps = {
  editor: LexicalEditor;
  elementFormat: string;
  setElementFormat: (value: string) => void;
};

function ElementFormatDropdwon({
  editor,
  elementFormat,
  setElementFormat,
}: ElementFormatDropdownProps) {
  const options: {
    icon: LucideIcon;
    label: string;
    value: ElementFormatType;
  }[] = [
    {
      icon: AlignLeftIcon,
      label: "Left Align",
      value: "left",
    },
    {
      icon: AlignCenterIcon,
      label: "Center Align",
      value: "center",
    },

    {
      icon: AlignRightIcon,
      label: "Right Align",
      value: "right",
    },
    {
      icon: AlignJustifyIcon,
      label: "Justify Align",
      value: "justify",
    },
    {
      icon: AlignStartVerticalIcon,
      label: "Start Align",
      value: "start",
    },
    {
      icon: AlignEndVerticalIcon,
      label: "End Align",
      value: "end",
    },
  ];
  function handleElementFormatChange(format: ElementFormatType) {
    setElementFormat(format);
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  }
  return (
    <Select
      value={elementFormat}
      onValueChange={(value) =>
        handleElementFormatChange(value as ElementFormatType)
      }
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, idx) => (
          <SelectItem value={option.value} key={idx}>
            <div className="gap-3 flex items-center">
              <option.icon />
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Priorities
const LOW_PRIORITY = 1;

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [disabledMap, setDisableMap] = useState<{ [id: number]: boolean }>({
    [RichTextAction.UNDO]: true,
    [RichTextAction.REDO]: true,
  });
  const [selectionMap, setSelectionMap] = useState<{ [id: number]: boolean }>(
    {}
  );
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [elementFormat, setElementFormat] = useState("left");
  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const newSelectionMap = {
        [RichTextAction.BOLD]: selection.hasFormat("bold"),
        [RichTextAction.ITALIC]: selection.hasFormat("italic"),
        [RichTextAction.UNDERLINE]: selection.hasFormat("underline"),
        [RichTextAction.STRIKETHROUGH]: selection.hasFormat("strikethrough"),
        [RichTextAction.CODE]: selection.hasFormat("code"),
        [RichTextAction.HIGHLIGHT]: selection.hasFormat("highlight"),
        [RichTextAction.SUBSCRIPT]: selection.hasFormat("subscript"),
        [RichTextAction.SUPERSCRIPT]: selection.hasFormat("superscript"),
      };
      setSelectionMap(newSelectionMap);
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }
      setElementFormat(
        ($isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType()) || "left"
      );
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          // @ts-ignore
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
          // if ($isCodeNode(element)) {
          //   const language =
          //     element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
          //   setCodeLanguage(
          //     language ? CODE_LANGUAGE_MAP[language] || language : ""
          //   );
          //   return;
          // }
        }
      }
    }
  };
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) =>
        editorState.read(() => updateToolbar())
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (payload) => {
          updateToolbar();
          return false;
        },
        LOW_PRIORITY
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setDisableMap((prevDisableMap) => ({
            ...prevDisableMap,
            [RichTextAction.UNDO]: !payload,
          }));
          return false;
        },
        LOW_PRIORITY
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setDisableMap((prevDisableMap) => ({
            ...prevDisableMap,
            [RichTextAction.REDO]: !payload,
          }));
          return false;
        },
        LOW_PRIORITY
      )
    );
  }, [editor]);
  return (
    // Button Group
    <div className="flex gap-2 sticky top-0 z-10 bg-stone-900">
      <BlockFormatDropdown blockType={blockType} editor={editor} />
      <RichTextOptions
        editor={editor}
        selectionMap={selectionMap}
        disabledMap={disabledMap}
      />
      <Separator orientation="vertical" className="h-[unset] self-stretch" />
      <ElementFormatDropdwon
        editor={editor}
        elementFormat={elementFormat}
        setElementFormat={setElementFormat}
      />
      <Button onClick={() => setImageDialogOpen(true)}>Image</Button>
      {imageDialogOpen && (
        <InsertImageDialog
          activeEditor={editor}
          onClose={() => setImageDialogOpen(false)}
        />
      )}
    </div>
  );
}

export { ToolbarPlugin };
