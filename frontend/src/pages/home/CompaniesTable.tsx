import { Company } from "@/types/Company";
import { Button, HStack, Table, Thead, Tbody, Tr, Th, Td, VStack, Text, Tooltip, TableContainer } from "@chakra-ui/react";
import { FC, useState } from "react";
import AddCompany from "./AddCompany";
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
    <VStack p="10px 5%" gap="0" w="full">
      <TableContainer w="full" maxH={props.companyList.length > 5 ? "230px" : "none"} overflowY={props.companyList.length > 5 ? "auto" : "initial"} border="1.5px solid #ddd" position="relative">
        <Table size="sm" variant="simple" w="full" border="1px solid #ddd">
          <Thead bg="gray.100" position="sticky" top="0" zIndex="10" borderBottom="2px solid #ddd">
            <Tr>
              <Th textAlign="center" fontSize="15px" fontWeight="bold" borderRight="1px solid #ddd">企業名</Th>
              <Th textAlign="center" fontSize="15px" fontWeight="bold" borderRight="1px solid #ddd">選考種類</Th>
              <Th textAlign="center" fontSize="15px" fontWeight="bold" borderRight="1px solid #ddd">選考状況</Th>
              <Th textAlign="center" fontSize="15px" fontWeight="bold" borderRight="1px solid #ddd">選考日</Th>
              <Th textAlign="center" fontSize="15px" fontWeight="bold">選考結果</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.companyList.map((company) => (
              <Tr key={company.id} fontFamily="sans-serif" fontStyle="normal" fontWeight="normal" _hover={{ backgroundColor: isHovered ? "gray.200" : "transparent" }}>
                <Td textAlign="left" pb="0px" pt="0px" w="30%" border="1px solid #ddd">
                  <HStack>
                    <Tooltip hasArrow label="編集" bg="gray.300" color="black">
                      <Button variant="ghost" p="0px 8px" onMouseEnter={focusCompanyInfo} onMouseLeave={resetCompanyInfo} _hover={{ color: "blue" }}>
                        <FaRegEdit size="1rem" />
                      </Button>
                    </Tooltip>
                    <Text>{company.name}</Text>
                  </HStack>
                </Td>
                <Td textAlign="center" w="15%" border="1px solid #ddd">{company.selectionType}</Td>
                <Td textAlign="center" w="15%" border="1px solid #ddd">{company.selectionStatus}</Td>
                <Td textAlign="center" w="25%" border="1px solid #ddd">{company.selectionDate}</Td>
                <Td textAlign="center" border="1px solid #ddd">{company.selectionResult}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AddCompany />
    </VStack>
  );
};

export default CompaniesTable;
