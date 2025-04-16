import {
  Text,
  VStack,
  Button,
  Input,
  HStack,
  IconButton,
  Box,
  Textarea,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CopyButton from "../../components/CopyButton";
import { useQuestion } from "../../hooks/useQuestion";
import { Question as QuestionType } from "../../types/Question";
import { useParams } from "react-router-dom";

const Question = () => {
  const { id } = useParams<{ id: string }>();
  const companyId = id ? parseInt(id, 10) : 0;

  const {
    loading,
    error,
    questionList,
    fetchQuestionsByCompany,
    createNewQuestion,
    updateExistingQuestion,
    removeQuestion
  } = useQuestion();

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // 編集中の質問の状態管理
  const [editStates, setEditStates] = useState<{
    [key: number]: {
      isEditing: boolean;
      editQuestion: string;
      editAnswer: string;
    };
  }>({});

  // テキストエリアの参照を保持するためのrefオブジェクト
  const textareaRefs = useRef<{ [key: number]: HTMLTextAreaElement | null }>({});

  // コンポーネントマウント時に質問を取得
  useEffect(() => {
    if (companyId) {
      fetchQuestionsByCompany(companyId);
    }
  }, [companyId]);

  // 編集モードが変更されたときにテキストエリアの高さを調整
  useEffect(() => {
    Object.entries(editStates).forEach(([idStr, state]) => {
      if (state.isEditing) {
        const index = Number(idStr);
        if (textareaRefs.current[index]) {
          const textarea = textareaRefs.current[index];
          if (textarea) {
            // 高さをリセットしてからコンテンツに合わせて調整
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
          }
        }
      }
    });
  }, [editStates]);

  const handleEdit = (question: QuestionType) => {
    setEditStates(prev => ({
      ...prev,
      [question.id]: {
        isEditing: !prev[question.id]?.isEditing || false,
        editQuestion: question.question,
        editAnswer: question.answer
      }
    }));
  };

  const handleEditChange = (
    id: number,
    field: "editQuestion" | "editAnswer",
    value: string
  ) => {
    setEditStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleUpdate = async (id: number) => {
    const editState = editStates[id];
    if (!editState) return;

    const result = await updateExistingQuestion(id, {
      question: editState.editQuestion,
      answer: editState.editAnswer
    });

    if (result) {
      // 編集モードを終了
      setEditStates(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  // テキストエリアの高さを調整する関数
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("この質問・回答を削除してもよろしいですか？")) {
      await removeQuestion(id);
    }
  };

  const handleAddQuestion = async () => {
    if (newQuestion && newAnswer) {
      await createNewQuestion({
        question: newQuestion,
        answer: newAnswer,
        company_id: companyId
      });

      setNewQuestion("");
      setNewAnswer("");
    }
  };

  // ローディング中の表示
  if (loading && questionList.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>質問を読み込み中...</Text>
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

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
            onClick={handleAddQuestion}
            colorScheme="blue"
            width="full"
            isLoading={loading}
          >
            質問と回答を登録
          </Button>
        </VStack>
      </Box>

      <VStack spacing={4} align="stretch" bg="gray.50" mt={10} gap={2} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          質問・回答
        </Text>

        {questionList.length === 0 ? (
          <Text color="gray.500">登録された質問・回答はありません。</Text>
        ) : (
          questionList.map((item) => (
            <Box
              key={item.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="white"
              _hover={{ shadow: "sm" }}
              transition="all 0.2s"
            >
              {editStates[item.id]?.isEditing ? (
                <VStack spacing={3}>
                  <Input
                    borderColor="#4A4A4A"
                    value={editStates[item.id].editQuestion}
                    placeholder="質問を編集"
                    onChange={(e) =>
                      handleEditChange(item.id, "editQuestion", e.target.value)
                    }
                  />
                  <Textarea
                    value={editStates[item.id].editAnswer}
                    placeholder="回答を編集"
                    onChange={(e) => {
                      handleEditChange(item.id, "editAnswer", e.target.value);
                      // 入力中にも高さを調整
                      if (textareaRefs.current[item.id]) {
                        adjustTextareaHeight(textareaRefs.current[item.id]!);
                      }
                    }}
                    ref={(el) => {
                      textareaRefs.current[item.id] = el;
                      if (el) {
                        adjustTextareaHeight(el);
                      }
                    }}
                    resize="vertical"
                    overflowY="hidden"
                    minH="50px"
                    w="100%"
                    _hover={{ borderColor: "blue" }}
                    borderColor="#4A4A4A"
                    bg="white"
                  />
                  <HStack width="full" justify="flex-end">
                    <Button size="sm" onClick={() => handleEdit(item)}>
                      キャンセル
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleUpdate(item.id)}
                      isLoading={loading}
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
                      <CopyButton copyText={item.answer} />
                      <IconButton
                        aria-label="編集"
                        icon={<EditIcon />}
                        colorScheme="blue"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(item)}
                      />
                      <IconButton
                        aria-label="削除"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                        isDisabled={loading}
                      />
                    </HStack>
                  </HStack>
                  <Box pl={6} borderLeftWidth={2} borderColor="gray.200">
                    <Text fontWeight="bold" fontSize="lg" display="inline" whiteSpace="pre-wrap">
                      A.{" "}
                    </Text>
                    <Text color="gray.700" display="inline" whiteSpace="pre-wrap" >
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
