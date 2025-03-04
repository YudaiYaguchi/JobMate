import { IconType } from "react-icons";
import { IoSearchOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { BsGraphUpArrow, BsChatText } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";


type FunctionCard = {
  icon: IconType;
  title: string;
  explainText: string;
}

const functionCardList: FunctionCard[] = [
  {
    icon: BsGraphUpArrow,
    title: "選考中の企業管理",
    explainText: "合否、選考日付、選考状況、選考結果を一元管理できます。",
  },
  {
    icon: IoSearchOutline,
    title: "企業研究",
    explainText: "志望企業の情報を一元管理！業界研究もスムーズに進めて、万全の準備を整えましょう。",
  },
  {
    icon: BsChatText,
    title: "面接反省",
    explainText: "面接の手応えを振り返り、次回の成功につなげよう！成長の記録があなたの自信になります。",
  },
  {
    icon: FaRegQuestionCircle,
    title: "面接の質問の登録",
    explainText: "実際に聞かれた質問とベストな回答をストック！あなただけの「面接攻略ノート」を作成しよう。",
  },
  {
    icon: IoCalendarNumberOutline,
    title: "スケジュール管理",
    explainText: "面接日程や企業の選考スケジュールを効率的に管理！重要な予定を見逃さず、準備万端で就職活動を進めましょう。",
  },
  {
    icon: FiFileText,
    title: "ES管理",
    explainText: "書類選考の通過率をアップ！過去のESを活用して、効率的に質の高いエントリーシートを作成しよう。",
  },
];

export default functionCardList;