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
import DraggableBlockPlugin from "./plugins/DragableBlogPlugin";
import { useRef, useState } from "react";

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
  code: "font-mono bg-gray-300 p-5 rounded-md block editor-code",
  codeHighlight: {
    keyword: "text-red-800",
    variable: "text-yellow-800",
    number: "text-blue-800",
    comment: "text-gray-600",
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

  const [anchorElem, setAnchorElement] = useState<HTMLDivElement>();

  function onRef(element: HTMLDivElement) {
    console.log(`On Ref Called ${element}`);
    if (element !== null) {
      setAnchorElement(element);
    }
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="mb-3 mt-4">
        <ToolbarPlugin />
      </div>
      <div className={cn("relative flex flex-col min-h-[600px]", className)}>
        <RichTextPlugin
          contentEditable={
            <div ref={onRef} className="flex-grow flex">
              <ContentEditable className="flex-grow overflow-auto outline-none border-border border rounded text-lg px-8 py-2 resize-y focus:border-primary" />
            </div>
          }
          placeholder={
            <div className="absolute top-2 left-8 text-lg text-gray-400 select-none pointer-events-none">
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <DraggableBlockPlugin anchorElem={anchorElem} />
        <CodeHighlightPlugin />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

export { RichTextEditor };
