import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { getCompanyById } from "../../services/companyApi";
import { Company } from "../../types/Company";
import Toast from "../../components/Toast";
import CompanyDetail from "./CompanyDetail";
import AllTag from "./AllTab";

const CompanyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCompanyById(id)
        .then((data) => {
          setCompany(data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <HStack justifyContent="center" alignItems="center" height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </HStack>
    );
  }

  if (!company) {
    return (
      <>
        <Toast status="error" message="企業データの取得に失敗しました" />
        <Text>企業情報が見つかりません。</Text>
      </>
    );
  }

  return (
    <Box p={10} maxW="1200px" mx="auto">
      <Flex
        mb={2}
        borderRadius="md"
        align="center"
        justify="space-between"
      >
        <Box flex="1" p={4}>
          <VStack w="100%" align="center" justify="center">
            <Heading size="xl" fontWeight="bold" textShadow="2px 2px 5px rgba(0, 0, 0, 0.3)" >
              {company.name}
            </Heading>
          </VStack>
        </Box>
        <CompanyDetail company={company} />
      </Flex>
      <AllTag company={company} />
    </Box>
  );
};

export default CompanyPage;
