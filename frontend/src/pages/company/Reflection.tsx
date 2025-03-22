import { Text, VStack, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";

const Reflection = () => {
  const [reflection, setReflection] = useState("");

  return (
    <RichTextEditor message="面接の反省点を入力してください" />
  );

};

export default Reflection;