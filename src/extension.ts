"use strict";

import * as vscode from "vscode";
import { PreviewSidebarViewProvider } from "./previewer-sidebar";

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension activated");

  const previewSidebarViewProvider = new PreviewSidebarViewProvider(context.extensionUri);

  // Adding sidebar view, for the previews.
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      PreviewSidebarViewProvider.viewType,
      previewSidebarViewProvider
    )
  );

  // Adding onchange event to the active editor, so we could get the text
  // block and send to the preview afterward.
  vscode.window.onDidChangeTextEditorSelection(
    (event) => {
      if (event === undefined) {
        return;
      }

      let activeTextEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
      if (!activeTextEditor) {
        return;
      }
      
      // Getting additional info from the current cursor.
      let selection = event.selections[0];
      let currentLine = selection.start.line;

      // Recursive function that gets all previous characters from the current line,
      // until it finds a line that ends with a {WAITINPUT} tag, or the end of a string block.
      const readPreviousChars = (textEditor: vscode.TextEditor, line: number): string => {
        const previousLineRange = new vscode.Range(line - 1, 0, line, 0);
        let text = textEditor.document.getText(previousLineRange).trim();

        if (text.includes('{WAITINPUT}')) {
          const regex = /(.*){WAITINPUT}/gm;
          return text.replace(regex, '');
        } else if (text.includes(',"')) {
          const regex = /(.*),"/gm;
          return text.replace(regex, '');
        } else {
          return readPreviousChars(textEditor, line - 1) + text;
        }
      };

      // Recursive function that gets all next characters from the current line,
      // until it finds a line that ends with a {WAITINPUT} tag, or the end of a string block.
      const readNextChars = (textEditor: vscode.TextEditor, line: number): string => {
        const currentLineRange = new vscode.Range(line, 0, line + 1, 0);
        let text = textEditor.document.getText(currentLineRange).trim();

        if (text.includes('{WAITINPUT}')) {
          const regex = /{WAITINPUT}(.*)/gm;
          text = text.replace(regex, '');
        } else if (text.includes('"' + "\n")) {
          const regex = /"\n/gm;
          text = text.replace(regex, '');
        } else {
          text += readNextChars(textEditor, line + 1);
        }
        return text;
      }

      // Gets the entire text block from the current line, by using the two
      // recursive functions above.
      const getTextBlock = (textEditor: vscode.TextEditor, line: number) => {
        const previousChars = readPreviousChars(textEditor, line);
        const nextChars = readNextChars(textEditor, line);
        return previousChars + nextChars;
      }

      // Extracts all text blocks (without any script tags), from an
      // entire text block.
      const extractTextBlocks = (text: string) => {
        let formattedText = text.replace(/{[^}]*}/gm, '').replace(/\\n/gm, "\n").trim();
        return [formattedText];
      }

      // Getting all text block, between braces (including tags).
      const textBlockSelection = getTextBlock(activeTextEditor, currentLine);

      // Extracting, from the selection above, all text blocks without the tags.
      const textBlocks = extractTextBlocks(textBlockSelection);

      // Previewing the extracted text blocks.
      previewSidebarViewProvider.setPreview(textBlocks);
    },
    null,
    context.subscriptions
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}