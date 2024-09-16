"use client";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import {
  $getRoot,
  $insertNodes,
  EditorThemeClasses,
  LexicalEditor,
} from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import { cn } from "@/lib/utils";
import DraggableBlockPlugin from "./plugins/DragableBlockPlugin";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from "@lexical/html";
import { ImageNode } from "./nodes/ImageNode";
import ImagesPlugin from "./plugins/ImagesPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import TabIndentPlugin from "./plugins/TabIndentPlugin";

const theme: EditorThemeClasses = {
  text: {
    bold: "article-text-bold",
    italic: "article-text-italic",
    highlight: "article-text-highlight",
    code: "article-text-code",
    underline: "article-text-underline",
    strikethrough: "article-text-strikethrough",
  },
  image: "editor-image",
  heading: {
    h1: "article-heading-h1",
    h2: "article-heading-h2",
    h3: "article-heading-h3",
    h4: "article-heading-h4",
    h5: "article-heading-h5",
    h6: "article-heading-h6",
  },
  list: {
    ol: "article-ordered-list",
    ul: "article-unordered-list",
    olDepth: ["article-ol-depth-1", "article-ol-depth-2"],
    listitem: "article-list-item",
    nested: {
      list: "article-nested-list",
      listitem: "article-nested-list-item",
    },
  },
  quote: "article-quote",
  paragraph: "article-paragraph",
  code: "article-codeblock",
  codeHighlight: {
    atrule: "article-codeHighlight-atrule",
    attr: "article-codeHighlight-attr",
    boolean: "article-codeHighlight-boolean",
    builtin: "article-codeHighlight-builtin",
    cdata: "article-codeHighlight-cdata",
    char: "article-codeHighlight-char",
    class: "article-codeHighlight-class",
    "class-name": "article-codeHighlight-class-name",
    comment: "article-codeHighlight-comment",
    constant: "article-codeHighlight-constant",
    deleted: "article-codeHighlight-deleted",
    doctype: "article-codeHighlight-doctype",
    entity: "article-codeHighlight-entity",
    function: "article-codeHighlight-function",
    important: "article-codeHighlight-important",
    inserted: "article-codeHighlight-inserted",
    keyword: "article-codeHighlight-keyword",
    namespace: "article-codeHighlight-namespace",
    number: "article-codeHighlight-number",
    operator: "article-codeHighlight-operator",
    prolog: "article-codeHighlight-prolog",
    property: "article-codeHighlight-property",
    punctuation: "article-codeHighlight-punctuation",
    regex: "article-codeHighlight-regex",
    selector: "article-codeHighlight-selector",
    string: "article-codeHighlight-string",
    symbol: "article-codeHighlight-symbol",
    tag: "article-codeHighlight-tag",
    url: "article-codeHighlight-url",
    variable: "article-codeHighlight-variable",
  },
};
function onError(e: any) {
  console.log(e);
}

type RichTextEditorProps = {
  className?: string;
  defaultValue?: string;
  setEditor?: React.Dispatch<SetStateAction<LexicalEditor | null>>;
};

function SetEditorComponent({
  setEditor,
}: {
  setEditor: React.Dispatch<SetStateAction<LexicalEditor | null>>;
}) {
  const [editor] = useLexicalComposerContext();
  setEditor(editor);
  return null;
}

function LoadInitialState({ defaultValue }: { defaultValue: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(defaultValue, "text/html");
    editor.update(() => {
      const nodes = $generateNodesFromDOM(editor, doc);
      $getRoot().clear();
      $getRoot().select();
      $insertNodes(nodes);
    });
  }, []);
  return null;
}

function RichTextEditor({
  className,
  setEditor,
  defaultValue,
}: RichTextEditorProps) {
  const initialConfig: InitialConfigType = {
    namespace: "Blog Editor",
    theme,
    onError,
    nodes: [
      HeadingNode,
      CodeNode,
      CodeHighlightNode,
      ImageNode,
      ListNode,
      ListItemNode,
      QuoteNode,
    ],
  };

  const [anchorElem, setAnchorElement] = useState<HTMLDivElement>();

  function onRef(element: HTMLDivElement) {
    if (element !== null) {
      setAnchorElement(element);
    }
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {setEditor && <SetEditorComponent setEditor={setEditor} />}
      {defaultValue && <LoadInitialState defaultValue={defaultValue} />}
      <div className={cn("relative flex flex-col flex-grow", className)}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <div ref={onRef} className="flex-grow flex relative">
              <ContentEditable
                className={cn(
                  "flex-grow outline-none border-border border rounded text-lg px-8 py-2 resize-y focus:border-primary"
                )}
              />
              <DraggableBlockPlugin anchorElem={anchorElem} />
            </div>
          }
          placeholder={
            <div className="absolute top-2 left-8 text-lg text-gray-400 select-none pointer-events-none">
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CodeHighlightPlugin />
        <ListPlugin />
        <ImagesPlugin />
        <TabIndentPlugin />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

export { RichTextEditor };
