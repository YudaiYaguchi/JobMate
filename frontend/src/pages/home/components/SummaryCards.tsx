import { SimpleGrid, GridItem, Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { FC } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { CheckCircleIcon, TimeIcon } from "@chakra-ui/icons";
type SummaryCardsProps = {
}

const SummaryCards: FC<SummaryCardsProps> = () => {


  return (
    <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(4, 1fr)" }} gap={4} mb={8} p={2} bg='purple.100'>
      <GridItem px={3}>
        <Box p={4} bg={'white'} borderRadius="md" boxShadow="sm">
          <Flex justify="space-between" align="center">
            <Stat>
              <StatLabel color="gray.500">選考中企業</StatLabel>
              <StatNumber>9</StatNumber>
            </Stat>
            <Flex
              align="center"
              justify="center"
              bg="blue.100"
              color="blue.600"
              w="40px"
              h="40px"
              borderRadius="full"
            >
              <Box as={FaArrowTrendUp} />
            </Flex>
          </Flex>
        </Box>
      </GridItem>

      <GridItem px={3}>
        <Box p={4} bg={'white'} borderRadius="md" boxShadow="sm">
          <Flex justify="space-between" align="center">
            <Stat>
              <StatLabel color="gray.500">今週の予定</StatLabel>
              <StatNumber>3</StatNumber>
            </Stat>
            <Flex
              align="center"
              justify="center"
              bg="yellow.100"
              color="yellow.600"
              w="40px"
              h="40px"
              borderRadius="full"
            >
              <Box as={FaCalendarAlt} />
            </Flex>
          </Flex>
        </Box>
      </GridItem>

      <GridItem px={3}>
        <Box p={4} bg={"white"} borderRadius="md" boxShadow="sm">
          <Flex justify="space-between" align="center">
            <Stat>
              <StatLabel color="gray.500">合格</StatLabel>
              <StatNumber>4</StatNumber>
            </Stat>
            <Flex
              align="center"
              justify="center"
              bg="green.100"
              color="green.600"
              w="40px"
              h="40px"
              borderRadius="full"
            >
              <CheckCircleIcon />
            </Flex>
          </Flex>
        </Box>
      </GridItem>

      <GridItem px={3}>
        <Box p={4} bg={'white'} borderRadius="md" boxShadow="sm">
          <Flex justify="space-between" align="center">
            <Stat>
              <StatLabel color="gray.500">未完了タスク</StatLabel>
              <StatNumber>5</StatNumber>
            </Stat>
            <Flex
              align="center"
              justify="center"
              bg="red.100"
              color="red.600"
              w="40px"
              h="40px"
              borderRadius="full"
            >
              <TimeIcon />
            </Flex>
          </Flex>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};

export default SummaryCards;