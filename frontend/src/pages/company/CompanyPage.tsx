import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { getCompanyById } from "../../services/companyApi";
import { Company } from "../../types/Company";
import Toast from "../../components/Toast";
import { Loading } from "../../components/Loading";
import CompanyDetail from "./CompanyDetail";
import AllTab from "./AllTab";
import { FaBuilding } from "react-icons/fa";

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
    <>
      <Flex p="32px 5%" w="full"  >
        <VStack alignItems="start" w="full" >
          <Box w="full" h="full">
            <HStack fontWeight="bold" bg="blue.500" color="white" borderLeft="4px" borderColor="blue.800">
              <FaBuilding size="30px" style={{ marginLeft: "16px" }} />
              <Heading p="10px" size="lg" textShadow="2px 2px 5px rgba(0, 0, 0, 0.3)" >
                {company.name}
              </Heading>
            </HStack>
            <CompanyDetail company={company} />
          </Box>
          <AllTab company={company} />
        </VStack>

      </Flex >
    </>
  );
};

export default CompanyPage;
