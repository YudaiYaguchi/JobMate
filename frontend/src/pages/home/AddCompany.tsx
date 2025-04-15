import { Button, Tr, Td, Table, Thead } from "@chakra-ui/react";
import { GoPlusCircle } from "react-icons/go";
import AddCompanyModal from "./AddCompanyModal";
import { useState, useEffect, FC } from "react";
import Toast from "../../components/Toast";
import { Company } from "../../types/Company";

type AddCompanyProps = {
  handleCompanyCreate: (newCompany: Company) => void;
};

const AddCompany: FC<AddCompanyProps> = ({ handleCompanyCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setSuccessCreate(false);
  }, [successCreate]);

  return (
    <>
      {successCreate && <Toast status="success" message="正常に企業情報を登録しました。" />}
      <Table variant="simple" >
        <Thead border="2px solid #ddd">
          <Tr>
            <Td p="0px 8px" bg="white" colSpan={5} textAlign="center">
              <Button variant="ghost" onClick={openModal}>
                <GoPlusCircle size="24px" />
              </Button>
              <AddCompanyModal isOpen={isOpen} onClose={closeModal} setSuccessCreate={setSuccessCreate} handleCompanyCreate={handleCompanyCreate} />
            </Td>
          </Tr>
        </Thead>
      </Table>
    </>
  );
}

export default AddCompany;
