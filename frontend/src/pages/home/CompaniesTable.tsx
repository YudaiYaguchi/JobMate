import { Button, HStack, Table, Thead, Tbody, Tr, Th, Td, VStack, Text } from "@chakra-ui/react";
import { FC, use, useState } from "react";
import AddCompany from "./AddCompany";
import { Company } from "@/types/Company";
import { FaRegEdit } from "react-icons/fa";

type CompaniesTableProps = {
  companyList: Company[];
};

const CompaniesTable: FC<CompaniesTableProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const focusCompanyInfo = () => {
    setIsHovered(true);
  };

  const resetCompanyInfo = () => {
    setIsHovered(false);
  };

  return (
    <VStack p="10px 5%" w="100%">
      <Table size="sm" variant="simple" border="2px solid #ddd" >
        <Thead bg="gray.100">
          <Tr>
            <Th textAlign="center" border="1px solid #ddd" fontSize="15px" fontWeight="bold">
              企業名
            </Th>
            <Th textAlign="center" border="1px solid #ddd" fontSize="15px" fontWeight="bold">
              選考種類
            </Th>
            <Th textAlign="center" border="1px solid #ddd" fontSize="15px" fontWeight="bold">
              選考状況
            </Th>
            <Th textAlign="center" border="1px solid #ddd" fontSize="15px" fontWeight="bold">
              選考日
            </Th>
            <Th textAlign="center" border="1px solid #ddd" fontSize="15px" fontWeight="bold">
              選考結果
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.companyList.map((company) => (
            <Tr key={company.name} fontFamily="sans-serif" fontStyle="normal" fontWeight="normal" _hover={{ backgroundColor: isHovered ? "gray.100" : "transparent" }}>
              <Td textAlign="left" p="8px" w="30%" border="1px solid #ddd">
                <HStack>
                  <Button variant="ghost" p="0px 8px" onMouseEnter={focusCompanyInfo} onMouseLeave={resetCompanyInfo} _hover={{ color: "red" }}>
                    <FaRegEdit size="1rem" />
                  </Button>
                  <Text>{company.name}</Text>
                </HStack>
              </Td>
              <Td textAlign="center" w="15%" border="1px solid #ddd">
                {company.selectionType}
              </Td>
              <Td textAlign="center" w="15%" border="1px solid #ddd">
                {company.selectionStatus}
              </Td>
              <Td textAlign="center" w="25%" border="1px solid #ddd">
                {company.selectionDate}
              </Td>
              <Td textAlign="center" border="1px solid #ddd">
                {company.selectionResult}
              </Td>
            </Tr>
          ))}
          <AddCompany />
        </Tbody>
      </Table>
    </VStack>
  );
};

export default CompaniesTable;
