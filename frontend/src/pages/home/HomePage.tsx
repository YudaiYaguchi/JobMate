import { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { FaBuilding, FaQuestionCircle } from "react-icons/fa";
import { Loading } from "../../components/Loading";
import CompaniesTable from "./CompaniesTable";
import QuestionTable from "./QuestionTable";
import { questionList } from "./questionList";
import { useCompanies } from "../../hooks/useCompany";
import { useUser } from "../../hooks/useUser";
import { useLoadingError } from "../../hooks/useLoadingError";
import { User } from "@/types/User";

type HomePageProps = {
  user: User | null
};

const HomePage: FC<HomePageProps> = (user) => {
  const {
    companies,
    loading: companyLoading,
    error: companyError,
  } = useCompanies();
  const { userData, loading: userLoading, error: userError } = useUser();

  const { isLoading, error: combinedError } = useLoadingError([
    { loading: companyLoading, error: companyError },
    { loading: userLoading, error: userError },
  ]);

  if (isLoading) return <Loading />;
  if (combinedError) return <div>{combinedError}</div>;

  return (
    <>
      <HStack p="20px 5%" pb="0px" display="flex">
        <FaBuilding size="20px" />
        <Text fontWeight="bold" fontSize="20px">
          選考中の企業
        </Text>
      </HStack>
      <CompaniesTable companyList={companies} />
      <HStack p="20px 5%" pb="0px" display="flex">
        <FaQuestionCircle size="20px" />
        <Text fontWeight="bold" fontSize="20px">
          直近の質問
        </Text>
      </HStack>
      <QuestionTable questionList={questionList} />
    </>
  );
};

export default HomePage;
