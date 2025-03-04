import { Heading } from "@chakra-ui/react";
import { useEffect,useState,FC } from "react";
import { getUserData } from "../../services/userApi";
import { User as IUser} from "@/types/Index";

type UserProps = {
  setUserName: (name: string) => void; // 関数の型を定義
};

const User:FC<UserProps> = (props) => {
  useEffect(() => {
    // コンポーネントがマウントされたらユーザーデータを取得
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
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
    <div>
      <h1>User Data</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
    </>
  );
}

export default User;  