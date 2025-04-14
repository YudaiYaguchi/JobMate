import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import PasswordInput from "./PasswordInput";

interface RegisterFormProps {
  userName: string;
  email: string;
  password: string;
  onUserNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm = ({
  userName,
  email,
  password,
  onUserNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: RegisterFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>ユーザー名</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="ユーザー名を入力"
              value={userName}
              onChange={(e) => onUserNameChange(e.target.value)}
            />
            <InputRightElement>
              <Icon as={FaUser} color="gray.400" />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <InputGroup>
            <Input
              type="email"
              placeholder="sample@example.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
            />
            <InputRightElement>
              <Icon as={FaEnvelope} color="gray.400" />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <PasswordInput value={password} onChange={onPasswordChange} />
        </FormControl>

        <Button type="submit" colorScheme="blue" w="full">
          新規登録
        </Button>
      </VStack>
    </form>
  );
};

export default RegisterForm; 