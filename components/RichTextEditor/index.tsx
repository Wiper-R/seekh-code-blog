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
import { EditorThemeClasses, ElementNode } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import { cn } from "@/lib/utils";
import "./editor.scss";

const theme: EditorThemeClasses = {
  text: {
    bold: "text-bold",
    italic: "italic",
    highlight: "bg-yellow-600",
    code: "bg-gray-200 font-mono border border-gray-400 p-0.5",
    underline: "underline",
    strikethrough: "line-through",
  },
  heading: {
    h1: "text-4xl font-extrabold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
  },
  paragraph: "text-base",
  code: "font-mono bg-gray-300 p-5 ml-12 rounded-md block editor-code",
  codeHighlight: {
    keyword: "text-red-800",
  },
};

function onError(e: any) {
  console.log(e);
}

function RichTextEditor({ className }: { className: string }) {
  const initialConfig: InitialConfigType = {
    namespace: "Blog Editor",
    theme,
    onError,
    nodes: [HeadingNode, CodeNode, CodeHighlightNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="mb-3 mt-4">
        <ToolbarPlugin />
      </div>
      <div className={cn("relative flex flex-col min-h-[600px]", className)}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="flex-grow overflow-auto outline-none border-black border rounded text-lg p-2" />
          }
          placeholder={
            <div className="absolute top-2 left-2 text-lg text-gray-400 select-none">
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CodeHighlightPlugin />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

export { RichTextEditor };
