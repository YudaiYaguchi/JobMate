import {
  Text,
  VStack,
  Button,
  Textarea,
  Input,
  Box,
  HStack,
  Select,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";

const EntrySheet = () => {
  const [es, setEs] = useState("");
  const [title, setTitle] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [savedEntries, setSavedEntries] = useState<
    { title: string; es: string; maxLength: string; savedLength: number }[]
  >([]);

  const lengthOptions = [
    100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800,
  ];

  const handleSave = () => {
    if (title.trim() && es.trim() && maxLength.trim()) {
      if (editingIndex !== null) {
        // 編集モード：既存のエントリーを更新
        const updatedEntries = [...savedEntries];
        updatedEntries[editingIndex] = {
          title,
          es,
          maxLength,
          savedLength: es.length,
        };
        setSavedEntries(updatedEntries);
        setEditingIndex(null);
      } else {
        // 新規作成モード：新しいエントリーを追加
        setSavedEntries([
          ...savedEntries,
          { title, es, maxLength, savedLength: es.length },
        ]);
      }
      setTitle("");
      setEs("");
      setMaxLength("");
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index === editingIndex ? null : index);
  };

  const handleUpdate = (
    index: number,
    field: "title" | "es",
    value: string
  ) => {
    const updatedEntries = [...savedEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: value,
      savedLength:
        field === "es" ? value.length : updatedEntries[index].savedLength,
    };
    setSavedEntries(updatedEntries);
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Box gap="4" p={4} borderWidth={1} borderRadius="md" bg="gray.50">
        <HStack>
          <Input
            _hover={{ borderColor: "blue" }}
            bg="white"
            borderColor="#4A4A4A"
            placeholder="設問を入力してください  例）当社への志望動機を教えてください。"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            _hover={{ borderColor: "blue" }}
            bg="white"
            borderColor="#4A4A4A"
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
          _hover={{ borderColor: "blue" }}
          bg="white"
          marginTop="6"
          placeholder="回答を入力してください 例）私が貴社を志望した理由は..."
          value={es}
          borderColor="#4A4A4A"
          onChange={(e) => setEs(e.target.value)}
          h="30vh"
        />
        <Text fontSize="sm" color="gray.500" marginTop="6">
          文字数: {es.length} / {maxLength || "制限なし"}
        </Text>
        <Button colorScheme="blue" onClick={handleSave} w="full" marginTop="6">
          ESを保存
        </Button>
      </Box>

      <Box mt={6} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
        <HStack justify="space-between" mb={2}>
          <Text fontSize="lg" fontWeight="bold">
            設問・回答
          </Text>
        </HStack>

        {savedEntries.length > 0 ? (
          savedEntries.map((entry, index) => (
            <Box
              key={index}
              position="relative"
              p={3}
              borderWidth={1}
              borderRadius="md"
              mb={2}
              bg="white"
            >
              <IconButton
                aria-label="編集"
                icon={<EditIcon />}
                size="sm"
                variant="ghost"
                position="absolute"
                top={2}
                right={2}
                onClick={() => handleEdit(index)}
              />

              <HStack align="center" spacing={4}>
                <Box flex="1">
                  {editingIndex === index ? (
                    <VStack align="stretch" spacing={3}>
                      <Input
                        value={entry.title}
                        onChange={(e) =>
                          handleUpdate(index, "title", e.target.value)
                        }
                        fontSize="md"
                        fontWeight="bold"
                      />
                      <Textarea
                        value={entry.es}
                        onChange={(e) =>
                          handleUpdate(index, "es", e.target.value)
                        }
                        fontSize="md"
                        minH="unset"
                        resize="vertical"
                        overflow="hidden"
                        rows={Math.ceil(entry.es.length / 40)}
                      />
                    </VStack>
                  ) : (
                    <>
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        whiteSpace="pre-wrap"
                      >
                        {entry.title}
                      </Text>
                      <Text mt={1} whiteSpace="pre-wrap">
                        {entry.es}
                      </Text>
                    </>
                  )}
                </Box>

                <VStack
                  minW="100px"
                  minH="100px"
                  justify="center"
                  align="center"
                  display="flex"
                  alignSelf="center" // 親要素内で垂直中央揃え
                >
                  <Text fontSize="md" color="gray.700">
                    現在:{entry.savedLength}文字
                  </Text>
                  <Text fontSize="md" color="gray.700">
                    制限:{entry.maxLength}文字
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))
        ) : (
          <Text color="gray.500">登録された設問・回答はありません。</Text>
        )}
      </Box>
    </VStack>
  );
};

export default EntrySheet;
