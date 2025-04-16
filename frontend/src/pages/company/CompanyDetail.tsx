import { Company } from "../../types/Company";
import { Text, Box, HStack } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { TbHandFinger } from "react-icons/tb";


type CompanyDetailProps = {
  company: Company;
}

const CompanyDetail: FC<CompanyDetailProps> = ({ company }) => {
  return (
    <>
      <Box pl="0" bg="gray.50" borderLeft="4px" borderColor="blue.800">
        <HStack gap="1" align="start" p="10px" wrap="wrap">
          <Text>選考種類：</Text><Text color="red">{company.selection_type}</Text>
          <Text pl="6">選考状況：</Text><Text color="purple">{company.selection_status}</Text>
          <Text pl="6">選考日：</Text><Text color="green">{company.selection_date}</Text>
          <Text pl="6">選考結果：</Text><Text color="orange">{company.selection_result}</Text>
          <Text pl="6">マイページURL：</Text>
          <Link to={`http://localhost:3000/landing`}>
            <HStack
              role="group"
              color="blue.600"
              _hover={{ color: "blue", textDecoration: "underline" }}
              cursor="pointer"
            >
              <Text>マイページを確認</Text>
              <Box
                _groupHover={{ transform: "scale(1.1)", color: "blue" }}
                transition="all 0.1s"
              >
                <TbHandFinger />
              </Box>
            </HStack>
          </Link>
        </HStack>
      </Box>
      <Box p="20px 0" mb="10px" pt="0" borderBottom="1px solid gray" />
    </>
  );
};

export default CompanyDetail;