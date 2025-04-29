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
import { FC, useEffect, useState } from "react";
import { Question } from "@/types/Question";

type QuestionAccordionProps = {
  questionList: Question[];
};

const QuestionAccordion: FC<QuestionAccordionProps> = ({ questionList }) => {
  const [randomQuestionList, setRandomQuestionList] = useState<Question[]>([]);

  useEffect(() => {
    const getRandomQuestionList = (questions: Question[], count: number) => {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const selectedQuestions = getRandomQuestionList(questionList, 5);
    setRandomQuestionList(selectedQuestions);
  }, [questionList]);

  return (
    <VStack w="full" align="stretch" bg="white">
      <Accordion allowMultiple>
        {randomQuestionList.map((question, index) => (
          <AccordionItem key={index}>
            <Text>
              <AccordionButton _expanded={{ bg: "blue.100" }} px={4} py={3}>
                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                  <Text fontWeight="medium">・{question.question}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4} px={4} whiteSpace="pre-wrap">
              {question.answer ?? "回答がまだ登録されていません"}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
};

export default QuestionAccordion;