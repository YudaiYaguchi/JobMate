import { FC } from "react";
import { Editor } from "slate";
import { Select } from "@chakra-ui/react";
import { applyFontSize } from "./utils";

type FontSizeSelectorProps = {
  editor: Editor;
  fontSize: string;
  setFontSize: (size: string) => void;
};

const FontSizeSelector: FC<FontSizeSelectorProps> = ({ editor, fontSize, setFontSize }) => {
  const sizes = ["16px", "18px", "20px", "24px"];

  return (
    <Select
      borderColor="#4A4A4A"
      value={fontSize}
      onChange={(e) => {
        setFontSize(e.target.value);
        applyFontSize(editor, e.target.value);
      }}
      w="120px"
      size="sm"
      variant="flushed"
    >
      {sizes.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </Select>
  );
};

export default FontSizeSelector;
