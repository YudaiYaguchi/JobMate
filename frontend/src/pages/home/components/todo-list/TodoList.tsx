import { Flex, Icon, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { GoTasklist } from "react-icons/go";
import { GrTask } from "react-icons/gr";
import { FiCheckCircle } from "react-icons/fi";
import { FC, useState } from "react";
import TodoItem from "./TodoItem";
import { InputTodo, Todo } from "@/types/Todo";
import TodoModal from "./TodoModal";

type TodoListProps = {
  todos: Todo[];
  handleCreateTodo: (todo: InputTodo) => Promise<void>;
  handleUpdateTodo: (todo: Todo) => Promise<void>;
  handleDeleteTodo: (todo: Todo) => Promise<void>;
}

const TodoList:FC<TodoListProps> = ({todos, handleCreateTodo, handleUpdateTodo, handleDeleteTodo}) => {
  const [isDone, setIsDone] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {isEdit &&
        <TodoModal
          status="create"
          isOpen={isEdit}
          onClose={() => setIsEdit(false)}
          handleCreateTodo={handleCreateTodo}
          handleUpdateTodo={handleUpdateTodo}
        />}
      <Box flex={1} bg="white" px={6}>
        {/* ヘッダー */}
        <HStack pt={2} pb={2}>
          <GoTasklist size="24px" />
          <Text fontWeight="bold" fontSize="20px">
            TODOメモ
          </Text>
        </HStack>

        {/* タブ切り替え */}
        <Flex w="full" p={1} bg="#f7f7f8" overflow="hidden" borderRadius="md">
          <HStack w="full" align="center" spacing={0}>
            {/* 未完了タブ */}
            <Flex
              flex="1"
              align="center"
              justify="center"
              gap={2}
              bg={!isDone ? "white" : "gray.50"}
              cursor="pointer"
              py={1}
              onClick={() => setIsDone(false)}
            >
              <Icon as={GrTask} />
              <Text>未完了</Text>
            </Flex>
            {/* 完了済みタブ */}
            <Flex
              flex="1"
              align="center"
              justify="center"
              gap={2}
              bg={isDone ? "white" : "gray.50"}
              cursor="pointer"
              py={1}
              onClick={() => setIsDone(true)}
            >
              <Icon as={FiCheckCircle} />
              <Text>完了済み</Text>
            </Flex>
          </HStack>
        </Flex>

        {/* コンテンツ部分 */}
        <TodoItem
          todos={todos}
          isDone={isDone} 
          handleCreateTodo={handleCreateTodo} 
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />

        {/* タスク追加リンク */}
        <VStack p={5}>
          <Text onClick={() => setIsEdit(true)} color="blue.500" cursor="pointer" _hover={{ color: "blue.600" }}>
            タスクを追加
          </Text>
        </VStack>
      </Box >
    </>
  );
};

export default TodoList;
