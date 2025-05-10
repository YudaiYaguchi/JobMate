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
import { InputTodo, Todo, TodoPriority } from "@/types/Todo";
import { TodoPriorityList } from "@/constants/todoConstants";

type CompanyModalProps = {
  todo?: Todo;
  status: "create" | "update";
  isOpen: boolean;
  onClose: () => void;
  handleCreateTodo: (todo: InputTodo) => Promise<void>;
  handleUpdateTodo: (todo: Todo) => Promise<void>;
};

const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "タイトルは必須です"),
  date: string(),
  is_done: z.boolean(),
  priority: z.enum(["優先", "通常", "緊急"]),
  user_id: z.number().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

type FormData = {
  id?: number;
  title: string;
  date: string;
  is_done: boolean;
  priority: TodoPriority;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
};


const CompanyModal = ({ todo, status, isOpen, onClose, handleCreateTodo, handleUpdateTodo }: CompanyModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: todo?.id,
      title: todo?.title || "",
      date: todo?.date || "",
      is_done: todo?.is_done || false,
      priority: todo?.priority,
      user_id: todo?.user_id,
      created_at: todo?.created_at,
      updated_at: todo?.updated_at,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (status === "create") {
        await handleCreateTodo(data);
      } else if (status === "update" && todo) {
        await handleUpdateTodo({...todo,...data});
      }
      onClose();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <FaBuilding />
            <Text>タスク登録</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* タイトル */}
            <FormControl isRequired isInvalid={!!errors.title} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  タイトル
                </FormLabel>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <Input placeholder="例）証明写真を撮る" flex="1" {...field} />}
                />
              </HStack>
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            {/* 優先度*/}
            <FormControl isRequired isInvalid={!!errors.priority} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  優先度
                </FormLabel>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="選択してください" flex="1" {...field}>
                      {TodoPriorityList.map((priority, index) => (
                        <option key={index} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </HStack>
            </FormControl>

            {/* タスク期限*/}
            <FormControl isInvalid={!!errors.date} p="3%">
              <HStack spacing={4} align="center">
                <FormLabel minW="100px" m="0">
                  タスク期限
                </FormLabel>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => <Input type="datetime-local" flex="1" step="300" {...field} />}
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

export default CompanyModal;
