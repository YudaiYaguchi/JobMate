import { Button, Text } from "@chakra-ui/react";
import AddCompanyModal from "./AddCompanyModal";
import { useState, useEffect, FC } from "react";
import Toast from "@/components/Toast";
import { Company } from "@/types/Company";

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
      <Button
        bg='blue'
        size="sm"
        color='white'
        _hover={{ bg: 'blue.600' }}
        mr={3}
        onClick={openModal}
      >
        <Text fontSize="sm" fontWeight="bold">
          + 企業を追加
        </Text>
      </Button>
      <AddCompanyModal isOpen={isOpen} onClose={closeModal} setSuccessCreate={setSuccessCreate} handleCompanyCreate={handleCompanyCreate} />
    </>
  );
}

export default AddCompany;
