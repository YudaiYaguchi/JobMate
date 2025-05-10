import { FC, useEffect, useState } from "react";
import { HStack, Text, Box, Flex, Spacer } from "@chakra-ui/react";
import { FaQuestion, FaRegBuilding } from "react-icons/fa";
import { BsBuildingCheck } from "react-icons/bs";
import { useTodo } from "@/hooks/useTodo";
import { useCompanies } from "@/hooks/useCompany";
import { useQuestion } from "@/hooks/useQuestion";
import { User } from "@/types/User";
import { Company } from "@/types/Company";
import { Question } from "@/types/Question";
import { Loading } from "@/components/Loading";
import SummaryCards from "./components/SummaryCards";
import CompanyList from "./components/company-list/CompanyList";
import AddCompany from "./components/add-company/AddCompany";
import CompanySearchBar from "./components/CompanySearchBar";
import QuestionAccordion from "./components/QuestionAccordion ";
import TodoList from "./components/todo-list/TodoList";
import FilterBar, { FilterTag } from "./components/FilterBar";

type HomePageProps = {
  user: User | null
};

const HomePage: FC<HomePageProps> = (user) => {
  const {
    todos,
    loading: todoLoading,
    error: todoError,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useTodo();

  const {
    companyList: initialCompanyList,
    loading: companyLoading,
    error: companyError,
  } = useCompanies();

  const {
    questionList: initialQuestionList,
    loading: questionLoading,
    error: questionError,
    fetchQuestions,
  } = useQuestion();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const [companyList, setCompanyList] = useState<Company[]>(initialCompanyList || []);
  const [questionList, setQuestionList] = useState<Question[]>(initialQuestionList || []);

  useEffect(() => {
    setCompanyList(initialCompanyList || []);
  }, [initialCompanyList]);

  useEffect(() => {
    setQuestionList(initialQuestionList || []);
  }, [initialQuestionList]);

  const handleOnFilter = (filteredList: Company[], filterKey: string) => {
    if (filterKey === FilterTag.ALL) {
      setCompanyList(initialCompanyList);
    } else {
      setCompanyList(filteredList);
    }
  };

  const [view, setView] = useState<"grid" | "kanban">("grid");
  const handleToggleComponent = () => {
    setView(view === "grid" ? "kanban" : "grid");
  }

  const handleCompanyCreate = (newCompany: Company) => {
    setCompanyList((prevList) => [newCompany, ...prevList]);
  };

  const handleCompanyUpdate = (updatedCompany: Company) => {
    setCompanyList((prevList) =>
      prevList.map((company) => (company.id === updatedCompany.id ? updatedCompany : company))
    );
  }

  const handleCompanyDelete = (deletedCompany: Company) => {
    setCompanyList((prevList) =>
      prevList.filter((company) => (company.id !== deletedCompany.id))
    );
  }

  return (
    <>
      {companyLoading || questionLoading || todoLoading && <Loading />}
      <Box bg="gray.50" px="2.5%">
        <Box pt="8">
          <Flex align="center" gap={3} mb={3}>
            <BsBuildingCheck size={30} />
            <Box>
              <Text fontSize='lg' fontWeight="bold" color="gray.900">
                選考管理ダッシュボード
              </Text>
              <Text color="gray.500">就職活動の進捗を一目で確認</Text>
            </Box>
          </Flex>
          <SummaryCards />
          <HStack
            p="4px 0"
            w="full"
            bg="white"
            color="black"
          >
            <FaRegBuilding size="20px" style={{ marginLeft: "16px" }} />
            <Text fontWeight="bold" fontSize="20px">
              選考中の企業
            </Text>
            <Spacer />
            <AddCompany handleCompanyCreate={handleCompanyCreate} />
          </HStack>
          <Flex justify='flex-end' align='center' pr={3} bg='white'>
            <CompanySearchBar companyList={companyList} />
            {companyList.length > 0 && (
              <FilterBar companyList={companyList} view={view} handleOnFilter={handleOnFilter} handleToggleComponent={handleToggleComponent} />
            )}
          </Flex>
        </Box>
        <CompanyList companyList={companyList} view={view} handleCompanyUpdate={handleCompanyUpdate} handleCompanyDelete={handleCompanyDelete} />

        <Flex gap={4} mt={6} pb={10}>
          <Box flex={1} px={6} bg='white'>
            <Text fontWeight="bold" fontSize="20px">
              質問一覧
            </Text>
            <QuestionAccordion questionList={questionList} />
          </Box>
          <Box flex={1}>
            <TodoList
              todos={todos}
              handleCreateTodo={handleCreateTodo}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          </Box>
        </Flex >
      </Box >
    </>
  );
};

export default HomePage;
