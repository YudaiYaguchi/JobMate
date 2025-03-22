import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { VStack, Box } from "@chakra-ui/react";
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
  const [isFocused, setIsFocused] = useState(false);

  const initialValue: Descendant[] = [{ children: [{ text: "" }] }];

  const handleEditorChange = useCallback(() => {
    applyColor(editor, color);
    applyFontSize(editor, fontSize);
    applyBold(editor, isBold);
    applyItalic(editor, isItalic);
    applyUnderline(editor, isUnderline);

    setIsFocused(true);
  }, [editor, color, fontSize, isBold, isItalic, isUnderline]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key.startsWith("Arrow")) {
      return;
    }
  };

  return (
    <VStack spacing={4} w="100%" p={4} borderWidth={1} borderRadius="md" bg="gray.50">
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
      <Box
        borderRadius="6px"
        borderColor={isFocused ? "blue" : "#4A4A4A"}
        borderWidth="1px"
        w="full"
        _hover={{ borderColor: "blue" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}>

        <Slate editor={editor} initialValue={initialValue} onSelectionChange={handleEditorChange}>
          <Editable
            renderLeaf={(props) => <CustomLeaf {...props} />}
            placeholder="企業研究を入力してください"
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              border: "none",
              minHeight: "150px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "white",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
          />
        </Slate>
      </Box>

    </VStack>
  );
};

export default RichTextEditor;
