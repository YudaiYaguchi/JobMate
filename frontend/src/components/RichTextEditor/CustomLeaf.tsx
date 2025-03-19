import React from "react";

const CustomLeaf = ({ attributes, children, leaf }: { attributes: any; children: any; leaf: any }) => {
  let style: React.CSSProperties = {};
  if (leaf.bold) style.fontWeight = "bold";
  if (leaf.italic) style.fontStyle = "italic";
  if (leaf.underline) style.textDecoration = "underline";
  if (leaf.color) style.color = leaf.color;
  if (leaf.fontSize) style.fontSize = leaf.fontSize;

  return <span {...attributes} style={style}>{children}</span>;
};

export default CustomLeaf;
