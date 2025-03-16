import { Text, VStack, Button, Textarea, Input, Box, HStack, Select } from "@chakra-ui/react";
import { useState } from "react";

const EntrySheet = () => {
  const [es, setEs] = useState("");
  const [title, setTitle] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [savedEntries, setSavedEntries] = useState<
    { title: string; es: string; maxLength: string; savedLength: number }[]
  >([]);

  const lengthOptions = [
    100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800,
  ];

  const handleSave = () => {
    if (title.trim() && es.trim() && maxLength.trim()) {
      setSavedEntries([...savedEntries, { title, es, maxLength, savedLength: es.length }]);
      setTitle("");
      setEs("");
      setMaxLength("");
    }
  };

  return (
    <VStack align="stretch" spacing={4}>
      <HStack>
        <Input
          placeholder="設問を入力してください  例）当社への志望動機を教えてください。"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          placeholder="文字数を選択"
          value={maxLength}
          onChange={(e) => setMaxLength(e.target.value)}
          w="200px"
        >
          {lengthOptions.map((length) => (
            <option key={length} value={length}>
              {length}文字
            </option>
          ))}
        </Select>
      </HStack>
      <Textarea
        placeholder="回答を入力してください 例）私が貴社を志望した理由は．．．"
        value={es}
        onChange={(e) => setEs(e.target.value)}
        h="30vh"
      />
      <Text fontSize="sm" color="gray.500">
        文字数: {es.length} / {maxLength || "制限なし"}
      </Text>
      <Button colorScheme="blue" onClick={handleSave}>
        ESを保存
      </Button>

      <Box mt={6} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
        <HStack justify="space-between" mb={2}>
          <Text fontSize="lg" fontWeight="bold">設問・回答</Text>
        </HStack>

        {savedEntries.length > 0 ? (
          savedEntries.map((entry, index) => (
            <HStack key={index} p={3} borderWidth={1} borderRadius="md" mb={2} bg="white">
              <Box flex="1">
                <Text fontSize="md" fontWeight="bold" whiteSpace="pre-wrap">{entry.title}</Text>
                <Text mt={1} whiteSpace="pre-wrap">{entry.es}</Text>
              </Box>
              <VStack>
                <Text fontSize="md" color="gray.700">現在:{entry.savedLength}文字</Text>
                <Text fontSize="md" color="gray.700">制限:{entry.maxLength}文字</Text>
              </VStack>
            </HStack>
          ))
        ) : (
          <Text color="gray.500">登録された設問・回答はありません。</Text>
        )}
      </Box>
    </VStack>
  );
};

export default EntrySheet;
