"use client";
import {
  COMMAND_PRIORITY_NORMAL,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
} from "lexical";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function TabIndentPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handleTabPress = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault(); // Prevents default tab behavior (focus shift)
        if (event.shiftKey) {
          // Shift + Tab for outdenting
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        } else {
          // Tab for indenting
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }
      }
    };

    window.addEventListener("keydown", handleTabPress);

    return () => {
      window.removeEventListener("keydown", handleTabPress);
    };
  }, [editor]);

  return null;
}

export default TabIndentPlugin;
