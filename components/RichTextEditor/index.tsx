"use client";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { EditorThemeClasses } from "lexical";
import { HeadingNode } from "@lexical/rich-text";

const theme: EditorThemeClasses = {
  text: {
    bold: "text-bold",
    italic: "italic",
    highlight: "bg-yellow-600",
    code: "bg-gray-200 font-mono border border-gray-400 p-0.5",
    underline: "underline",
    strikethrough: "line-through",
  },
  heading: { h1: "text-3xl font-bold" },
};

function onError(e: any) {
  console.log(e);
}

function RichTextEditor() {
  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <div className="relative m-2">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-[600px] overflow-auto outline-none border-black border rounded text-lg p-2" />
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
