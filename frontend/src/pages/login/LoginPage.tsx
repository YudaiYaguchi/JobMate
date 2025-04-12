import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { createUser } from "../..//services/userApi";
import Toast from "../../components/Toast";


const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await createUser({
        name: username,
        email: email,
        password: password
      });
      navigate("/home");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box bg="gray.100" w="full" h="full">  
      {errorMessage && <Toast message={errorMessage} status="error" />}
      <Container p={10} centerContent minH="100vh" display="flex" alignItems="center">
        <Box
          p={6}
          borderRadius="lg"
          boxShadow="md"
          bg="white"
          w={{ base: "100%", sm: "400px" }}
        >
          {/* ヘッダー */}
          <Heading textAlign="center" fontSize="2xl" mb={4}>
            Job Mate
          </Heading>

          {/* ログイン / 新規登録 タブ */}
          <Flex justify="space-around" borderBottom="1px" borderColor="gray.200" pb={2} mb={4}>
            <Text
              fontWeight={isRegistering ? "normal" : "bold"}
              borderBottom={isRegistering ? "none" : "2px solid #3182CE"}
              color={isRegistering ? "gray.500" : "blue.500"}
              onClick={() => setIsRegistering(false)}
              cursor="pointer"
            >
              ログイン
            </Text>
            <Text
              fontWeight={isRegistering ? "bold" : "normal"}
              borderBottom={isRegistering ? "2px solid #3182CE" : "none"}
              color={isRegistering ? "blue.500" : "gray.500"}
              onClick={() => setIsRegistering(true)}
              cursor="pointer"
            >
              新規会員登録
            </Text>
          </Flex>

          {/* フォーム */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              {/* ユーザー名（新規登録時のみ表示） */}
              {isRegistering && (
                <FormControl>
                  <FormLabel>ユーザー名</FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="ユーザー名を入力"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputRightElement>
                      <Icon as={FaUser} color="gray.400" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              )}

              {/* メールアドレス */}
              <FormControl>
                <FormLabel>メールアドレス</FormLabel>
                <InputGroup>
                  <Input
                    type="email"
                    placeholder="sample@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputRightElement>
                    <Icon as={FaEnvelope} color="gray.400" />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* パスワード */}
              <FormControl>
                <FormLabel>パスワード</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  半角英数字のみ・8文字以上
                </Text>
              </FormControl>

              {/* リンク */}
              <Flex justify="space-between" fontSize="sm">
                <Link color="blue.500">パスワードを忘れた方</Link>
                <Link color="blue.500">ログインでお困りの方</Link>
              </Flex>

              {/* 自動ログイン */}
              <Checkbox
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                colorScheme="blue"
              >
                次回から自動ログイン
              </Checkbox>

              {/* ログインボタン */}
              <Button type="submit" colorScheme="blue" w="full">
                {isRegistering ? "新規登録" : "ログイン"}
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
