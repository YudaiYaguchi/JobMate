import { Company } from "../../types/Company";
import { Table, Thead, Tbody, Tr, Th, VStack, TableContainer, Td} from "@chakra-ui/react";
import { FC, useState, useEffect } from "react";
import AddCompany from "./AddCompany";
import CompanyListItem from "./CompanyListItem";
import EmptyCompanyList from "./EmptyCompanyList";


type CompaniesTableProps = {
  companyList: Company[];
};

const CompaniesTable: FC<CompaniesTableProps> = (props) => {
  const [companyList, setCompanyList] = useState<Company[]>(props.companyList);
  useEffect(() => {
    setCompanyList(props.companyList);
  }, [props.companyList]);

  const handleCompanyCreate = (newCompany: Company) => {
    setCompanyList((prevList) => [newCompany, ...prevList]);
  };

  return (
    <VStack p="10px 5%" gap="0" w="full">
      <TableContainer w="full" maxH={props.companyList.length > 5 ? "230px" : "none"} overflowY={props.companyList.length > 5 ? "auto" : "initial"} border="1.5px solid #ddd" position="relative">
        <Table size="sm" variant="simple" w="full">
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
          {companyList.length > 0 ? ( 
            companyList.map((company) => (
              <CompanyListItem key={company.id} company={company} />
            ))
          ):(
            <Tr>
            <Td colSpan={5} p="0px 8px" textAlign="center">
              <EmptyCompanyList />
            </Td>
          </Tr>
          )}
          </Tbody>
        </Table>
      </TableContainer>
      <AddCompany handleCompanyCreate={handleCompanyCreate} />
    </VStack>
  );
};

export default CompaniesTable;
