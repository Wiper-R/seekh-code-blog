import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
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
import { randomUUID } from "crypto";

type ToolbarButtonProps = {
  icon: LucideIcon;
  action: RichTextAction;
  disabled: boolean;
  selected: boolean;
  onAction: (action: RichTextAction) => void;
};

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
  blocktype: "p";
};

function BlockFormattingOptions() {
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
      </SelectContent>
    </Select>
  );
}

function ToolbarButton(props: ToolbarButtonProps) {
  return (
    <Button
      onClick={() => props.onAction(props.action)}
      className={cn({
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground":
          props.selected,
      })}
      disabled={props.disabled}
      size="icon"
      variant={"ghost"}
    >
      <props.icon strokeWidth={2} width={20} height={20} />
    </Button>
  );
}
// TODO: Make this reusable
function Divider() {
  return <div className="self-stretch w-0.5 bg-gray-700/50 mx-2" />;
}

type ActionType = {
  icon: LucideIcon;
  action: RichTextAction;
};

const ACTIONS: (ActionType | null)[] = [
  { icon: BoldIcon, action: RichTextAction.BOLD },
  { icon: ItalicIcon, action: RichTextAction.ITALIC },
  { icon: UnderlineIcon, action: RichTextAction.UNDERLINE },
  { icon: StrikethroughIcon, action: RichTextAction.STRIKETHROUGH },
  null,
  { icon: CodeIcon, action: RichTextAction.CODE },
  { icon: HighlighterIcon, action: RichTextAction.HIGHLIGHT },
  { icon: SuperscriptIcon, action: RichTextAction.SUPERSCRIPT },
  { icon: SubscriptIcon, action: RichTextAction.SUBSCRIPT },
  null,
  { icon: AlignLeftIcon, action: RichTextAction.ALIGNLEFT },
  { icon: AlignCenterIcon, action: RichTextAction.ALIGNCENTER },
  { icon: AlignRightIcon, action: RichTextAction.ALIGNRIGHT },
  { icon: AlignJustifyIcon, action: RichTextAction.ALIGNJUSTIFY },
  { icon: AlignStartVerticalIcon, action: RichTextAction.ALIGNSTART },
  { icon: AlignEndVerticalIcon, action: RichTextAction.ALIGNEND },
  null,
  { icon: UndoIcon, action: RichTextAction.UNDO },
  { icon: RedoIcon, action: RichTextAction.REDO },
];

// Priorities
const LOW_PRIORITY = 1;

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [disableMap, setDisableMap] = useState<{ [id: number]: boolean }>({
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
  function onAction(action: RichTextAction) {
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
  return (
    // Button Group
    <div className="flex gap-2 p-2">
      <BlockFormattingOptions />
      {ACTIONS.map((props, idx) =>
        props ? (
          <ToolbarButton
            {...props}
            onAction={onAction}
            disabled={disableMap[props.action]}
            selected={selectionMap[props.action]}
            key={props.action}
          />
        ) : (
          <Divider key={`divider-${idx}`} />
        ),
      )}
    </div>
  );
}

export { ToolbarPlugin };
