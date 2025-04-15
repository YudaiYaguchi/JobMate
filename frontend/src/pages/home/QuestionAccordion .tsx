import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { Question } from "@/types/Question";

type QuestionAccordionProps = {
  questionList: Question[];
};

const QuestionAccordion: FC<QuestionAccordionProps> = ({ questionList }) => {
  return (
    <VStack w="full" align="stretch" bg="white">
      <Accordion allowMultiple>
        {questionList.map((question, index) => (
          <AccordionItem key={index}>
            <Text>
              <AccordionButton _expanded={{ bg: "blue.100" }} px={4} py={3}>
                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                  <Text fontWeight="medium">・{question.question}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4} px={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
              {question.answer ?? "回答がまだ登録されていません"}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
};

export default QuestionAccordion;
