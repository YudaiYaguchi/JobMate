import { useState } from 'react';
import { 
  getEntrySheets, 
  getEntrySheetById, 
  createEntrySheet, 
  updateEntrySheet, 
  deleteEntrySheet 
} from '../services/entrySheetApi';

export interface EntrySheetData {
  id?: number;
  question: string;
  answer: string;
  max_length: number;
  company_id: number;
}

interface EntrySheetHook {
  loading: boolean;
  error: string | null;
  entrySheets: EntrySheetData[];
  fetchEntrySheets: () => Promise<void>;
  fetchEntrySheetById: (id: string | number) => Promise<EntrySheetData | null>;
  createNewEntrySheet: (data: EntrySheetData) => Promise<EntrySheetData | null>;
  updateExistingEntrySheet: (data: EntrySheetData) => Promise<EntrySheetData | null>;
  removeEntrySheet: (id: number) => Promise<boolean>;
}

export const useEntrySheet = (companyId: number): EntrySheetHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [entrySheets, setEntrySheets] = useState<EntrySheetData[]>([]);

  const fetchEntrySheets = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEntrySheets();
      // 会社IDでフィルタリング
      const filteredData = data.filter((sheet: EntrySheetData) => sheet.company_id === companyId);
      setEntrySheets(filteredData);
    } catch (err) {
      setError('エントリーシートの取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEntrySheetById = async (id: string | number): Promise<EntrySheetData | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEntrySheetById(id);
      return data;
    } catch (err) {
      setError('エントリーシートの取得に失敗しました');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createNewEntrySheet = async (data: EntrySheetData): Promise<EntrySheetData | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await createEntrySheet({
        ...data,
        company_id: companyId
      });
      // 新しいエントリーシートをリストに追加
      setEntrySheets([...entrySheets, response]);
      return response;
    } catch (err) {
      setError('エントリーシートの作成に失敗しました');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingEntrySheet = async (data: EntrySheetData): Promise<EntrySheetData | null> => {
    try {
      setLoading(true);
      setError(null);
      if (!data.id) {
        throw new Error('IDが指定されていません');
      }
      const response = await updateEntrySheet({
        id: data.id,
        question: data.question,
        answer: data.answer,
        max_length: data.max_length,
        company_id: companyId
      });
      // 更新されたエントリーシートでリストを更新
      setEntrySheets(entrySheets.map(sheet => sheet.id === data.id ? response : sheet));
      return response;
    } catch (err) {
      setError('エントリーシートの更新に失敗しました');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeEntrySheet = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await deleteEntrySheet(id);
      // 削除されたエントリーシートをリストから削除
      setEntrySheets(entrySheets.filter(sheet => sheet.id !== id));
      return true;
    } catch (err) {
      setError('エントリーシートの削除に失敗しました');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    entrySheets,
    fetchEntrySheets,
    fetchEntrySheetById,
    createNewEntrySheet,
    updateExistingEntrySheet,
    removeEntrySheet
  };
}; 