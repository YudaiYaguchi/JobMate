import { useEffect, useState } from 'react';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '@/services/todoApi';
import { Todo, InputTodo } from '@/types/Todo';

interface TodoHook {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  handleCreateTodo: (todo: InputTodo) => Promise<void>;
  handleUpdateTodo: (todo: Todo) => Promise<void>;
  handleDeleteTodo: (todo: Todo) => Promise<void>;
}

export const useTodo = (): TodoHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const todos = await getTodos();
      setTodos(todos);
    } catch (err) {
      setError('Todoの取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (todo: Todo): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const updatedTodo = await updateTodo(todo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (err) {
      setError('Todoの更新に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todo: InputTodo): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const createdTodo = await createTodo(todo);

      if (createdTodo) {
        setTodos(prevTodos => [createdTodo, ...prevTodos]);
      } else {
        setError('Todoの作成に失敗しました');
      }
    } catch (err) {
      setError('Todoの作成に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (todo: Todo): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await deleteTodo(todo.id);
      const deletedTodo = todo;
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deletedTodo.id));
    } catch (err) {
      setError('Todoの削除に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    loading,
    error,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo
  };
}

