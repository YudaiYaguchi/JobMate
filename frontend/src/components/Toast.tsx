import { useToast } from "@chakra-ui/react";
import { FC, useEffect } from "react";

type ToastProps = {
  status: "success" | "error" | "warning" | "info";
  message: string;
};

const Toast: FC<ToastProps> = ({ status, message }) => {
  const toast = useToast();

  useEffect(() => {
    toast({
      title: message,
      status: status,
      isClosable: true,
      duration: 3000,
    });
  }, []);

  return null;
};

export default Toast;

