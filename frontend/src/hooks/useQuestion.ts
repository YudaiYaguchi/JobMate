import { useState } from 'react';
import { Question } from '../types/Question';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
} from '../services/questionApi';

type QuestionInput = Omit<Question, 'id' | 'created_at' | 'updated_at'>;

interface QuestionHook {
  loading: boolean;
  error: string | null;
  questions: Question[];
  fetchQuestions: () => Promise<void>;
  fetchQuestionsByCompany: (companyId: number) => Promise<void>;
  fetchQuestionById: (id: number) => Promise<Question | null>;
  createNewQuestion: (data: QuestionInput) => Promise<Question | null>;
  updateExistingQuestion: (id: number, data: Partial<QuestionInput>) => Promise<Question | null>;
  removeQuestion: (id: number) => Promise<boolean>;
}

export const useQuestion = (): QuestionHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      setError('質問の取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionsByCompany = async (companyId: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await getQuestions();
      // 会社IDでフィルタリング
      const filteredData = data.filter((question: Question) => question.company_id === companyId);
      setQuestions(filteredData);
    } catch (err) {
      setError('質問の取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionById = async (id: number): Promise<Question | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await getQuestionById(id);
      return data;
    } catch (err) {
      setError('質問の取得に失敗しました');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createNewQuestion = async (data: QuestionInput): Promise<Question | null> => {
    try {
      setLoading(true);
      setError(null);
      console.log(data);
      const response = await createQuestion(data);
      // 新しい質問をリストに追加
      setQuestions([...questions, response]);
      return response;
    } catch (err) {
      setError('質問の作成に失敗しました');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingQuestion = async (id: number, data: Partial<QuestionInput>): Promise<Question | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateQuestion(id, data);
      // 更新された質問でリストを更新
      setQuestions(questions.map(question => question.id === id ? response : question));
      return response;
    } catch (err) {
      setError('質問の更新に失敗しました');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeQuestion = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await deleteQuestion(id);
      // 削除された質問をリストから削除
      setQuestions(questions.filter(question => question.id !== id));
      return true;
    } catch (err) {
      setError('質問の削除に失敗しました');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    questions,
    fetchQuestions,
    fetchQuestionsByCompany,
    fetchQuestionById,
    createNewQuestion,
    updateExistingQuestion,
    removeQuestion
  };
}; 