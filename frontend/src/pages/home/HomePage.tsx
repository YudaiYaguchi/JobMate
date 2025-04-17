import { FC, useEffect } from "react";
import { HStack, Text, Box, Flex, Input } from "@chakra-ui/react";
import { FaBuilding, FaQuestionCircle } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import { Loading } from "../../components/Loading";
import { useCompanies } from "../../hooks/useCompany";
import { User } from "@/types/User";
import CompaniesTable from "./CompaniesTable";
import QuestionAccordion from "./QuestionAccordion ";
import Todo from "./Todo";
import CompanySearchBar from "./CompanySearchBar";
import FilterBar from "./FilterBar";
import { useQuestion } from "../..//hooks/useQuestion";

type HomePageProps = {
  user: User | null
};

const HomePage: FC<HomePageProps> = (user) => {
  const {
    companList,
    loading: companyLoading,
    error: companyError,
  } = useCompanies();

  const {
    questionList,
    loading: questionLoading,
    error: questionError,
    fetchQuestions
  } = useQuestion();

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (companyLoading) return <Loading />;
  if (questionLoading) return <Loading />

  return (
    <>
      <Box bg="gray.50">
        <Box pt="8" px="5%">
          <HStack
            p="4px 0"
            w="full"
            bg="blue.500"
            color="white"
            borderLeft="4px"
            borderColor="blue.800"
          >
            <FaBuilding size="20px" style={{ marginLeft: "16px" }} />
            <Text fontWeight="bold" fontSize="20px">
              選考中の企業
            </Text>
            <CompanySearchBar companyList={companList} />
            <FilterBar />
          </HStack>
        </Box>
        <CompaniesTable companyList={companList} />
        <HStack p="20px 5%" pb="0" w="100%" alignItems="flex-start">
          {/* 質問一覧 */}
          <Flex w="50%" justifyContent="flex-start" align="center">
            <HStack spacing="8px" w="full" color="white" bg="blue.500" borderLeft="4px" borderColor="blue.800">
              <FaQuestionCircle size="20px" style={{ marginLeft: "16px" }} />
              <Text fontWeight="bold" fontSize="20px">
                質問一覧
              </Text>
            </HStack>
          </Flex>
          {/* TODOメモ */}
          <Flex w="50%" justifyContent="flex-start" align="center">
            <HStack spacing="8px" w="full" color="white" bg="blue.500" borderLeft="4px" borderColor="blue.800">
              <CiMemoPad size="25px" style={{ marginLeft: "16px" }} />
              <Text fontWeight="bold" fontSize="20px">
                TODOメモ
              </Text>
            </HStack>
          </Flex>
        </HStack>
        <HStack w="full" gap={4} p="10px 5%" pb="8" bg="gray.50" align="stretch">
          <Box w="50%" pr="0px" pl="0" pb="0px" >
            <QuestionAccordion questionList={questionList} />
          </Box>
          <Box w="50%" pr="0px" pl="0" pb="0px">
            <Todo />
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default HomePage;
