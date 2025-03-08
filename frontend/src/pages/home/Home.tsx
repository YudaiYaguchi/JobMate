import { useEffect, useState, FC } from "react";
import { getUserData } from "../../services/userApi";
import { User as IUser } from "@/types/Index";
import CompaniesTable from "./CompaniesTable";
import { companyList } from "./companyList";
import { HStack, Text } from "@chakra-ui/react";
import QuestionTable from "./QuestionTable";
import { questionList } from "./questionList";
import { FaBuilding } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";

type HomeProps = {
  setUserName: (name: string) => void; // 関数の型を定義
};


const Home: FC<HomeProps> = (props) => {
  useEffect(() => {
    // コンポーネントがマウントされたらユーザーデータを取得
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        console.log(data);
        setUserData(data); // データをステートに保存
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false); // ローディング完了
      }
    };

    fetchUserData(); // 関数呼び出し

    props.setUserName('Yudai Yaguchi');
  }, []);

  const [userData, setUserData] = useState<IUser | null>(null); // ユーザーデータの状態
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState<string>("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <HStack p="20px 5%" pb="0px" display="flex">
        <FaBuilding size="20px" /><Text fontWeight='bold' fontSize="20px" >選考中の企業</Text>
      </HStack>
      <CompaniesTable companyList={companyList} />
      <HStack p="20px 5%" pb="0px" display="flex">
        <FaQuestionCircle size="20px" /><Text fontWeight='bold' fontSize="20px" >直近の質問</Text>
      </HStack>
      <QuestionTable questionList={questionList} />
    </>
  );
}

export default Home;  