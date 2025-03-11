import { useEffect, useState, FC } from "react";
import { getUserData } from "../../services/userApi";
import { Company, User as IUser } from "@/types/Index";
import CompaniesTable from "./CompaniesTable";
import { HStack, Text } from "@chakra-ui/react";
import QuestionTable from "./QuestionTable";
import { questionList } from "./questionList";
import { FaBuilding } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { getCompany } from "../../services/companyApi";

type HomeProps = {
  setUserName: (name: string) => void; // 関数の型を定義
};


const Home: FC<HomeProps> = (props) => {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const fetchCompanyData = async () => {
      try {
        const data = await getCompany();
        setCompanyList(data);
      } catch (error) {
        setError("Failed to fetch company data");
      }
    };

    fetchCompanyData();

    props.setUserName('Yudai Yaguchi');
  }, []);


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