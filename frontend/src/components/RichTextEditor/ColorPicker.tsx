import { FC, useEffect, useState } from "react";
import { Editor } from "slate";
import { HStack, Box, IconButton } from "@chakra-ui/react";
import { applyColor } from "./utils";

type ColorPickerProps = {
  editor: Editor;
  color: string;
  setColor: (color: string) => void;
};

const colors = ["black", "red", "blue", "green", "purple"];

const ColorPicker: FC<ColorPickerProps> = ({ editor, color, setColor }) => {
  const [isActive, setIsActive] = useState<{ [key: string]: boolean }>({
    black: true,
    red: false,
    blue: false,
    green: false,
    purple: false,
  });

  useEffect(() => {
    const updatedState: { [key: string]: boolean } = {};
    colors.forEach((colorOption) => {
      updatedState[colorOption] = color === colorOption;
    });
    setIsActive(updatedState);
  }, [color]);

  return (
    <HStack spacing={2}>
      {colors.map((colorOption) => (
        <IconButton
          key={colorOption}
          icon={<Box bg={colorOption} w={6} h={6} />}
          onClick={() => {
            setColor(colorOption);
            applyColor(editor, colorOption);
          }}
          aria-label={colorOption}
          variant="ghost"
          _hover={{ bg: `${colorOption}.100` }}
          _active={{ bg: `${colorOption}.200` }}
          style={{
            backgroundColor: isActive[colorOption] ? "gray.200" : "transparent",
            border: isActive[colorOption] ? "2px solid #cbd5e0" : "none",
          }}
        />
      ))}
    </HStack>
  );
};

export default ColorPicker;
