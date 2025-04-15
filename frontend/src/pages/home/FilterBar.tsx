import { Box, HStack, Tag } from "@chakra-ui/react";

const FilterBar = () => {
  return (
    <HStack>
      <Tag
        size="md"
        variant="subtle"
        colorScheme="blue"
        borderRadius="full"
        px="12px"
        py="6px"
        fontWeight="medium"
        cursor="pointer"
        _hover={{ bg: "blue.300" }}
      >
        選考中 5
      </Tag>
      <Tag
          size="md"
          variant="subtle"
          colorScheme="yellow"
          borderRadius="full"
          px="12px"
          py="6px"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ bg: "yellow.300" }}
        >
          もうすぐ 10
      </Tag>
      <Tag
          size="md"
          variant="subtle"
          colorScheme="green"
          borderRadius="full"
          px="12px"
          py="6px"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ bg: "green.300" }}
        >
          今週中 7
      </Tag>
    </HStack>
  );
};

export default FilterBar;
