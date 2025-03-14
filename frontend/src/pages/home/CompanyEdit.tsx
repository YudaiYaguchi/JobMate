import { FC, useState } from "react";
import { Company } from "../../types/Company";
import { Button, HStack, Tr, Td, Text, Tooltip, Select, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { selectionTypeList, selectionStatusList, selectionResultList } from "./selectionOptions";
import { updateCompany } from "../../services/companyApi";

type CompanyEditProps = {
  company: Company;
  handleEditButton: (updatedData: Company) => void;
};

const CompanyEdit: FC<CompanyEditProps> = ({ company, handleEditButton }) => {
  const companyId = company.id;
  const [name, setName] = useState(company.name);
  const [selectionType, setSelectionType] = useState(company.selection_type || "");
  const [selectionStatus, setSelectionStatus] = useState(company.selection_status || "");
  const [selectionDate, setSelectionDate] = useState(company.selection_date || "");
  const [selectionResult, setSelectionResult] = useState(company.selection_result || "");
  const [error, setError] = useState<string>("");
  const validate = () => {
    let errorMessage = "";
    if (name.length <= 1) errorMessage = "企業名は2文字以上で入力してください";
    if (name.length >= 15) errorMessage = "企業名は15文字以内で入力してください";

    setError(errorMessage);
    return errorMessage === "";
  };

  const handleUpdateButton = async () => {
    if (validate()) {
      const updatedData = {
        id: companyId,
        name: name,
        selection_type: selectionType,
        selection_status: selectionStatus,
        selection_date: selectionDate,
        selection_result: selectionResult,
      };
      const res: Company = await updateCompany(updatedData);

      handleEditButton(res);
    }
  };

  return (
    <Tr fontFamily="sans-serif" fontStyle="normal" fontWeight="normal" bg="gray.200">
      <Td textAlign="left" pb="0px" pt="0px" pl="2" w="30%" border="1px solid #ddd">
        <HStack>
          <HStack w="auto" gap="2">
            <Button
              w="20px"
              p="0"
              variant="ghost"
              fontSize="12px"
              onClick={handUpdate}
              color="red"
              minW="20px"
            >
              削除
            </Button>
            <Button
              w="20px"
              p="0"
              fontSize="12px"
              variant="ghost"
              onClick={handleUpdateButton}
              color="blue"
              minW="20px"
            >
              保存
            </Button>
          </HStack>

          <FormControl isInvalid={!!error}>
            <Input
              p="0"
              w="full"
              h="full"
              textAlign="left"
              fontSize="inherit"
              borderRadius="0"
              borderColor="black"
              _hover={{ borderColor: "blue" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="企業名を入力してください"
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        </HStack>
      </Td>

      {/* 選考タイプ */}
      <Td textAlign="center" w="15%" border="1px solid #ddd" p="0 3px">
        <Select
          placeholder="選択してください"
          p="0"
          w="full"
          h="full"
          textAlign="center"
          fontSize="inherit"
          borderRadius="0"
          borderColor="black"
          _hover={{ borderColor: "blue" }}
          value={selectionType}
          onChange={(e) => setSelectionType(e.target.value)}
        >
          {selectionTypeList.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Td>

      {/* 選考状況 */}
      <Td textAlign="center" w="15%" border="1px solid #ddd" p="0 3px">
        <Select
          placeholder="選択してください"
          p="0"
          w="full"
          h="full"
          textAlign="center"
          fontSize="inherit"
          borderRadius="0"
          borderColor="black"
          _hover={{ borderColor: "blue" }}
          value={selectionStatus}
          onChange={(e) => setSelectionStatus(e.target.value)}
        >
          {selectionStatusList.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </Td>

      {/* 選考日付 */}
      <Td textAlign="center" w="20%" border="1px solid #ddd" p="0 3px">
        <Input
          p="0"
          w="full"
          h="23px"
          textAlign="center"
          fontSize="inherit"
          type="datetime-local"
          step="300"
          borderRadius="0"
          borderColor="black"
          _hover={{ borderColor: "blue" }}
          value={selectionDate === "-" ? "" : selectionDate}
          onChange={(e) => setSelectionDate(e.target.value)}
        />
      </Td>

      {/* 選考結果 */}
      <Td textAlign="center" border="1px solid #ddd" p="0 3px">

        <Select
          placeholder="選択してください"
          p="0"
          w="full"
          h="full"
          textAlign="center"
          fontSize="inherit"
          borderRadius="0"
          borderColor="black"
          _hover={{ borderColor: "blue" }}
          value={selectionResult}
          onChange={(e) => setSelectionResult(e.target.value)}
        >
          {selectionResultList.map((result, index) => (
            <option key={index} value={result}>
              {result}
            </option>
          ))}
        </Select>
      </Td>
    </Tr>
  );
};

export default CompanyEdit;
