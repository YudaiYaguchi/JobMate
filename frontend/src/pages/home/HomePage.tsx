import { FC } from "react";
import { HStack, Text, Box, Flex, Input } from "@chakra-ui/react";
import { FaBuilding, FaQuestionCircle } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import { Loading } from "../../components/Loading";
import { questionList } from "./questionList";
import { useCompanies } from "../../hooks/useCompany";
import { useLoadingError } from "../../hooks/useLoadingError";
import { User } from "@/types/User";
import CompaniesTable from "./CompaniesTable";
import QuestionTable from "./QuestionTable";
import Todo from "./Todo";
import CompanySearchBar from "./CompanySearchBar";
import FilterBar from "./FilterBar";

type HomePageProps = {
  user: User | null
};

const HomePage: FC<HomePageProps> = (user) => {
  const {
    companList,
    loading: companyLoading,
    error: companyError,
  } = useCompanies();

  const { isLoading, error: combinedError } = useLoadingError([
    { loading: companyLoading, error: companyError },
  ]);

  if (isLoading) return <Loading />;
  if (combinedError) return <div>{combinedError}</div>;

  return (
    <>
      <HStack p="20px 5%" pb="0px" >
        <FaBuilding size="20px" />
        <Text fontWeight="bold" fontSize="20px">
          選考中の企業
        </Text>
        <CompanySearchBar />
        <FilterBar />
      </HStack>
      <CompaniesTable companyList={companList} />
      <HStack p="20px 5%" pb="0"  w="100%" alignItems="flex-start">
        {/* 左側：直近の質問 */}
        <Flex w="50%" justifyContent="flex-start" align="center">
          <HStack spacing="8px">
            <FaQuestionCircle size="20px" />
            <Text fontWeight="bold" fontSize="20px">
              直近の質問
            </Text>
          </HStack>
        </Flex>

        {/* 右側：TODOメモ */}
        <Flex w="50%" justifyContent="flex-start" align="center">
          <HStack spacing="8px">
            <CiMemoPad size="25px" />
            <Text fontWeight="bold" fontSize="20px">
              TODOメモ
            </Text>
          </HStack>
        </Flex>
      </HStack>

      <HStack w="full" gap={4} p="10px 5%" mb="4" align="stretch">
        <Box w="50%" pr="0px" pl="0" pb="0px">
          <QuestionTable questionList={questionList} />
        </Box>
        <Box w="50%" pr="0px" pl="0" pb="0px">
          <Todo />
        </Box>
      </HStack>
    </>
  );
};

export default HomePage;
