import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
} from "@chakra-ui/react";
import { createUser,loginUser } from "../../services/userApi";
import Toast from "../../components/Toast";
import AuthTabs from "./components/AuthTabs";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

type LoginPageProps = {
  fetchCurrentUser: () => void;
}

const LoginPage: FC<LoginPageProps> = ({fetchCurrentUser}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect (() => {
      localStorage.removeItem("token")
  },[]); 

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await createUser({
        name: userName,
        email: email,
        password: password,
      });
      fetchCurrentUser();
      navigate("/home");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await loginUser({
        email: email,
        password: password,
      });
      fetchCurrentUser();
      navigate("/home");
    } catch (error: any) {
      setErrorMessage(error.message || "ログインに失敗しました");
    }
  };

  return (
    <Box bg="gray.100" w="full" h="full">
      {errorMessage && <Toast message={errorMessage} status="error" />}
      <Container p={10} centerContent display="flex" alignItems="center">
        <Box
          p={6}
          borderRadius="lg"
          boxShadow="md"
          bg="white"
          w={{ base: "100%", sm: "400px" }}
        >
          <Heading textAlign="center" fontSize="2xl" mb={4}>
            Job Mate
          </Heading>

          <AuthTabs
            isRegistering={isRegistering}
            onTabChange={setIsRegistering}
          />

          {isRegistering ? (
            <RegisterForm
              userName={userName}
              email={email}
              password={password}
              onUserNameChange={setUserName}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleRegister}
            />
          ) : (
            <LoginForm
              email={email}
              password={password}
              rememberMe={rememberMe}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onRememberMeChange={setRememberMe}
              onSubmit={handleLogin}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
