import { Heading } from "@chakra-ui/react";
import { useEffect,useState } from "react";
import { getUserData } from "../../services/userApi";

const User  = () => {
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
  }, []);

  const [userData, setUserData] = useState<any>(null); // ユーザーデータの状態
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState<string>("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Data</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}

export default User;  