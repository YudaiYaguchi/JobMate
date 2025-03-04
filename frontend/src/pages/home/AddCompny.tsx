import { Button, Table, } from "@chakra-ui/react"
import { GoPlusCircle } from "react-icons/go";
import { useState } from "react";
const AddCompany = () => {
  return (
    <>
      <Table.Row >
        <Table.Cell p="0px 8px" colSpan={5} textAlign="center">
          <Button variant="ghost">
            <GoPlusCircle size="24px" />
          </Button>
        </Table.Cell>
      </Table.Row >
    </>
  );
}
export default AddCompany;