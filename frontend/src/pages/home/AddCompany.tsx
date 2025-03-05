import { Button, Tr, Td } from "@chakra-ui/react";
import { GoPlusCircle } from "react-icons/go";

const AddCompany = () => {
  return (
    <Tr>
      <Td p="0px 8px" colSpan={5} textAlign="center">
        <Button variant="ghost">
          <GoPlusCircle size="24px" />
        </Button>
      </Td>
    </Tr>
  );
};

export default AddCompany;
