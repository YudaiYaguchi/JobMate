import { Input, InputGroup, InputRightElement, Button, Text } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="********"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
      <Text fontSize="xs" color="gray.500" mt={1}>
        半角英数字のみ・8文字以上
      </Text>
    </InputGroup>
  );
};

export default PasswordInput; 