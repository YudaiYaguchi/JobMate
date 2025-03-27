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
import { useParams } from "react-router-dom";
import { useEntrySheet } from "../../hooks/useEntrySheet";
import { Loading } from "../../components/Loading";
import { EntrySheetData } from "../../hooks/useEntrySheet";

const EntrySheet = () => {
  const { id } = useParams<{ id: string }>();
  const companyId = id ? parseInt(id, 10) : 0;
  const {
    loading,
    error,
    entrySheets,
    fetchEntrySheets,
    createNewEntrySheet,
    updateExistingEntrySheet,
    removeEntrySheet,
  } = useEntrySheet(companyId);

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [max_length, setMaxLength] = useState("");
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [savedEntries, setSavedEntries] = useState<
    {
      id?: number;
      question: string;
      answer: string;
      max_length: string;
      savedLength: number;
    }[]
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

  // APIからデータを取得
  useEffect(() => {
    const loadEntrySheets = async () => {
      await fetchEntrySheets();
    };

    if (companyId) {
      loadEntrySheets();
    }
  }, [companyId]);

  // APIから取得したデータを表示用の形式に変換
  useEffect(() => {
    if (entrySheets.length > 0) {
      const formattedEntries = entrySheets.map((sheet) => ({
        id: sheet.id,
        question: sheet.question,
        answer: sheet.answer,
        max_length: sheet.max_length.toString(),
        savedLength: sheet.answer.length,
      }));
      setSavedEntries(formattedEntries);
    }
  }, [entrySheets]);

  // 新規エントリーシートを作成する関数
  const handleCreateNewEntrySheet = async () => {
    if (!question.trim() || !answer.trim() || !max_length.trim()) return;

    const entrySheetData: EntrySheetData = {
      question: question,
      answer: answer,
      max_length: parseInt(max_length),
      company_id: companyId,
    };

    await createNewEntrySheet(entrySheetData);

    // 入力フォームをリセット
    setQuestion("");
    setAnswer("");
    setMaxLength("");
  };

  // 既存のエントリーシートを更新する関数
  const handleUpdateEntrySheet = async (index: number) => {
    if (!question.trim() || !answer.trim() || !max_length.trim()) return;

    const entryToUpdate = savedEntries[index];
    if (!entryToUpdate || !entryToUpdate.id) {
      return;
    }

    // リストのエントリーを更新 (UIの即時反映)
    const updatedEntries = [...savedEntries];
    updatedEntries[index] = {
      ...entryToUpdate,
      question: question,
      answer: answer,
      max_length: max_length,
      savedLength: answer.length,
    };
    setSavedEntries(updatedEntries);

    // APIを使って保存
    const entrySheetData: EntrySheetData = {
      id: entryToUpdate.id,
      question: question,
      answer: answer,
      max_length: parseInt(max_length),
      company_id: companyId,
    };

    const result = await updateExistingEntrySheet(entrySheetData);

    if (result) {
      // 編集モードを終了
      setEditingIndex(-1);

      // 入力フォームをリセット
      setQuestion("");
      setAnswer("");
      setMaxLength("");
    }
  };

  // フィールドごとの更新 (編集中のみ - UIの更新)
  const handleFieldUpdate = async (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    // 現在編集中のエントリーのフィールドを更新 (UI表示用)
    const updatedEntries = [...savedEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: value,
      savedLength:
        field === "answer" ? value.length : updatedEntries[index].savedLength,
    };
    setSavedEntries(updatedEntries);

    // 編集フォームの値も同期して更新
    if (field === "question") {
      setQuestion(value);
    } else if (field === "answer") {
      setAnswer(value);
    }
  };

  // 保存ボタンのハンドラー - 新規作成か更新かを判断
  const handleSave = async () => {
    if (!question.trim() || !answer.trim() || !max_length.trim()) return;

    if (editingIndex >= 0) {
      await handleUpdateEntrySheet(editingIndex);
    } else {
      await handleCreateNewEntrySheet();
    }
  };

  // 編集モードに入る
  const handleEdit = (index: number) => {
    if (editingIndex === index) {
      // 同じ項目をクリックした場合は編集モードを解除
      setEditingIndex(-1);
    } else {
      // 編集対象の内容をフォームにセット
      const entryToEdit = savedEntries[index];
      setQuestion(entryToEdit.question);
      setAnswer(entryToEdit.answer);
      setMaxLength(entryToEdit.max_length);
      setEditingIndex(index);
    }
  };

  const handleDelete = async (index: number) => {
    if (window.confirm("この設問・回答を削除してもよろしいですか？")) {
      const entryToDelete = savedEntries[index];
      if (entryToDelete.id) {
        const success = await removeEntrySheet(entryToDelete.id);
        if (success && editingIndex === index) {
          setEditingIndex(-1);
        }
      } else {
        // IDがない場合はローカルでのみ削除
        const updatedEntries = savedEntries.filter((_, i) => i !== index);
        setSavedEntries(updatedEntries);
        if (editingIndex === index) {
          setEditingIndex(-1);
        }
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack align="stretch" spacing={4}>
      {error && <Text color="red.500">{error}</Text>}

      <Box gap="4" p={4} borderWidth={1} borderRadius="md" bg="gray.50">
        <HStack>
          <Input
            _hover={{ borderColor: "blue" }}
            bg="white"
            borderColor="#4A4A4A"
            placeholder="設問を入力してください  例）当社への志望動機を教えてください。"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Select
            _hover={{ borderColor: "blue" }}
            bg="white"
            borderColor="#4A4A4A"
            placeholder="文字数を選択"
            value={max_length}
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
          value={answer}
          borderColor="#4A4A4A"
          onChange={(e) => setAnswer(e.target.value)}
          h="30vh"
        />
        <Text fontSize="sm" color="gray.500" marginTop="6">
          文字数: {answer.length} / {max_length || "制限なし"}
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
                <CopyButton copyText={entry.answer} />
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
                        value={entry.question}
                        onChange={(e) =>
                          handleFieldUpdate(index, "question", e.target.value)
                        }
                        fontSize="md"
                      />
                      <Textarea
                        value={entry.answer}
                        onChange={(e) => {
                          handleFieldUpdate(index, "answer", e.target.value);
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
                          onClick={() => handleUpdateEntrySheet(index)}
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
                          Q. {entry.question}
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
                            {entry.answer}
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
                    制限:{entry.max_length}文字
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
