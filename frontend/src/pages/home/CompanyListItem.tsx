import { FC, useState } from "react";
import { Company } from "../../types/Company";
import { Button, HStack, Tr, Td, Text, Tooltip, Select } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import CompanyEdit from "./CompanyEdit";

type CompanyListItemProps = {
  company: Company;
};

const CompanyListItem: FC<CompanyListItemProps> = ({ company }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [edit, setEdit] = useState(false)
  const focusCompanyInfo = () => {
    setIsHovered(true);
  };

  const resetCompanyInfo = () => {
    setIsHovered(false);
  };

  const handleEditButton = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  if (edit) {
    return (<CompanyEdit
      company={company}
      handleEditButton={handleEditButton}
    />
    );

  } else {
    return (
      <Tr
        key={company.id}
        fontFamily="sans-serif"
        fontStyle="normal"
        fontWeight="normal"
        _hover={{ backgroundColor: isHovered ? "gray.200" : "transparent" }}
      >
        <Td textAlign="left" pb="0px" pt="0px" w="30%" border="1px solid #ddd">
          <HStack>
            <Tooltip hasArrow label="編集" bg="gray.300" color="black">
              <Button
                variant="ghost"
                p="0px 8px"
                onMouseEnter={focusCompanyInfo}
                onMouseLeave={resetCompanyInfo}
                onClick={handleEditButton}
                _hover={{ color: "blue" }}
              >
                <FaRegEdit size="1rem" />
              </Button>
            </Tooltip>
            <Text>{company.name}</Text>
          </HStack>
        </Td>
        <Td textAlign="center" w="15%" border="1px solid #ddd">{company.selection_type}</Td>
        <Td textAlign="center" w="15%" border="1px solid #ddd">{company.selection_status}</Td>
        <Td textAlign="center" w="20%" border="1px solid #ddd">{company.selection_date}</Td>
        <Td textAlign="center" border="1px solid #ddd">{company.selection_result}</Td>
      </Tr>
    );
  }

};

export default CompanyListItem;