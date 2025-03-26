import {
  Text,
  VStack,
  Button,
  Input,
  HStack,
  IconButton,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const Question = () => {
  const [questions, setQuestions] = useState<
    Array<{
      question: string;
      answer: string;
      isEditing?: boolean;
      editQuestion?: string;
      editAnswer?: string;
    }>
  >([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // テキストエリアの参照を保持するためのrefオブジェクト
  const textareaRefs = useRef<{ [key: number]: HTMLTextAreaElement | null }>(
    {}
  );

  // 編集モードが変更されたときにテキストエリアの高さを調整
  useEffect(() => {
    questions.forEach((item, index) => {
      if (item.isEditing && textareaRefs.current[index]) {
        const textarea = textareaRefs.current[index];
        if (textarea) {
          // 高さをリセットしてからコンテンツに合わせて調整
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      }
    });
  }, [questions.map((q) => q.isEditing).join(",")]); // 編集状態が変わったときだけ実行

  const handleEdit = (index: number) => {
    setQuestions(
      questions.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isEditing: !item.isEditing,
            editQuestion: item.isEditing ? undefined : item.question,
            editAnswer: item.isEditing ? undefined : item.answer,
          };
        }
        return { ...item, isEditing: false };
      })
    );
  };

  const handleEditChange = (
    index: number,
    field: "editQuestion" | "editAnswer",
    value: string
  ) => {
    setQuestions(
      questions.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleUpdate = (index: number) => {
    setQuestions(
      questions.map((item, i) => {
        if (i === index) {
          return {
            question: item.editQuestion || item.question,
            answer: item.editAnswer || item.answer,
            isEditing: false,
          };
        }
        return item;
      })
    );
  };

  // テキストエリアの高さを調整する関数
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <Box bg="gray.50" gap={4} p={4}>
        <VStack spacing={3}>
          <Input
            _hover={{ borderColor: "blue" }}
            borderColor="#4A4A4A"
            placeholder="想定される質問、または実際に質問された内容を入力してください"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            size="md"
            bg="white"
          />
          <Textarea
            mt={3}
            _hover={{ borderColor: "blue" }}
            borderColor="#4A4A4A"
            placeholder="回答を入力してください"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            size="md"
            minH="200px"
            resize="vertical"
            rows={3}
            bg="white"
          />
          <Button
            onClick={() => {
              if (newQuestion && newAnswer) {
                setQuestions([
                  ...questions,
                  { question: newQuestion, answer: newAnswer },
                ]);
                setNewQuestion("");
                setNewAnswer("");
              }
            }}
            colorScheme="blue"
            width="full"
          >
            質問と回答を登録
          </Button>
        </VStack>
      </Box>

      <VStack spacing={4} align="stretch" bg="gray.50" mt={10} gap={2} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          質問
        </Text>
        {questions.length === 0 ? (
          <Text color="gray.500">登録された質問はありません。</Text>
        ) : (
          questions.map((item, index) => (
            <Box
              key={index}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="white"
              _hover={{ shadow: "sm" }}
              transition="all 0.2s"
            >
              {item.isEditing ? (
                <VStack spacing={3}>
                  <Input
                    borderColor="#4A4A4A"
                    value={item.editQuestion || item.question}
                    placeholder="質問を編集"
                    onChange={(e) =>
                      handleEditChange(index, "editQuestion", e.target.value)
                    }
                  />
                  <Textarea
                    value={item.editAnswer || item.answer}
                    placeholder="回答を編集"
                    onChange={(e) => {
                      handleEditChange(index, "editAnswer", e.target.value);
                      // 入力中にも高さを調整
                      if (textareaRefs.current[index]) {
                        adjustTextareaHeight(textareaRefs.current[index]!);
                      }
                    }}
                    ref={(el) => {
                      textareaRefs.current[index] = el;
                      if (el) {
                        adjustTextareaHeight(el);
                      }
                    }}
                    resize="vertical"
                    overflowY="hidden"
                    minH="50px"
                    w="100%"
                    mt={3}
                    _hover={{ borderColor: "blue" }}
                    borderColor="#4A4A4A"
                    bg="white"
                  />
                  <HStack width="full" justify="flex-end">
                    <Button size="sm" onClick={() => handleEdit(index)}>
                      キャンセル
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleUpdate(index)}
                    >
                      保存
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <>
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="bold" fontSize="md" color="blue.600">
                      Q. {item.question}
                    </Text>
                    <HStack gap="0">
                      <IconButton
                        aria-label="編集"
                        icon={<EditIcon />}
                        colorScheme="blue"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(index)}
                      />
                      <IconButton
                        aria-label="削除"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setQuestions(questions.filter((_, i) => i !== index))
                        }
                      />
                    </HStack>
                  </HStack>
                  <Box pl={6} borderLeftWidth={2} borderColor="gray.200">
                    <Text fontWeight="bold" fontSize="lg" display="inline">
                      A.{" "}
                    </Text>
                    <Text color="gray.700" display="inline">
                      {item.answer}
                    </Text>
                  </Box>
                </>
              )}
            </Box>
          ))
        )}
      </VStack>
    </>
  );
};

export default Question;
