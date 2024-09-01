import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
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

enum RichTextAction {
  BOLD,
  ITALIC,
  UNDERLINE,
  STRIKETHROUGH,
  CODE,
  HIGHLIGHT,
  SUPERSCRIPT,
  SUBSCRIPT,
  ALIGNLEFT,
  ALIGNCENTER,
  ALIGNRIGHT,
  ALIGNJUSTIFY,
  ALIGNSTART,
  ALIGNEND,
  DIVIDER,
  UNDO,
  REDO,
}

const blockTypeMapping = {
  p: "Default Paragraph",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  code: "Code",
  quote: "Quote",
};

type BlockFormattingOptionsProps = {
  blocktype: keyof typeof blockTypeMapping;
};

function BlockFormattingOptions(props: BlockFormattingOptionsProps) {
  return (
    <Select value="p">
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="p">Default Paragraph</SelectItem>
        <SelectItem value="h1">Heading 1</SelectItem>
        <SelectItem value="h2">Heading 2</SelectItem>
        <SelectItem value="h3">Heading 3</SelectItem>
        <SelectItem value="h4">Heading 4</SelectItem>
        <SelectItem value="h5">Heading 5</SelectItem>
        <SelectItem value="h6">Heading 6</SelectItem>
        <SelectItem value="code">Code</SelectItem>
        <SelectItem value="quote">Quote</SelectItem>
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
    case RichTextAction.ALIGNLEFT:
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
      break;
    case RichTextAction.ALIGNCENTER:
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
      break;
    case RichTextAction.ALIGNRIGHT:
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
      break;
    case RichTextAction.ALIGNJUSTIFY:
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
      break;
    case RichTextAction.ALIGNSTART:
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "start");
      break;
    case RichTextAction.ALIGNEND:
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "end");
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
      { icon: SuperscriptIcon, action: RichTextAction.SUBSCRIPT },
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
            key={idx}
            orientation="vertical"
            className="self-stretch h-[unset]"
          />
        ) : (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => handleRichTextAction(editor, action.action)}
            key={action.action}
            className={cn({
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground":
                selectionMap[action.action],
            })}
            disabled={disabledMap[action.action]}
          >
            <action.icon width={20} height={20} />
          </Button>
        ),
      )}
    </>
  );
}

type ElementFormatDropdownProps = {
  editor: LexicalEditor;
};

function ElementFormatDropdwon({ editor }: ElementFormatDropdownProps) {
  const options: { icon: LucideIcon; label: string; action: RichTextAction }[] =
    [
      {
        icon: AlignLeftIcon,
        label: "Left Align",
        action: RichTextAction.ALIGNLEFT,
      },
      {
        icon: AlignCenterIcon,
        label: "Center Align",
        action: RichTextAction.ALIGNCENTER,
      },

      {
        icon: AlignRightIcon,
        label: "Right Align",
        action: RichTextAction.ALIGNRIGHT,
      },
      {
        icon: AlignJustifyIcon,
        label: "Justify Align",
        action: RichTextAction.ALIGNJUSTIFY,
      },
      {
        icon: AlignStartVerticalIcon,
        label: "Start Align",
        action: RichTextAction.ALIGNSTART,
      },
      {
        icon: AlignEndVerticalIcon,
        label: "End Align",
        action: RichTextAction.ALIGNEND,
      },
    ];
  return (
    <Select
      onValueChange={(value) => handleRichTextAction(editor, parseInt(value))}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {/* Todo: Use a value instead of label */}
        {options.map((option, idx) => (
          <SelectItem value={option.action.toString()} key={idx}>
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
    {},
  );
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
    }
  };
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) =>
        editorState.read(() => updateToolbar()),
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (payload) => {
          updateToolbar();
          return false;
        },
        LOW_PRIORITY,
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
        LOW_PRIORITY,
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
        LOW_PRIORITY,
      ),
    );
  }, [editor]);
  return (
    // Button Group
    <div className="flex gap-2 p-2">
      <BlockFormattingOptions blocktype="p" />
      <RichTextOptions
        editor={editor}
        selectionMap={selectionMap}
        disabledMap={disabledMap}
      />
      <Separator orientation="vertical" className="h-[unset] self-stretch" />
      <ElementFormatDropdwon editor={editor} />
    </div>
  );
}

export { ToolbarPlugin };
