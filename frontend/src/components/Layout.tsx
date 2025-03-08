import { FC } from "react";
import { Box, Button, Flex, Heading, HStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Outlet, Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";

type LayoutProps = {
  userName?: string;
};

export const Layout: FC<LayoutProps> = ({ userName }) => {
  return (
    <>
      <Box as="header" w='full'>
        <Flex
          background="linear-gradient(135deg, rgb(63, 63, 204), rgb(120, 120, 255))"
          align="center"
          py={4}
          px={4}
        >
          <Link to="/home">
            <Heading as="h1" color="white" fontFamily="Oswald, sans-serif" fontSize='2xl' fontWeight="700" cursor="pointer" pl={6}>
              就活管理 ~JobMate~
            </Heading>
          </Link>
          {!userName && (
            <>
              <HStack position='absolute' right='0px' padding='8px'>
                <Button bg='none' border='none' color="white">
                  ログイン
                </Button>
                <Button bg='white' color='blue'>
                  会員登録
                </Button>
              </HStack>
            </>
          )
          }
          {userName && (
            <HStack position='absolute' right='0px' padding='12px' gap="12px" >
              <FaBell cursor="pointer" />
              <HStack>
                <FaUser /><Text>{userName}</Text>
              </HStack>
            </HStack>
          )}
        </Flex>
        {userName && (
          <>
            <Flex
              justify="center"
              w="60%"
              py={2}
              gap={5}
              borderBottom="2px solid #ddd"
              mx="auto"
              fontFamily="bold"
            >
              <Link to="/home">
                <ChakraLink
                  textDecoration="none"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                  display="flex"
                  alignItems="center"
                >
                  <IoHomeOutline />
                </ChakraLink>
              </Link>

              <Link to="/all-es">
                <ChakraLink
                  textDecoration="none"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                  display="flex"
                  alignItems="center"
                >
                  ESまとめ
                </ChakraLink>
              </Link>

              <Link to="/interview-questions">
                <ChakraLink
                  textDecoration="none"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                  display="flex"
                  alignItems="center"
                >
                  面接質問まとめ
                </ChakraLink>
              </Link>
            </Flex>
          </>
        )}
      </Box >

      <Outlet /> {/*ここの部分が変わる*/}

      <Box
        as="footer"
        bg="rgb(20, 20, 50)"
        color="white"
        textAlign="center"
        py={4}
        w="100%"
        boxShadow="0px -4px 8px rgba(0, 0, 0, 0.2)"
        mt="auto"
      >
        <Text fontSize="sm">
          &copy; 2025 就活管理 JobMate. All rights reserved.
        </Text>
      </Box>
    </>
  );
};

