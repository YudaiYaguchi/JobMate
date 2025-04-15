import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

const CompanySearchBar = () => {
  return (
    <Box pl="16">
    <InputGroup w="220px" h="30px" >
      <InputLeftElement
        pointerEvents="none"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <IoIosSearch color="gray.400" size="18px" />
      </InputLeftElement>
      <Input
        h="30px"
        pl="30px"
        placeholder="企業名を入力してください"
        fontSize="sm"
      />
    </InputGroup>
    </Box>
  );
};

export default CompanySearchBar;