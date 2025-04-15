import { FC, useState } from "react";
import { Company } from "../../types/Company";
import { Button, HStack, Tr, Td, Text, Tooltip } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import CompanyEdit from "./CompanyEdit";
import Toast from "../../components/Toast";

type CompanyListItemProps = {
  company: Company;
};

const CompanyListItem: FC<CompanyListItemProps> = ({ company }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [name, setName] = useState(company.name);
  const [selectionType, setSelectionType] = useState(company.selection_type);
  const [selectionStatus, setSelectionStatus] = useState(company.selection_status);
  const [selectionDate, setSelectionDate] = useState(company.selection_date);
  const [selectionResult, setSelectionResult] = useState(company.selection_result);

  const focusCompanyInfo = () => {
    setIsHovered(true);
  };

  const resetCompanyInfo = () => {
    setIsHovered(false);
  };

  const handleEditButton = (updatedData: Company) => {
    setIsEdit((prevIsEdit) => !prevIsEdit);
    setName(updatedData.name);
    setSelectionType(updatedData.selection_type);
    setSelectionStatus(updatedData.selection_status);
    setSelectionDate(updatedData.selection_date);
    setSelectionResult(updatedData.selection_result);
    company.name = name;
    company.selection_type = selectionType;
    company.selection_status = selectionStatus;
    company.selection_date = selectionDate;
    company.selection_result = selectionResult;
  };

  const handleDeleteButton = () => {
    setIsDeleted(true);
  };

  if (isDeleted) {
    return <Toast status="success" message="正常に企業情報が削除されました。" />;
  } else if (isEdit) {
    return (
      <CompanyEdit
        company={company}
        handleEditButton={handleEditButton}
        handleDeleteButton={handleDeleteButton}
      />
    );
  } else {
    return (
      <>
        <Tr
          key={company.id}
          fontFamily="sans-serif"
          fontStyle="normal"
          fontWeight="normal"
          sx={{
            _hover: {
              td: {
                bg: "blue.100",
              },
            },
          }}
        >
          <Td textAlign="left" bg="white" pb="0px" pt="0px" w="30%" border="1px solid #ddd">
            <HStack>
              <Tooltip hasArrow label="編集" bg="gray.300" color="black">
                <Button
                  variant="ghost"
                  p="0px 8px"
                  onMouseEnter={focusCompanyInfo}
                  onMouseLeave={resetCompanyInfo}
                  onClick={() => handleEditButton(company)}
                  _hover={{ color: "blue" }}
                >
                  <FaRegEdit size="1rem" />
                </Button>
              </Tooltip>
              <Link to={`/company/${company.id}`}>
                <Text color="blue"  _hover={{ textDecoration: "underline" }}>{name}</Text>
              </Link>
            </HStack>
          </Td>
          <Td textAlign="center" bg="white" w="15%" border="1px solid #ddd">{selectionType}</Td>
          <Td textAlign="center" bg="white" w="15%" border="1px solid #ddd">{selectionStatus}</Td>
          <Td textAlign="center" bg="white" w="20%" border="1px solid #ddd">{selectionDate}</Td>
          <Td textAlign="center" bg="white" border="1px solid #ddd">{selectionResult}</Td>
        </Tr>
      </>
    );
  }
};

export default CompanyListItem;