import { InputTodo, Todo } from '@/types/Todo';
import { Box, Text, Checkbox, Flex } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { GrTask } from "react-icons/gr";
import { FiCheckCircle } from "react-icons/fi";
import { priorityBgColor } from '@/constants/todoConstants';
import TodoModal from './TodoModal';
import EmptyState from '@/components/EmptyState';
import ActionMenu from '@/components/ActionMenu';

type TodoItemProps = {
  todos: Todo[];
  isDone: boolean;
  handleCreateTodo: (todo: InputTodo) => Promise<void>;
  handleUpdateTodo: (todo: Todo) => Promise<void>;
  handleDeleteTodo: (todo: Todo) => Promise<void>;
}
const TodoItem: FC<TodoItemProps> = ({ todos, isDone, handleCreateTodo, handleUpdateTodo, handleDeleteTodo }) => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(todos[0]);

  useEffect(() => {
    const completed = todos.filter((todo) => todo.is_done === true);
    const incomplete = todos.filter((todo) => todo.is_done === false);
    setCompletedTodos(completed);
    setIncompleteTodos(incomplete);
  }, [todos]);

  const updateCheckbox = (id: number) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      updatedTodo.is_done = !updatedTodo.is_done;
      handleUpdateTodo(updatedTodo);
    }
  };

  const handleTodoEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsEdit(true);
  }

  return (
    <>
      {isEdit &&
        <TodoModal
          todo={selectedTodo}
          status="update"
          isOpen={isEdit}
          onClose={() => setIsEdit(false)}
          handleCreateTodo={handleCreateTodo}
          handleUpdateTodo={handleUpdateTodo}
        />}
      <Box pt={3}>
        {incompleteTodos.length > 0 && !isDone &&
          <>
            {incompleteTodos.map((todo) => (
              <Flex
                align="center"
                p={3}
                mt={1}
                w="full"
                _hover={{ bg: "gray.50" }}
                key={todo.id}
              >
                <Checkbox
                  isChecked={todo.is_done}
                  onChange={() => updateCheckbox(todo.id)}
                  colorScheme="green"
                  mr={3}
                />
                <Box>
                  <Text fontWeight="bold">{todo.title}</Text>
                  <Text color="gray.500" fontSize='sm'>期限：{todo.date}</Text>
                </Box>
                <Flex ml="auto" direction='column'>
                  <ActionMenu
                    onEdit={() => handleTodoEdit(todo)}
                    onDelete={() => handleDeleteTodo(todo)}
                  />
                  <Box
                    bg={priorityBgColor[todo.priority]}
                    color="white"
                    px={2}
                    borderRadius="full"
                    fontWeight="bold"
                    display="inline-block"
                    fontSize="sm"
                  >
                    {todo.priority}
                  </Box>
                </Flex>
              </Flex>
            ))}
          </>
        }
        {completedTodos.length > 0 && isDone &&
          <>
            {completedTodos.map((todo) => (
              <Flex
                align="center"
                p={3}
                mt={1}
                w="full"
                _hover={{ bg: "gray.50" }}
                key={todo.id}
              >
                <Checkbox
                  isChecked={todo.is_done}
                  onChange={() => updateCheckbox(todo.id)}
                  colorScheme="green"
                  mr={3}
                />
                <Box>
                  <Text fontWeight="bold">{todo.title}</Text>
                  <Text color="gray.500" fontSize='sm'>期限：{todo.date}</Text>
                </Box>
                <Flex ml="auto" direction='column'>
                  <ActionMenu
                    onEdit={() => handleTodoEdit(todo)}
                    onDelete={() => handleDeleteTodo(todo)}
                  />
                  <Box
                    bg={priorityBgColor[todo.priority]}
                    color="white"
                    px={2}
                    borderRadius="full"
                    fontWeight="bold"
                    display="inline-block"
                    fontSize="sm"
                  >
                    {todo.priority}
                  </Box>
                </Flex>
              </Flex>
            ))}
          </>
        }
      </Box >
      {
        incompleteTodos.length === 0 && !isDone &&
        <EmptyState
          icon={GrTask}
          message="未完了のTODOメモはありません"
        />
      }
      {
        completedTodos.length === 0 && isDone &&
        <EmptyState
          icon={FiCheckCircle}
          message="完了済みのTODOメモはありません"
        />
      }
    </>
  );
};

export default TodoItem;