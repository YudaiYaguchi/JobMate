import { Button, Tr, Td } from "@chakra-ui/react";
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
      <Tr>
        <Td p="0px 8px" colSpan={5} textAlign="center">
          <Button variant="ghost" onClick={openModal}>
            <GoPlusCircle size="24px" />
          </Button>
          <AddCompanyModal isOpen={isOpen} onClose={closeModal} />
        </Td>
      </Tr>

    </>
  );
};

export default AddCompany;
