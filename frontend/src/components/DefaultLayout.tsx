import { FC } from "react";
import { Box, Button, Flex, Heading, HStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Outlet, Link } from 'react-router-dom';
import { FaUser, FaBell } from "react-icons/fa";
import { User } from "../types/User";

type LayoutProps = {
  user: User | null;
};

export const DefaultLayout: FC<LayoutProps> = ({ user }) => {
  return (
    <>
      <Box as="header" w="full">
        <Flex
          background="linear-gradient(135deg, rgb(63, 63, 204), rgb(120, 120, 255))"
          align="center"
          py={4}
          px={4}
          position="relative"
        >
          <ChakraLink as={Link} to="/home" _hover={{ textDecoration: "none" }}>
            <Heading
              as="h1"
              color="white"
              fontFamily="Oswald, sans-serif"
              fontSize="2xl"
              fontWeight="700"
              cursor="pointer"
              pl={6}
            >
              就活管理 ~JobMate~
            </Heading>
          </ChakraLink>

          { user && (
            <>
              <HStack
                w="60%"
                justify="center"
                spacing={6}
                textAlign="center"
                fontSize="md"
                color="white"
              >
                <Link to="/home">
                  <Text _hover={{ textDecoration: "underline" }} fontWeight="bold">
                    ESまとめ
                  </Text>
                </Link>
                <Link to="/interview-questions">
                  <Text _hover={{ textDecoration: "underline" }} fontWeight="bold">
                    面接質問まとめ
                  </Text>
                </Link>
              </HStack>


              <HStack
                position="absolute"
                right="12px"
                padding="8px"
                spacing="12px"
              >
                <FaBell cursor="pointer" />
                <HStack>
                  <FaUser />
                  <Text>{user.name}</Text>
                </HStack>
              </HStack>
            </>
          )}

          {!user && (
            <HStack position="absolute" right="12px" padding="8px" spacing="12px">
              <Button as={Link} to="/login" bg="none" border="none" color="white">
                ログイン
              </Button>
              <Button as={Link} to="/register" bg="white" color="blue">
                会員登録
              </Button>
            </HStack>
          )}
        </Flex>
      </Box>

      <Outlet />

      <Box
        as="footer"
        bg="rgb(20, 20, 50)"
        color="white"
        textAlign="center"
        py={4}
        w="100%"
        boxShadow="0px -4px 8px rgba(0, 0, 0, 0.2)"
      >
        <Text fontSize="sm">
          &copy; 2025 就活管理 JobMate. All rights reserved.
        </Text>
      </Box>
    </>
  );
};
