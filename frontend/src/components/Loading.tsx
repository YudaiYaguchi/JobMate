import { HStack, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <HStack justifyContent="center" alignItems="center" height="100vh">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </HStack>
  );
}