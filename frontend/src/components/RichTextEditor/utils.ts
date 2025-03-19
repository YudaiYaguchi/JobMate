import { Editor } from "slate";

export const toggleMark = (
  editor: Editor,
  format: string,
  setIsActive: (isActive: boolean) => void
) => {
  const currentIsActive = isMarkActive(editor, format);

  setIsActive(!currentIsActive);

  if (currentIsActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: Editor, format: string): boolean => {
  const marks = Editor.marks(editor) as any;
  return marks ? marks[format] === true : false;
};

export const applyColor = (editor: Editor, color: string) => {
  Editor.addMark(editor, "color", color);
};

export const applyFontSize = (editor: Editor, size: string) => {
  Editor.addMark(editor, "fontSize", size);
};
export const applyBold = (editor: Editor, isBold: boolean) => {
  if (isBold) {
    Editor.addMark(editor, "bold", true);
  } else {
    Editor.removeMark(editor, "bold");
  }
};

export const applyItalic = (editor: Editor, isItalic: boolean) => {
  if (isItalic) {
    Editor.addMark(editor, "italic", true);
  } else {
    Editor.removeMark(editor, "italic");
  }
};

export const applyUnderline = (editor: Editor, isUnderline: boolean) => {
  if (isUnderline) {
    Editor.addMark(editor, "underline", true);
  } else {
    Editor.removeMark(editor, "underline");
  }
};
