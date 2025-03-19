import { Text, VStack, Button, Input, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const Question = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Input
          placeholder="新しい質問を入力"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <Button onClick={() => setQuestions([...questions, newQuestion])} colorScheme="blue">
          追加
        </Button>
      </HStack>
      {questions.map((q, index) => (
        <HStack key={index}>
          <Text>・{q}</Text>
          <IconButton
            aria-label="削除"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default Question;