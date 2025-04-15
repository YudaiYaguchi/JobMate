import { HStack, Table, Td, Thead, Tr, Text } from "@chakra-ui/react";

const EmptyCompanyList = () => {
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Td p="0px 8px" bg="white" textAlign="center">
              <HStack
                h="100px"
                justifyContent="center"
                sx={{
                  animation: "slideIn 1s ease-out forwards",
                }}
              >
                <Text
                  color="blue.300"
                  fontSize="xl"
                  sx={{
                    opacity: 0,
                    animation: "fadeIn 1s ease-out 0.5s forwards",
                  }}
                >
                  選考中または選考予定の企業を追加しよう
                </Text>
              </HStack>
            </Td>
          </Tr>
        </Thead>
      </Table>

      {/* CSS animation definitions */}
      <style>
        {`
          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default EmptyCompanyList;
  