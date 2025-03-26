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
import { useState, useRef, useEffect } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CopyButton from "../../components/CopyButton";

const EntrySheet = () => {
  const [es, setEs] = useState("");
  const [title, setTitle] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [savedEntries, setSavedEntries] = useState<
    { title: string; es: string; maxLength: string; savedLength: number }[]
  >([]);

  // テキストエリアの参照を保持するためのrefオブジェクト
  const textareaRefs = useRef<{ [key: number]: HTMLTextAreaElement | null }>(
    {}
  );

  // 編集モードが変更されたときにテキストエリアの高さを調整
  useEffect(() => {
    savedEntries.forEach((_, index) => {
      if (editingIndex === index && textareaRefs.current[index]) {
        const textarea = textareaRefs.current[index];
        if (textarea) {
          // 高さをリセットしてからコンテンツに合わせて調整
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      }
    });
  }, [editingIndex, savedEntries]); // 編集状態が変わったときとエントリー内容が変わったときに実行

  // テキストエリアの高さを調整する関数
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

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

  const handleDelete = (index: number) => {
    const updatedEntries = savedEntries.filter((_, i) => i !== index);
    setSavedEntries(updatedEntries);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
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
              p={4}
              borderWidth={1}
              borderRadius="md"
              mb={2}
              bg="white"
            >
              <Box position="absolute" top={2} right={2} display="flex">
                <CopyButton copyText={entry.es} />
                <IconButton
                  aria-label="編集"
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => handleEdit(index)}
                />
                <IconButton
                  aria-label="削除"
                  icon={<DeleteIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDelete(index)}
                />
              </Box>

              <HStack align="center" spacing={4}>
                <Box flex="1">
                  {editingIndex === index ? (
                    <VStack align="stretch" spacing={3} borderColor="#4A4A4A">
                      <Input
                        value={entry.title}
                        onChange={(e) =>
                          handleUpdate(index, "title", e.target.value)
                        }
                        fontSize="md"
                      />
                      <Textarea
                        value={entry.es}
                        onChange={(e) => {
                          handleUpdate(index, "es", e.target.value);
                          // 入力中にも高さを調整
                          if (textareaRefs.current[index]) {
                            adjustTextareaHeight(textareaRefs.current[index]!);
                          }
                        }}
                        // refを設定し、高さ調整のためのスタイルも適用
                        ref={(el) => {
                          textareaRefs.current[index] = el;
                          if (el) {
                            adjustTextareaHeight(el);
                          }
                        }}
                        fontSize="md"
                        minH="50px"
                        resize="vertical"
                        overflowY="hidden"
                        rows={1}
                      />
                      <HStack width="full" justify="flex-end">
                        <Button size="sm" onClick={handleCancelEdit}>
                          キャンセル
                        </Button>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          onClick={() => setEditingIndex(null)}
                        >
                          保存
                        </Button>
                      </HStack>
                    </VStack>
                  ) : (
                    <>
                      <VStack gap={2} align="stretch">
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          whiteSpace="pre-wrap"
                          color="blue.600"
                        >
                          Q. {entry.title}
                        </Text>
                        <Box pl={6} borderLeftWidth={2} borderColor="gray.200">
                          <Text
                            fontWeight="bold"
                            fontSize="lg"
                            display="inline"
                            pb={2}
                          >
                            A.{" "}
                          </Text>
                          <Text mt={2} whiteSpace="pre-wrap" display="inline">
                            {entry.es}
                          </Text>
                        </Box>
                      </VStack>
                    </>
                  )}
                </Box>

                <VStack
                  minW="100px"
                  minH="100px"
                  justify="center"
                  align="center"
                  display="flex"
                  alignSelf="center"
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
