import { Company } from "../../types/Company";
import { Text, Box, Badge, HStack } from "@chakra-ui/react";
import { FC } from "react";

type CompanyDetailProps = {
  company: Company;
}

const CompanyDetail: FC<CompanyDetailProps> = ({ company }) => {
  return (
    <Box
      flex="1"
      p={4}
      borderWidth={1}
      borderRadius="md"
      bg="gray.50"
      boxShadow="md"
    >
      <HStack justify="space-between" mb={2}>
        <Badge colorScheme="blue" fontSize="lg">{company.selection_type}</Badge>
        <Badge colorScheme={company.selection_status === "進行中" ? "yellow" : "green"} fontSize="md">
          {company.selection_status}
        </Badge>
      </HStack>
      <Text mb={1}><strong>選考日付:</strong> {company.selection_date}</Text>
      <Text><strong>選考結果:</strong> {company.selection_result}</Text>
      <Text><strong>マイページURL:</strong> </Text>
    </Box>
  );
};

export default CompanyDetail;