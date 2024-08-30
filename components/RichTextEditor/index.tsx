"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { EditorThemeClasses } from "lexical";

const theme: EditorThemeClasses = {
  text: {
    bold: "text-bold",
    italic: "italic",
    highlight: "bg-yellow-600",
    code: "bg-gray-200 font-mono border border-gray-400 p-0.5",
    underline: "underline",
    strikethrough: "line-through",
  },
};

function onError(e: any) {
  console.log(e);
}

function RichTextEditor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <div className="relative m-2">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-32 overflow-auto outline-none border-black border rounded text-lg p-2" />
          }
          placeholder={
            <div className="absolute top-2 left-2 text-lg text-gray-400 select-none">
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

export { RichTextEditor };
