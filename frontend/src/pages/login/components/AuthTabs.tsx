import { Flex, Text } from "@chakra-ui/react";

interface AuthTabsProps {
  isRegistering: boolean;
  onTabChange: (isRegistering: boolean) => void;
}

const AuthTabs = ({ isRegistering, onTabChange }: AuthTabsProps) => {
  return (
    <Flex justify="space-around" borderBottom="1px" borderColor="gray.200" pb={2} mb={4}>
      <Text
        fontWeight={isRegistering ? "normal" : "bold"}
        borderBottom={isRegistering ? "none" : "2px solid #3182CE"}
        color={isRegistering ? "gray.500" : "blue.500"}
        onClick={() => onTabChange(false)}
        cursor="pointer"
      >
        ログイン
      </Text>
      <Text
        fontWeight={isRegistering ? "bold" : "normal"}
        borderBottom={isRegistering ? "2px solid #3182CE" : "none"}
        color={isRegistering ? "blue.500" : "gray.500"}
        onClick={() => onTabChange(true)}
        cursor="pointer"
      >
        新規会員登録
      </Text>
    </Flex>
  );
};

export default AuthTabs; 