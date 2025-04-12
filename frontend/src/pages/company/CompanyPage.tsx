import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { getCompanyById } from "../../services/companyApi";
import { Company } from "../../types/Company";
import Toast from "../../components/Toast";
import { Loading } from "../../components/Loading";
import CompanyDetail from "./CompanyDetail";
import AllTab from "./AllTab";

const CompanyPage = () => {
  const { id: companyId } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companyId) {
      setLoading(true);
      getCompanyById(companyId)
        .then((data) => {
          setCompany(data);
        })
        .finally(() => setLoading(false));
    }
  }, [companyId]);

  if (loading) {
    return (
      <Loading />
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
      <AllTab company={company} />
    </Box>
  );
};

export default CompanyPage;
