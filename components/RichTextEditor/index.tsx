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
import DraggableBlockPlugin from "./plugins/DragableBlogPlugin";
import { useRef, useState } from "react";

// TODO: Make underline and strikethough (toggable but not at same time)
const theme: EditorThemeClasses = {
  text: {
    bold: "article-text-bold",
    italic: "article-text-italic",
    highlight: "article-text-highlight",
    code: "article-text-code",
    underline: "article-text-underline",
    strikethrough: "article-text-strikethrough",
  },
  heading: {
    h1: "article-heading-h1",
    h2: "article-heading-h2",
    h3: "article-heading-h3",
    h4: "article-heading-h4",
    h5: "article-heading-h5",
    h6: "article-heading-h6",
  },
  paragraph: "article-paragraph",
  code: "article-codeblock",
  codeHighlight: {
    keyword: "article-codeHighlight-keyword",
    variable: "article-codeHighlight-variable",
    number: "article-codeHighlight-number",
    comment: "article-codeHighlight-comment",
    string: "article-codeHighlight-string",
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
              <ContentEditable className="flex-grow outline-none border-border border rounded text-lg px-8 py-2 resize-y focus:border-primary" />
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
