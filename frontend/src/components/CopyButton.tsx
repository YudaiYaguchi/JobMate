import { FC, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { IconButton, useToast } from "@chakra-ui/react";

type CopyButtonProps = {
  copyText: string;
};

const CopyButton: FC<CopyButtonProps> = ({ copyText }) => {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("コピーに失敗しました:", err);
      toast({
        title: "コピーに失敗しました",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <IconButton
      icon={copied ? <FiCheck /> : <FiCopy />}
      onClick={handleCopy}
      colorScheme="blue"
      aria-label="テキストをコピー"
      variant="ghost"
      size="sm"
    />
  );
};

export default CopyButton;
