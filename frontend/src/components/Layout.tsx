import { FC } from "react";
import { Box, Button, Flex, Heading, HStack, Link, Text, Image } from "@chakra-ui/react";
import { Outlet } from 'react-router-dom';

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
          <Heading as="h1" color="white" fontFamily="Oswald, sans-serif" fontSize='2xl' fontWeight="700" pl={6}>
            就活管理 ~JobMate~
          </Heading>
          {!userName && (
            <>
              <HStack position='absolute' right='0px' padding='8px'>
                <Button bg='none' border='none'>
                  ログイン
                </Button>
                <Button bg='white' color='blue'>
                  会員登録
                </Button>
              </HStack>
            </>
          )
          }
        </Flex>
        {userName && (
          <>
            <Box px={4} py={2}>
              <Text>ログインユーザー： {userName}</Text>
            </Box>

            <Flex
              justify="center"
              w="60%"
              py={2}
              gap={5}
              borderBottom="2px solid #ddd"
              mx="auto"
            >
              <Link href="/home" textDecoration="none" color="blue.500" _hover={{ textDecoration: "underline" }}>
                ホーム
              </Link>
              <Link href="/all-es" textDecoration="none" color="blue.500" _hover={{ textDecoration: "underline" }}>
                ESまとめ
              </Link>
              <Link href="/interview-questions" textDecoration="none" color="blue.500" _hover={{ textDecoration: "underline" }}>
                面接の質問まとめ
              </Link>
            </Flex>
          </>
        )}
      </Box>

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

