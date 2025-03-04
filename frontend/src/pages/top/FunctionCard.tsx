import { VStack, Text, Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { IconType } from "react-icons";

type FunctionCardProps = {
  icon: IconType;
  title: string;
  explainText: string;
};

const FunctionCard: FC<FunctionCardProps> = (props) => {
  return (
    <>
      <Box
        w="80%"
        maxH="auto"
        minH="200px"
        p="20px"
        border="3px solid #ddd"
        borderRadius="15px"
        bg="rgba(255, 255, 255, 0.7)"
        textAlign="center"
        boxShadow="4px 4px 10px rgba(0, 0, 0, 0.2)"
        transition="all 0.5s"
        position="relative"
        _hover={{
          bg: 'rgba(255, 255, 255, 1)',
          boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
        }}
      >
        <VStack h="full">
          <props.icon size="1.5rem" color="blue" />
          <Text color='black' fontWeight="700">{props.title}</Text>
          <Text color="black" display="flex" alignItems="center" h="90px">{props.explainText}</Text>
        </VStack>
      </Box>
    </>
  );
};

export default FunctionCard;
