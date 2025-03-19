import React, { FC } from "react";
import { Button } from "@chakra-ui/react";

type ToolbarButtonProps = {
  format: string;
  icon: any;
  onClick: () => void;
  isActive: boolean;
};

const ToolbarButton: FC<ToolbarButtonProps> = ({ format, icon, onClick, isActive }) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      style={{
        border: isActive ? "2px solid #3182ce" : "none",
        borderRadius: "5px",
        padding: "8px",
      }}
    >
      {icon}
    </Button>
  );
};

export default ToolbarButton;
