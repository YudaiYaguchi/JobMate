import { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Company, InputCompany } from "@/types/Company";
import { selectionTypeList, selectionStatusList, selectionResultList } from "../../../../constants/selectionOptions";
import { updateCompany, deleteCompany } from "@/services/companyApi";

type CompanyEditProps = {
  company: Company;
  handleEditButton: (updatedData: Company) => void;
  handleDeleteButton: () => void;
};

const CompanyEdit: FC<CompanyEditProps> = ({ company, handleEditButton, handleDeleteButton }) => {
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
      const updatedData: InputCompany = {
        id: companyId,
        name,
        selection_type: selectionType,
        selection_status: selectionStatus,
        selection_date: selectionDate,
        selection_result: selectionResult,
      };
      const res: Company = await updateCompany(updatedData);
      handleEditButton(res);
    }
  };

  const handleDeleteConfirm = async () => {
    const isConfirmed = window.confirm(
      "本当に企業情報を削除してもよろしいでしょうか？\n削除された情報は復元できませんので、ご確認の上、操作を行ってください。"
    );
    if (isConfirmed) {
      await deleteCompany(companyId);
      handleDeleteButton();
    }
  };

  return (
    <Card
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "md" }}
    >
      {/* <CardHeader pb={0}>
        <Flex justify="space-between" align="center">
          <Text size="sm" fontWeight="bold">
            企業情報編集
          </Text>
        </Flex>
      </CardHeader> */}

      <CardBody >
        <VStack spacing={1}>
          {/* 企業名 */}
          <FormControl isInvalid={!!error}>
            <Flex align="center" gap={3}>
              <FormLabel minW="90px" fontSize="sm" m={0}>企業名</FormLabel>
              <Input
                size="sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="企業名を入力"
              />
            </Flex>
            <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>
          </FormControl>

          {/* 選考種別 */}
          <FormControl>
            <Flex align="center" gap={3}>
              <FormLabel minW="90px" fontSize="sm" m={0}>選考種別</FormLabel>
              <Select
                size="sm"
                placeholder="選択"
                value={selectionType}
                onChange={(e) => setSelectionType(e.target.value)}
              >
                {selectionTypeList.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Flex>
          </FormControl>

          {/* 選考状況 */}
          <FormControl>
            <Flex align="center" gap={3}>
              <FormLabel minW="90px" fontSize="sm" m={0}>選考状況</FormLabel>
              <Select
                size="sm"
                placeholder="選択"
                value={selectionStatus}
                onChange={(e) => setSelectionStatus(e.target.value)}
              >
                {selectionStatusList.map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Flex>
          </FormControl>

          {/* 選考日 */}
          <FormControl>
            <Flex align="center" gap={3}>
              <FormLabel minW="90px" fontSize="sm" m={0}>選考日</FormLabel>
              <Input
                size="sm"
                type="datetime-local"
                value={selectionDate === "-" ? "" : selectionDate}
                onChange={(e) => setSelectionDate(e.target.value)}
                step="300"
              />
            </Flex>
          </FormControl>

          {/* 選考結果 */}
          <FormControl>
            <Flex align="center" gap={3}>
              <FormLabel minW="90px" fontSize="sm" m={0}>選考結果</FormLabel>
              <Select
                size="sm"
                placeholder="選択"
                value={selectionResult}
                onChange={(e) => setSelectionResult(e.target.value)}
              >
                {selectionResultList.map((result, idx) => (
                  <option key={idx} value={result}>
                    {result}
                  </option>
                ))}
              </Select>
            </Flex>
          </FormControl>
        </VStack>
      </CardBody>

      <CardFooter pt={0} pb={1}>
        <Button colorScheme="blue" size="sm" width="full" onClick={handleUpdateButton}>
          保存
        </Button>
      </CardFooter>

      {error && (
        <Box px={4} pb={4}>
          <Alert status="error" mt={4} fontSize="sm">
            <AlertIcon />
            {error}
          </Alert>
        </Box>
      )}
    </Card>
  );
};

export default CompanyEdit;
