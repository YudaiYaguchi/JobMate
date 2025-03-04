import { VStack, Image, Box, Text, Flex, Center, Button } from "@chakra-ui/react"
import { User } from "@/types/Index";
import FunctionCard from "./FunctionCard";
import functionCardList from "./functionCardList";

const user: User = {
  id: 1,
  name: 'Yaguchi Yudai',
  password: 'yudai 0503'
}

const Top = () => {
  return (
    <>
      <Box position="relative" width="full" height="auto">
        <Image
          src="/images/sky.jpg"
          alt="Sky"
          objectFit="cover"
          width="100%"
          height="220vh"
          zIndex="-1"
        />
        <VStack>
          <Text
            position="absolute"
            top="40px"
            color="white"
            p='10px 25%'
            textAlign='center'
          >
            このプラットフォームは、就職活動を効率的にサポートするツールを提供します。<br />
            選考中の企業情報や面接の反省、面接質問の管理、スケジュール調整、ES作成など、<br />全てを一元管理できます。<br />
            これにより、準備が整い、就活をスムーズに進めることができます。<br />今すぐ活用して、就職活動を成功に導きましょう！！
          </Text>

          <Flex
            alignItems="center"
            justifyContent="center"
            wrap="wrap"
            gap={2}
            w="100%"
            top="300px"
            position="absolute"
          >
            {functionCardList.map((functionCard, index) => (
              <Center
                key={index}
                w="40%"
                p="10px"
                justifyContent={index % 2 === 0 ? 'flex-end' : 'flex-start'}
              >
                <FunctionCard
                  icon={functionCard.icon}
                  title={functionCard.title}
                  explainText={functionCard.explainText}
                />
              </Center>
            ))}
          </Flex>
          <Button position="absolute" w="250px" p="25px" top="calc(300px + 660px + 100px)" borderRadius="30px" bg="orange">今すぐ登録する</Button>
        </VStack>
      </Box >
    </>
  )
}

export default Top;