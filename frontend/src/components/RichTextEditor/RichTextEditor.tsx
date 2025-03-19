import React, { useMemo, useState, useEffect, useCallback } from "react";
import { createEditor, Descendant, Editor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { VStack } from "@chakra-ui/react";
import Toolbar from "./Toolbar";
import CustomLeaf from "./CustomLeaf";
import { applyColor, applyFontSize, applyBold, applyItalic, applyUnderline } from "./utils";

const RichTextEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [color, setColor] = useState<string>("black");
  const [fontSize, setFontSize] = useState<string>("16px");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);

  const initialValue: Descendant[] = [{ children: [{ text: "" }] }];

  useEffect(() => {
    Transforms.select(editor, [0, 0]);
    applyColor(editor, "black");
  }, [editor]);

  const handleEditorChange = useCallback(() => {
    applyColor(editor, color);
    applyFontSize(editor, fontSize);
    applyBold(editor, isBold);
    applyItalic(editor, isItalic);
    applyUnderline(editor, isUnderline);
  }, [editor, color, fontSize, isBold, isItalic, isUnderline]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // デフォルトの矢印キーの動作を維持
    if (event.key.startsWith('Arrow')) {
      return;
    }
  };

  return (
    <VStack spacing={4} w="100%" p={4}>
      <Toolbar
        editor={editor}
        color={color}
        setColor={setColor}
        fontSize={fontSize}
        setFontSize={setFontSize}
        setIsBold={setIsBold}
        setIsItalic={setIsItalic}
        setIsUnderline={setIsUnderline}
      />
      <Slate editor={editor} initialValue={initialValue} onSelectionChange={handleEditorChange}>
        <Editable
          renderLeaf={(props) => <CustomLeaf {...props} />}
          placeholder="企業研究を入力してください"
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            minHeight: "150px",
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        />
      </Slate>
    </VStack>
  );
};

export default RichTextEditor;
