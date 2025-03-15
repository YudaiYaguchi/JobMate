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
import { createCompany } from "../../services/companyApi";
import { Company } from "@/types/Company";

type AddCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setSuccessCreate: React.Dispatch<React.SetStateAction<boolean>>;
  handleCompanyCreate: (newComapny: Company) => void;
};

const schema = z.object({
  name: z.string().min(1, "企業名を入力してください"),
  selection_type: string(),
  selection_status: string(),
  selection_date: string(),
  selection_result: string(),
});

type FormData = z.infer<typeof schema>;

const AddCompanyModal = ({ isOpen, onClose, setSuccessCreate, handleCompanyCreate }: AddCompanyModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      selection_type: "",
      selection_status: "",
      selection_date: "",
      selection_result: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await createCompany(data);
      handleCompanyCreate(res)
      console.log(res);
      setSuccessCreate(true);
      onClose();
    } catch (error) {
      setSuccessCreate(false);
    }
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
            <FormControl isRequired isInvalid={!!errors.name} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  企業名
                </FormLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input placeholder="○○○株式会社" flex="1" {...field} />}
                />
              </HStack>
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            {/* 選考種類 */}
            <FormControl isInvalid={!!errors.selection_type} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  選考種類
                </FormLabel>
                <Controller
                  name="selection_type"
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
            <FormControl isInvalid={!!errors.selection_status} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  選考状況
                </FormLabel>
                <Controller
                  name="selection_status"
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
            <FormControl isInvalid={!!errors.selection_date} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  選考日付
                </FormLabel>
                <Controller
                  name="selection_date"
                  control={control}
                  render={({ field }) => <Input type="datetime-local" flex="1" step="300" {...field} />}
                />
              </HStack>
            </FormControl>

            {/* 選考結果 */}
            <FormControl isInvalid={!!errors.selection_result} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  選考結果
                </FormLabel>
                <Controller
                  name="selection_result"
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
