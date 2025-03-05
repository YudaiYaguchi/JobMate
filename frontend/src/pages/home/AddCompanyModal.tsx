import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { selectionTypeList, selectionStatusList, selectionResultList } from "./selectionOptions";

type AddCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddCompanyModal = ({ isOpen, onClose }: AddCompanyModalProps) => {
  const [companyName, setCompanyName] = useState("");
  const [selectionType, setSelectionType] = useState("");
  const [selectionStatus, setSelectionStatus] = useState("");
  const [selectionDate, setSelectionDate] = useState("");
  const [selectionResult, setSelectionResult] = useState("");

  const handleSubmit = () => {
    const formData = {
      companyName,
      selectionType,
      selectionStatus,
      selectionDate,
      selectionResult,
    };
    console.log("送信データ:", formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新規企業を登録</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* 企業名 */}
          <FormControl isRequired p="3%">
            <HStack spacing={4} align="center">
              <FormLabel minW="100px" m="0">企業名</FormLabel>
              <Input
                placeholder="○○○株式会社"
                flex="1"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </HStack>
          </FormControl>

          {/* 選考種類 */}
          <FormControl isRequired p="3%">
            <HStack spacing={4} align="center">
              <FormLabel minW="100px" m="0">選考種類</FormLabel>
              <Select
                placeholder="選択してください"
                flex="1"
                value={selectionType}
                onChange={(e) => setSelectionType(e.target.value)}
              >
                {selectionTypeList.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </Select>
            </HStack>
          </FormControl>

          {/* 選考状況 */}
          <FormControl isRequired p="3%">
            <HStack spacing={4} align="center">
              <FormLabel minW="100px" m="0">選考状況</FormLabel>
              <Select
                placeholder="選択してください"
                flex="1"
                value={selectionStatus}
                onChange={(e) => setSelectionStatus(e.target.value)}
              >
                {selectionStatusList.map((status, index) => (
                  <option key={index} value={status}>{status}</option>
                ))}
              </Select>
            </HStack>
          </FormControl>

          {/* 選考日付 */}
          <FormControl isRequired p="3%">
            <HStack spacing={4} align="center">
              <FormLabel minW="100px" m="0">選考日付</FormLabel>
              <Input
                type="datetime-local"
                flex="1"
                step="300"
                value={selectionDate}
                onChange={(e) => setSelectionDate(e.target.value)}
              />
            </HStack>
          </FormControl>

          {/* 選考結果 */}
          <FormControl isRequired p="3%">
            <HStack spacing={4} align="center">
              <FormLabel minW="100px" m="0">選考結果</FormLabel>
              <Select
                placeholder="選択してください"
                flex="1"
                value={selectionResult}
                onChange={(e) => setSelectionResult(e.target.value)}
              >
                {selectionResultList.map((result, index) => (
                  <option key={index} value={result}>{result}</option>
                ))}
              </Select>
            </HStack>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            閉じる
          </Button>
          <Button border="1px" onClick={handleSubmit}>
            登録
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCompanyModal;
