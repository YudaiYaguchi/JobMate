import { Button, HStack, Table, VStack } from "@chakra-ui/react"
import { FC } from "react";
import AddCompany from "./AddCompny";
import { Company } from "@/types/Company";
import { FaRegEdit } from "react-icons/fa";

type CompaniesTableProps = {
  companyList: Company[];
}

const CompaniesTable: FC<CompaniesTableProps> = (props) => {
  return (
    <VStack p="20px 5%">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row >
            <Table.ColumnHeader textAlign="center" borderRight="1px solid #ddd" fontWeight="bold">
              企業名
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" borderRight="1px solid #ddd" fontWeight="bold">
              選考種類
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" borderRight="1px solid #ddd" fontWeight="bold">
              選考状況
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" borderRight="1px solid #ddd" fontWeight="bold">
              選考日
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" fontWeight="bold">
              選考結果
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.companyList.map((company) => (
            <Table.Row key={company.name} fontFamily="serif" fontStyle="normal" fontWeight="normal">
              <Table.Cell textAlign="left" p="2px 8px" w="20%" borderRight="1px solid #ddd">
                <HStack >
                  <Button variant="ghost" p="0px 8px">
                    <FaRegEdit size="1rem" />
                  </ Button>
                  {company.name}
                </HStack>
              </Table.Cell>
              <Table.Cell textAlign="center" w="20%" borderRight="1px solid #ddd">
                {company.selectionType}
              </Table.Cell>
              <Table.Cell textAlign="center" w="20%" borderRight="1px solid #ddd">
                {company.selectionStatus}
              </Table.Cell>
              <Table.Cell textAlign="center" w="20%" borderRight="1px solid #ddd">
                {company.selectionDate}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {company.selectionResult}
              </Table.Cell>
            </Table.Row>
          ))}
          <AddCompany />
        </Table.Body>
      </Table.Root>
    </VStack >
  );
};

export default CompaniesTable;
