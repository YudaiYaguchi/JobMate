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
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { selectionTypeList, selectionStatusList, selectionResultList } from "./selectionOptions";

type AddCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const schema = z.object({
  companyName: z.string().min(1, "企業名を入力してください"),
  selectionType: string(),
  selectionStatus: string(),
  selectionDate: string(),
  selectionResult: string(),
});

type FormData = z.infer<typeof schema>;

const AddCompanyModal = ({ isOpen, onClose }: AddCompanyModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      selectionType: "",
      selectionStatus: "",
      selectionDate: "",
      selectionResult: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("送信データ:", data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <FaBuilding />
            <Text>新規企業を登録</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 企業名 */}
            <FormControl isRequired isInvalid={!!errors.companyName} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  企業名
                </FormLabel>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => <Input placeholder="○○○株式会社" flex="1" {...field} />}
                />
              </HStack>
              <FormErrorMessage>{errors.companyName?.message}</FormErrorMessage>
            </FormControl>

            {/* 選考種類 */}
            <FormControl isInvalid={!!errors.selectionType} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  選考種類
                </FormLabel>
                <Controller
                  name="selectionType"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="選択してください" flex="1" {...field}>
                      {selectionTypeList.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </HStack>
            </FormControl>

            {/* 選考状況 */}
            <FormControl isInvalid={!!errors.selectionStatus} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  選考状況
                </FormLabel>
                <Controller
                  name="selectionStatus"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="選択してください" flex="1" {...field}>
                      {selectionStatusList.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </HStack>
            </FormControl>

            {/* 選考日付 */}
            <FormControl isInvalid={!!errors.selectionDate} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  選考日付
                </FormLabel>
                <Controller
                  name="selectionDate"
                  control={control}
                  render={({ field }) => <Input type="datetime-local" flex="1" step="300" {...field} />}
                />
              </HStack>
            </FormControl>

            {/* 選考結果 */}
            <FormControl isInvalid={!!errors.selectionResult} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  選考結果
                </FormLabel>
                <Controller
                  name="selectionResult"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="選択してください" flex="1" {...field}>
                      {selectionResultList.map((result, index) => (
                        <option key={index} value={result}>
                          {result}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </HStack>
            </FormControl>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                閉じる
              </Button>
              <Button type="submit" colorScheme="teal">
                登録
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddCompanyModal;
