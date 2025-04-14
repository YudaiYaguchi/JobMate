import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  VStack,
  Icon,
  Link,
  Flex,
} from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import PasswordInput from "./PasswordInput";

interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({
  email,
  password,
  rememberMe,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <VStack spacing={4} align="stretch">
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

        <Flex justify="space-between" fontSize="sm">
          <Link color="blue.500">パスワードを忘れた方</Link>
          <Link color="blue.500">ログインでお困りの方</Link>
        </Flex>

        <Checkbox
          isChecked={rememberMe}
          onChange={(e) => onRememberMeChange(e.target.checked)}
          colorScheme="blue"
        >
          次回から自動ログイン
        </Checkbox>

        <Button type="submit" colorScheme="blue" w="full">
          ログイン
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm; 