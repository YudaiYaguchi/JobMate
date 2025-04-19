import { FC, useEffect, useState } from "react";
import { Editor } from "slate";
import { HStack } from "@chakra-ui/react";
import ToolbarButton from "./ToolbarButton";
import ColorPicker from "./ColorPicker";
import FontSizeSelector from "./FontSizeSelector";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { toggleMark } from "./utils";

type ToolbarProps = {
  editor: Editor;
  color: string;
  setColor: (color: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  setIsBold: (isBold: boolean) => void;
  setIsItalic: (isItalic: boolean) => void;
  setIsUnderline: (isUnderline: boolean) => void
};

const Toolbar: FC<ToolbarProps> = ({
  editor,
  color,
  setColor,
  fontSize,
  setFontSize,
  setIsBold,
  setIsItalic,
  setIsUnderline,
}) => {
  const toolbarItems = [
    { format: "bold", icon: <FaBold /> },
    { format: "italic", icon: <FaItalic /> },
    { format: "underline", icon: <FaUnderline /> },
  ];

  const [isActive, setIsActive] = useState<{ [key: string]: boolean }>({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    setIsBold(isActive.bold);
    setIsItalic(isActive.italic);
    setIsUnderline(isActive.underline);
  }, [isActive])

  const handleToggleMark = (format: string) => {
    toggleMark(editor, format, (activeState) => {
      setIsActive((prevState) => ({
        ...prevState,
        [format]: activeState,
      }));
    });
  };

  return (
    <HStack spacing={3}>
      {toolbarItems.map(({ format, icon }) => (
        <ToolbarButton
          key={format}
          format={format}
          icon={icon}
          onClick={() => handleToggleMark(format)}
          isActive={isActive[format]}
        />
      ))}
      <ColorPicker editor={editor} color={color} setColor={setColor} />
      <FontSizeSelector editor={editor} fontSize={fontSize} setFontSize={setFontSize} />
    </HStack>
  );
};

export default Toolbar;
