import { Text, VStack, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const Reflection = () => {
  const [reflection, setReflection] = useState("");

  return (
    <VStack spacing={4} align="stretch">
      <Textarea
        placeholder="ここに面接の反省点を書いてください"
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        h="30vh"
      />
      <Text fontSize="sm" color="gray.500">
        文字数: {reflection.length}
      </Text>
      <Button colorScheme="blue">反省を保存</Button>
    </VStack>
  );

};

export default Reflection;