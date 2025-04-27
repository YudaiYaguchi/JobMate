import { FC } from "react";
import {
  Box, Button, Flex, Heading, HStack, Text, Link as ChakraLink,
  Menu, MenuButton, MenuList, MenuItem, Avatar,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { User } from "../types/User";

type LayoutProps = {
  user: User | null;
};

export enum Pages {
  HOME = "/home",
  ENTRY_SHEETS = "/entry-sheets",
  INTERVIEW_QUESTIONS = "/interview-questions",
}

export const DefaultLayout: FC<LayoutProps> = ({ user }) => {
  const location = useLocation()
  const isHome = location.pathname === Pages.HOME;
  const isEntrySheets = location.pathname === Pages.ENTRY_SHEETS;
  const isInterviewQuestions = location.pathname === Pages.INTERVIEW_QUESTIONS;


  return (
    <>
      <Box as="header" w="full" position='sticky' top='0' zIndex='sticky'>
        <Flex
          bg="#5847F0"
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
              fontSize='18px'
              fontWeight="700"
              cursor="pointer"
              pl={4}
            >
              就活管理 ~JobMate~
            </Heading>
          </ChakraLink>

          {user && (
            <>
              <HStack
                w="60%"
                px={6}
                pt={1}
                spacing={4}
                textAlign="center"
                fontSize="md"
                color="white"
              >
                <Link to="/home">
                  <Text borderBottom={isHome ? '2px' : 'none'} pb={1} _hover={{ color: "purple.200" }} >
                    ダッシュボード
                  </Text>
                </Link>
                <Link to="/entry-sheets">
                  <Text borderBottom={isEntrySheets ? '2px' : 'none'} pb={1} _hover={{ color: "purple.200" }}>
                    ESまとめ
                  </Text>
                </Link>
                <Link to="/interview-questions">
                  <Text borderBottom={isInterviewQuestions ? '2px' : 'none'} pb={1} _hover={{ color: "purple.200" }}>
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
                <FaBell cursor="pointer" color='white' />
                <HStack>
                  <Menu>
                    <MenuButton as={Button} color='white' rightIcon={<ChevronDownIcon />} variant="ghost" _hover='none' _active='none'>
                      <Flex align="center" gap={2}>
                        <Avatar size="sm" bg='white' color='black' name={user.name} src="/placeholder-user.jpg" />
                        <Text color='white' display={{ base: "none", md: "block" }}>{user.name}</Text>
                      </Flex>
                    </MenuButton>
                    <MenuList color="black">
                      <MenuItem>プロフィール</MenuItem>
                      <MenuItem>設定</MenuItem>
                      <MenuItem>ログアウト</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </HStack>
            </>
          )
          }
          {
            !user && (
              <HStack position="absolute" right="12px" padding="8px" spacing="12px">
                <Button as={Link} to="/login" bg="none" border="none" color="white">
                  ログイン
                </Button>
                <Button as={Link} to="/register" bg="white" color="blue">
                  会員登録
                </Button>
              </HStack>
            )
          }
        </Flex >
      </Box >

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
