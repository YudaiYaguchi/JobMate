import { Todo } from "@/types/Todo";

const userId = 123; // 任意の固定ユーザーID

export const mockTodoList: Todo[] = [
  {
    id: 1,
    title: "履歴書の作成",
    date: "2025-04-30 06:30",
    is_done: false,
    priority: "緊急",
    user_id: userId,
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z",
  },
  {
    id: 2,
    title: "企業説明会の準備",
    date: "2025-04-30 06:30",
    is_done: false,
    priority: "優先",
    user_id: userId,
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z",
  },
  {
    id: 3,
    title: "面接練習",
    date: "2025-04-30 06:30",
    is_done: true,
    priority: "通常",
    user_id: userId,
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z",
  },
  {
    id: 4,
    title: "エントリーシートの提出",
    date: "2025-04-30 06:30",
    is_done: false,
    priority: "通常",
    user_id: userId,
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z",
  },
  {
    id: 5,
    title: "内定者フォローアップの確認",
    date: "2025-04-30 06:30",
    is_done: true,
    priority: "優先",
    user_id: userId,
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z",
  },
];
