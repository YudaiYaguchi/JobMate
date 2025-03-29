import { VStack, Table, Tbody, Tr, Td, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { Question } from "@/types/Question";

type QuestionTableProps = {
  questionList: Question[];
};

const QuestionTable: FC<QuestionTableProps> = (props) => {
  return (
    <VStack p="10px 5%" w="100%">
      <Table variant="simple" w="100%" >
        <Tbody>
          {props.questionList.map((question, index) => (
            <Tr
              key={index}
              mb="30px"
            >
              <Td
                display="flex"
                alignItems="center"
                p="15px"
                border="2px solid #ddd"
                borderRadius="8px"
                boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
              >
                <Icon as={BsQuestionCircle} color="blue.500" mr={4} />
                {question.question}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default QuestionTable;
