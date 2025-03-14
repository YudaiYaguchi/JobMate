import { Button, Tr, Td, Table, Thead } from "@chakra-ui/react";
import { GoPlusCircle } from "react-icons/go";
import AddCompanyModal from "./AddCompanyModal";
import { useState } from "react";

const AddCompany = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Table variant="simple" >
        <Thead border="1.5px solid #ddd">
          <Tr>
            <Td p="0px 8px" colSpan={5} textAlign="center">
              <Button variant="ghost" onClick={openModal}>
                <GoPlusCircle size="24px" />
              </Button>
              <AddCompanyModal isOpen={isOpen} onClose={closeModal} />
            </Td>
          </Tr>
        </Thead>
      </Table>
    </>
  );
};

export default AddCompany;
