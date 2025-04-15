import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

const CompanySearchBar = () => {
  return (
    <Box pl="16">
      <InputGroup w="280px" h="30px" bg="white" borderRadius="8" borderColor="black">
        <InputLeftElement
          pointerEvents="none"
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IoIosSearch color="blue" size="18px" />
        </InputLeftElement>
        <Input
          color="black"
          h="30px"
          placeholder="企業名を入力してください"
          fontSize="sm"
        />
      </InputGroup>
    </Box>
  );
};

export default CompanySearchBar;
