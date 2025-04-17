import { Company } from "@/types/Company";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  VStack,
  Text,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { FC, useState } from "react";
import { color } from "framer-motion";
import { Link } from "react-router-dom";

type CompanySearchBarProps = {
  companyList: Company[];
};

const CompanySearchBar: FC<CompanySearchBarProps> = ({ companyList }) => {
  const [searchWord, setSearchWord] = useState("");

  const filteredCompanies: Company[] = companyList.filter((company) =>
    company.name.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <Box pl="16" position="relative">
      <Popover
        isOpen={!!searchWord}
        closeOnBlur={false}
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <PopoverTrigger>
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
              onChange={(e) => setSearchWord(e.target.value)}
              value={searchWord}
              autoFocus
            />
          </InputGroup>
        </PopoverTrigger>

        <PopoverContent w="280px">
          <PopoverArrow />
          <PopoverBody>
            <VStack align="start" spacing={1}>
              {filteredCompanies.length > 0 && companyList.length != filteredCompanies.length ? (
                filteredCompanies.map((company) => (
                  <Link to={`/company/${company.id}`}>
                    <Text color="blue" _hover={{ textDecoration: "underline" }}>{company.name}</Text>
                  </Link>
                ))
              ) : (
                <Text fontSize="sm" color="gray.500">
                  一致する企業がありません
                </Text>
              )}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box >
  );
};

export default CompanySearchBar;
