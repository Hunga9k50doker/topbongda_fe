import React from "react";
import SimpleMDE from "react-simplemde-editor";
import { styled } from "@mui/material/styles";
const BoldIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-type-bold" viewBox="0 0 16 16">
  <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
</svg>`;
const ItalicIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-type-italic" viewBox="0 0 16 16">
  <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
</svg>`;
const StrikethroughIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-type-strikethrough" viewBox="0 0 16 16">
  <path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/>
</svg>`;
const ImageIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
</svg>`;
const LinkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-link" viewBox="0 0 16 16">
  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
  <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
</svg>`;
const FullScreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
</svg>`;

const options: any = {
  minHeight: "100px",
  autoDownloadFontAwesome: false,
  spellChecker: false,
  placeholder: "Nội dung bài viết...",
  status: ["lines", "words", "cursor"],
  insertTexts: {
    horizontalRule: ["", "\n\n-----\n\n"],
    image: ["![](", ")"],
    link: ["[", "]()"],
  },
  toolbar: [
    {
      name: "bold",
      action: (editor: any) => {
        editor.toggleBold();
      },
      title: "In đậm",
      icon: BoldIcon,
    },
    {
      name: "italic",
      action: (editor: any) => {
        editor.toggleItalic();
      },
      title: "In nghiêng",
      icon: ItalicIcon,
    },
    {
      name: "strikethrough",
      action: (editor: any) => {
        editor.toggleStrikethrough();
      },
      title: "Gạch bỏ",
      icon: StrikethroughIcon,
    },
    "|",
    {
      name: "drawImage",
      action: (editor: any) => {
        editor.drawImage();
      },
      title: "Chèn ảnh",
      icon: ImageIcon,
    },
    {
      name: "drawLink",
      action: (editor: any) => {
        editor.drawLink();
      },
      title: "Chèn link",
      icon: LinkIcon,
    },
    "|",
    {
      name: "toggleFullScreen",
      action: (editor: any) => {
        editor.toggleFullScreen();
      },
      title: "Mở đầy màn hình",
      icon: FullScreenIcon,
    },
  ],
};

interface MarkdownEditorProps {
  onChange?: (value: string) => void;
  value?: string;
}

function MarkdownEditor({ onChange, value, ...props }: MarkdownEditorProps) {
  return (
    <Div>
      <SimpleMDE onChange={onChange} value={value} options={options} />
    </Div>
  );
}

export default MarkdownEditor;

const Div = styled("div")`
  .editor-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #f7f7f7;
  }

  .CodeMirror {
    font-family: monospace;
    height: 300px;
    color: #000;
    direction: ltr;
  }

  .CodeMirror-lines {
    padding: 4px 0;
  }

  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    padding: 0 4px;
  }

  .CodeMirror-gutter-filler,
  .CodeMirror-scrollbar-filler {
    background-color: #fff;
  }

  .CodeMirror-gutters {
    border-right: 1px solid #ddd;
    background-color: #f7f7f7;
    white-space: nowrap;
  }

  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap;
  }

  .CodeMirror-guttermarker {
    color: #000;
  }

  .CodeMirror-guttermarker-subtle {
    color: #999;
  }

  .CodeMirror-cursor {
    border-left: 1px solid #000;
    border-right: none;
    width: 0;
  }

  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver;
  }

  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #7e7;
  }

  .cm-fat-cursor div.CodeMirror-cursors {
    z-index: 1;
  }

  .cm-fat-cursor .CodeMirror-line::selection,
  .cm-fat-cursor .CodeMirror-line > span::selection,
  .cm-fat-cursor .CodeMirror-line > span > span::selection {
    background: 0 0;
  }

  .cm-fat-cursor .CodeMirror-line::-moz-selection,
  .cm-fat-cursor .CodeMirror-line > span::-moz-selection,
  .cm-fat-cursor .CodeMirror-line > span > span::-moz-selection {
    background: 0 0;
  }

  .cm-fat-cursor {
    caret-color: transparent;
  }

  @-moz-keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  @-webkit-keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  @keyframes blink {
    50% {
      background-color: transparent;
    }
  }

  .cm-tab {
    display: inline-block;
    text-decoration: inherit;
  }

  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: 0;
    overflow: hidden;
  }

  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0;
    bottom: 0;
    position: absolute;
  }

  .cm-s-default .cm-header {
    color: #00f;
  }

  .cm-s-default .cm-quote {
    color: #090;
  }

  .cm-negative {
    color: #d44;
  }

  .cm-positive {
    color: #292;
  }

  .cm-header,
  .cm-strong {
    font-weight: 700;
  }

  .cm-em {
    font-style: italic;
  }

  .cm-link {
    text-decoration: underline;
  }

  .cm-strikethrough {
    text-decoration: line-through;
  }

  .cm-s-default .cm-keyword {
    color: #708;
  }

  .cm-s-default .cm-atom {
    color: #219;
  }

  .cm-s-default .cm-number {
    color: #164;
  }

  .cm-s-default .cm-def {
    color: #00f;
  }

  .cm-s-default .cm-variable-2 {
    color: #05a;
  }

  .cm-s-default .cm-type,
  .cm-s-default .cm-variable-3 {
    color: #085;
  }

  .cm-s-default .cm-comment {
    color: #a50;
  }

  .cm-s-default .cm-string {
    color: #a11;
  }

  .cm-s-default .cm-string-2 {
    color: #f50;
  }

  .cm-s-default .cm-meta {
    color: #555;
  }

  .cm-s-default .cm-qualifier {
    color: #555;
  }

  .cm-s-default .cm-builtin {
    color: #30a;
  }

  .cm-s-default .cm-bracket {
    color: #997;
  }

  .cm-s-default .cm-tag {
    color: #170;
  }

  .cm-s-default .cm-attribute {
    color: #00c;
  }

  .cm-s-default .cm-hr {
    color: #999;
  }

  .cm-s-default .cm-link {
    color: #00c;
  }

  .cm-s-default .cm-error {
    color: red;
  }

  .cm-invalidchar {
    color: red;
  }

  .CodeMirror-composing {
    border-bottom: 2px solid;
  }

  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #0b0;
  }

  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #a22;
  }

  .CodeMirror-matchingtag {
    background: rgba(255, 150, 0, 0.3);
  }

  .CodeMirror-activeline-background {
    background: #e8f2ff;
  }

  .CodeMirror {
    position: relative;
    overflow: hidden;
    background: #fff;
  }

  .CodeMirror-scroll {
    overflow: scroll !important;
    margin-bottom: -50px;
    margin-right: -50px;
    padding-bottom: 50px;
    height: 100%;
    outline: 0;
    position: relative;
    z-index: 0;
  }

  .CodeMirror-sizer {
    position: relative;
    border-right: 50px solid transparent;
  }

  .CodeMirror-gutter-filler,
  .CodeMirror-hscrollbar,
  .CodeMirror-scrollbar-filler,
  .CodeMirror-vscrollbar {
    position: absolute;
    z-index: 6;
    display: none;
    outline: 0;
  }

  .CodeMirror-vscrollbar {
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .CodeMirror-hscrollbar {
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }

  .CodeMirror-scrollbar-filler {
    right: 0;
    bottom: 0;
  }

  .CodeMirror-gutter-filler {
    left: 0;
    bottom: 0;
  }

  .CodeMirror-gutters {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    z-index: 3;
  }

  .CodeMirror-gutter {
    white-space: normal;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -50px;
  }

  .CodeMirror-gutter-wrapper {
    position: absolute;
    z-index: 4;
    background: 0 0 !important;
    border: none !important;
  }

  .CodeMirror-gutter-background {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4;
  }

  .CodeMirror-gutter-elt {
    position: absolute;
    cursor: default;
    z-index: 4;
  }

  .CodeMirror-gutter-wrapper ::selection {
    background-color: transparent;
  }

  .CodeMirror-gutter-wrapper ::-moz-selection {
    background-color: transparent;
  }

  .CodeMirror-lines {
    cursor: text;
    min-height: 1px;
  }

  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    border-width: 0;
    background: 0 0;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: inherit;
    color: inherit;
    z-index: 2;
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
  }

  .CodeMirror-wrap pre.CodeMirror-line,
  .CodeMirror-wrap pre.CodeMirror-line-like {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }

  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }

  .CodeMirror-linewidget {
    position: relative;
    z-index: 2;
    padding: 0.1px;
  }

  .CodeMirror-rtl pre {
    direction: rtl;
  }

  .CodeMirror-code {
    outline: 0;
  }

  .CodeMirror-gutter,
  .CodeMirror-gutters,
  .CodeMirror-linenumber,
  .CodeMirror-scroll,
  .CodeMirror-sizer {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none;
  }

  .CodeMirror-measure pre {
    position: static;
  }

  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    z-index: 3;
  }

  div.CodeMirror-dragcursors {
    visibility: visible;
  }

  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }

  .CodeMirror-selected {
    background: #d9d9d9;
  }

  .CodeMirror-focused .CodeMirror-selected {
    background: #d7d4f0;
  }

  .CodeMirror-crosshair {
    cursor: crosshair;
  }

  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: #d7d4f0;
  }

  .CodeMirror-line::-moz-selection,
  .CodeMirror-line > span::-moz-selection,
  .CodeMirror-line > span > span::-moz-selection {
    background: #d7d4f0;
  }

  .cm-searching {
    background-color: #ffa;
    background-color: rgba(255, 255, 0, 0.4);
  }

  .cm-force-border {
    padding-right: 0.1px;
  }

  @media print {
    .CodeMirror div.CodeMirror-cursors {
      visibility: hidden;
    }
  }

  .cm-tab-wrap-hack:after {
    content: "";
  }

  span.CodeMirror-selectedtext {
    background: 0 0;
  }

  .EasyMDEContainer {
    display: block;
  }

  .CodeMirror-rtl pre {
    direction: rtl;
  }

  .EasyMDEContainer.sided--no-fullscreen {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .EasyMDEContainer .CodeMirror {
    box-sizing: border-box;
    height: auto;
    border: 1px solid #ced4da;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 10px;
    font: inherit;
    z-index: 0;
    word-wrap: break-word;
  }

  .EasyMDEContainer .CodeMirror-scroll {
    cursor: text;
  }

  .EasyMDEContainer .CodeMirror-fullscreen {
    background: #fff;
    position: fixed !important;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    z-index: 8;
    border-right: none !important;
    border-bottom-right-radius: 0 !important;
  }

  .EasyMDEContainer .CodeMirror-sided {
    width: 50% !important;
  }

  .EasyMDEContainer.sided--no-fullscreen .CodeMirror-sided {
    border-right: none !important;
    border-bottom-right-radius: 0;
    position: relative;
    flex: 1 1 auto;
  }

  .EasyMDEContainer .CodeMirror-placeholder {
    opacity: 0.5;
  }

  .EasyMDEContainer .CodeMirror-focused .CodeMirror-selected {
    background: #d9d9d9;
  }

  .editor-toolbar {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    padding: 9px 10px;
    border-top: 1px solid #ced4da;
    border-left: 1px solid #ced4da;
    border-right: 1px solid #ced4da;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .editor-toolbar.fullscreen {
    width: 100%;
    height: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    background: #fff;
    border: 0;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: 9;
  }

  .editor-toolbar.fullscreen::before {
    width: 20px;
    height: 50px;
    background: -moz-linear-gradient(left, #fff 0, rgba(255, 255, 255, 0) 100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, #fff),
      color-stop(100%, rgba(255, 255, 255, 0))
    );
    background: -webkit-linear-gradient(
      left,
      #fff 0,
      rgba(255, 255, 255, 0) 100%
    );
    background: -o-linear-gradient(left, #fff 0, rgba(255, 255, 255, 0) 100%);
    background: -ms-linear-gradient(left, #fff 0, rgba(255, 255, 255, 0) 100%);
    background: linear-gradient(to right, #fff 0, rgba(255, 255, 255, 0) 100%);
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }

  .editor-toolbar.fullscreen::after {
    width: 20px;
    height: 50px;
    background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0, #fff 100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, rgba(255, 255, 255, 0)),
      color-stop(100%, #fff)
    );
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0,
      #fff 100%
    );
    background: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0, #fff 100%);
    background: -ms-linear-gradient(left, rgba(255, 255, 255, 0) 0, #fff 100%);
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0, #fff 100%);
    position: fixed;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
  }

  .EasyMDEContainer.sided--no-fullscreen .editor-toolbar {
    width: 100%;
  }

  .editor-toolbar .easymde-dropdown,
  .editor-toolbar button {
    background: 0 0;
    display: inline-block;
    text-align: center;
    text-decoration: none !important;
    height: 30px;
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;
  }

  .editor-toolbar button {
    font-weight: 700;
    min-width: 30px;
    padding: 0 6px;
    white-space: nowrap;
  }

  .editor-toolbar button.active,
  .editor-toolbar button:hover {
    background: #fcfcfc;
    border-color: #95a5a6;
  }

  .editor-toolbar i.separator {
    display: inline-block;
    width: 0;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #fff;
    color: transparent;
    text-indent: -10px;
    margin: 0 6px;
  }

  .editor-toolbar button:after {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 65%;
    vertical-align: text-bottom;
    position: relative;
    top: 2px;
  }

  .editor-toolbar button.heading-1:after {
    content: "1";
  }

  .editor-toolbar button.heading-2:after {
    content: "2";
  }

  .editor-toolbar button.heading-3:after {
    content: "3";
  }

  .editor-toolbar button.heading-bigger:after {
    content: "▲";
  }

  .editor-toolbar button.heading-smaller:after {
    content: "▼";
  }

  .editor-toolbar.disabled-for-preview button:not(.no-disable) {
    opacity: 0.6;
    pointer-events: none;
  }

  @media only screen and (max-width: 700px) {
    .editor-toolbar i.no-mobile {
      display: none;
    }
  }

  .editor-statusbar {
    display: flex;
    align-items: center;
    space-x: 2;
    fons-size: 12px;
    paddingy: 1px;
  }

  .EasyMDEContainer.sided--no-fullscreen .editor-statusbar {
    width: 100%;
  }

  .editor-statusbar span {
    display: inline-block;
  }

  .editor-statusbar .lines:before {
    content: "dòng: ";
  }

  .editor-statusbar .words:before {
    content: "số từ: ";
  }

  .editor-statusbar .characters:before {
    content: "ký tự: ";
  }

  .editor-preview-full {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 7;
    overflow: auto;
    display: none;
    box-sizing: border-box;
  }

  .editor-preview-side {
    position: fixed;
    bottom: 0;
    width: 50%;
    top: 50px;
    right: 0;
    z-index: 9;
    overflow: auto;
    display: none;
    box-sizing: border-box;
    border: 1px solid #ddd;
    word-wrap: break-word;
  }

  .editor-preview-active-side {
    display: block;
  }

  .EasyMDEContainer.sided--no-fullscreen .editor-preview-active-side {
    flex: 1 1 auto;
    height: auto;
    position: static;
  }

  .editor-preview-active {
    display: block;
  }

  .editor-preview {
    padding: 10px;
    background: #fafafa;
  }

  .editor-preview > p {
    margin-top: 0;
  }

  .editor-preview pre {
    background: #eee;
    margin-bottom: 10px;
  }

  .editor-preview table td,
  .editor-preview table th {
    border: 1px solid #ddd;
    padding: 5px;
  }

  .cm-s-easymde .cm-tag {
    color: #63a35c;
  }

  .cm-s-easymde .cm-attribute {
    color: #795da3;
  }

  .cm-s-easymde .cm-string {
    color: #183691;
  }

  .cm-s-easymde .cm-header-1 {
    font-size: calc(1.375rem + 1.5vw);
  }

  .cm-s-easymde .cm-header-2 {
    font-size: calc(1.325rem + 0.9vw);
  }

  .cm-s-easymde .cm-header-3 {
    font-size: calc(1.3rem + 0.6vw);
  }

  .cm-s-easymde .cm-header-4 {
    font-size: calc(1.275rem + 0.3vw);
  }

  .cm-s-easymde .cm-header-5 {
    font-size: 1.25rem;
  }

  .cm-s-easymde .cm-header-6 {
    font-size: 1rem;
  }

  .cm-s-easymde .cm-header-1,
  .cm-s-easymde .cm-header-2,
  .cm-s-easymde .cm-header-3,
  .cm-s-easymde .cm-header-4,
  .cm-s-easymde .cm-header-5,
  .cm-s-easymde .cm-header-6 {
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .cm-s-easymde .cm-comment {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
  }

  .cm-s-easymde .cm-link {
    color: #7f8c8d;
  }

  .cm-s-easymde .cm-url {
    color: #aab2b3;
  }

  .cm-s-easymde .cm-quote {
    color: #7f8c8d;
    font-style: italic;
  }

  .editor-toolbar .easymde-dropdown {
    position: relative;
    background: linear-gradient(
      to bottom right,
      #fff 0,
      #fff 84%,
      #333 50%,
      #333 100%
    );
    border-radius: 0;
    border: 1px solid #fff;
  }

  .editor-toolbar .easymde-dropdown:hover {
    background: linear-gradient(
      to bottom right,
      #fff 0,
      #fff 84%,
      #333 50%,
      #333 100%
    );
  }

  .easymde-dropdown-content {
    display: block;
    visibility: hidden;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    padding: 8px;
    z-index: 2;
    top: 30px;
  }

  .easymde-dropdown:active .easymde-dropdown-content,
  .easymde-dropdown:focus .easymde-dropdown-content,
  .easymde-dropdown:focus-within .easymde-dropdown-content {
    visibility: visible;
  }

  .easymde-dropdown-content button {
    display: block;
  }

  span[data-img-src]::after {
    content: "";
    background-image: var(--bg-image);
    display: block;
    max-height: 100%;
    max-width: 100%;
    background-size: contain;
    height: 0;
    padding-top: var(--height);
    width: var(--width);
    background-repeat: no-repeat;
  }

  .CodeMirror
    .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word) {
    background: rgba(255, 0, 0, 0.15);
  }
`;
