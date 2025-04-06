import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  useColorModeValue,
  Flex,
  Icon,
  Stack,
  HStack,
  Image,
  Badge,
  Divider,
  useColorMode,
  IconButton,
  Grid,
  GridItem,
  Tag,
} from '@chakra-ui/react';
import { FaUserGraduate, FaHandshake, FaClock, FaCheckCircle, FaArrowRight, FaRocket } from 'react-icons/fa';
import { IoSearchOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { BsGraphUpArrow, BsChatText } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { IconType } from "react-icons";

// FunctionCardコンポーネント
const FunctionCard: React.FC<{
  icon: IconType;
  title: string;
  explainText: string;
}> = ({ icon: Icon, title, explainText }) => {
  return (
    <Box
      w="100%"
      maxH="auto"
      minH="200px"
      p="20px"
      border="3px solid #ddd"
      borderRadius="15px"
      bg="rgba(255, 255, 255, 0.7)"
      textAlign="center"
      boxShadow="4px 4px 10px rgba(0, 0, 0, 0.2)"
      transition="all 0.5s"
      position="relative"
      _hover={{
        bg: 'rgba(255, 255, 255, 1)',
        boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        transform: 'translateY(-5px)',
      }}
    >
      <VStack h="full">
        <Icon size="1.5rem" color="blue" />
        <Text color='black' fontWeight="700">{title}</Text>
        <Text color="black" display="flex" alignItems="center" h="90px">{explainText}</Text>
      </VStack>
    </Box>
  );
};

// 機能カードリスト
const functionCardList = [
  {
    icon: BsGraphUpArrow,
    title: "選考中の企業管理",
    explainText: "合否、選考日付、選考状況、選考結果を一元管理できます。",
  },
  {
    icon: IoSearchOutline,
    title: "企業研究",
    explainText: "志望企業の情報を一元管理！業界研究もスムーズに進めて、万全の準備を整えましょう。",
  },
  {
    icon: BsChatText,
    title: "面接反省",
    explainText: "面接の手応えを振り返り、次回の成功につなげよう！成長の記録があなたの自信になります。",
  },
  {
    icon: FaRegQuestionCircle,
    title: "面接の質問の登録",
    explainText: "実際に聞かれた質問とベストな回答をストック！あなただけの「面接攻略ノート」を作成しよう。",
  },
  {
    icon: IoCalendarNumberOutline,
    title: "スケジュール管理",
    explainText: "面接日程や企業の選考スケジュールを効率的に管理！重要な予定を見逃さず、準備万端で就職活動を進めましょう。",
  },
  {
    icon: FiFileText,
    title: "ES管理",
    explainText: "書類選考の通過率をアップ！過去のESを活用して、効率的に質の高いエントリーシートを作成しよう。",
  },
];

const LandingPage: React.FC = () => {
  const { colorMode } = useColorMode();
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, white)',
    'linear(to-br, blue.900, gray.900)'
  );

  const cardBg = useColorModeValue('white', 'gray.700');
  const cardHoverBg = useColorModeValue('blue.50', 'gray.600');
  const statsBg = useColorModeValue('white', 'gray.800');
  const statsTextColor = useColorModeValue('gray.600', 'gray.300');
  const featuresBg = useColorModeValue('white', 'gray.700');
  const featureTextColor = useColorModeValue('gray.600', 'gray.300');

  const features = [
    {
      title: 'ES管理',
      description: 'エントリーシートの作成・管理を効率化。テンプレート機能で素早く作成できます。過去のESを活用して、効率的に質の高いエントリーシートを作成しよう。',
      icon: FaUserGraduate,
      benefits: ['テンプレート機能', '履歴管理', 'AIによる添削', '書類選考通過率アップ'],
    },
    {
      title: '面接質問管理',
      description: '面接で聞かれた質問を記録・分析。次回の面接対策に活かせます。実際に聞かれた質問とベストな回答をストック！あなただけの「面接攻略ノート」を作成しよう。',
      icon: FaHandshake,
      benefits: ['質問カテゴリ分類', '回答例の保存', 'フィードバック管理', '面接対策'],
    },
    {
      title: 'スケジュール管理',
      description: '選考スケジュールをカレンダーで管理。面接や説明会の予定を逃しません。重要な予定を見逃さず、準備万端で就職活動を進めましょう。',
      icon: FaClock,
      benefits: ['カレンダー連携', 'リマインダー設定', '進捗管理', '予定管理'],
    },
    {
      title: '選考中の企業管理',
      description: '合否、選考日付、選考状況、選考結果を一元管理できます。',
      icon: BsGraphUpArrow,
      benefits: ['選考状況の可視化', '進捗管理', '選考結果の記録'],
    },
    {
      title: '企業研究',
      description: '志望企業の情報を一元管理！業界研究もスムーズに進めて、万全の準備を整えましょう。',
      icon: IoSearchOutline,
      benefits: ['企業情報の整理', '業界研究', '志望動機の作成'],
    },
    {
      title: '面接反省',
      description: '面接の手応えを振り返り、次回の成功につなげよう！成長の記録があなたの自信になります。',
      icon: BsChatText,
      benefits: ['面接フィードバック', '改善点の記録', '成長の可視化'],
    },
  ];

  const stats = [
    { label: '登録ユーザー数', value: '10,000+' },
    { label: '企業情報数', value: '5,000+' },
    { label: '月間アクティブユーザー', value: '3,000+' },
  ];

  const benefits = [
    '無料で始められる',
    '直感的なUI',
    'モバイル対応',
    '使いやすいダッシュボード',
    'カスタマイズ可能な設定',
    '豊富な統計情報',
  ];

  return (
    <Box minH="100vh" bg={bgGradient}>
      <Box as="header" w="full">
        <Flex
          background="linear-gradient(135deg, rgb(63, 63, 204), rgb(120, 120, 255))"
          align="center"
          py={4}
          px={4}
          position="relative"
        >
          <Heading
            as="h1"
            color="white"
            fontFamily="Oswald, sans-serif"
            fontSize="2xl"
          >
            就活管理 ~JobMate~
          </Heading>
        </Flex>
      </Box>  
      {/* Hero Section */}
      <Box bg="white" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top={0}
          right={0}
          w="50%"
          h="100%"
          bg="blue.50"
          clipPath="polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)"
        />
        <Container maxW="container.xl" position="relative" py={20}>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8} alignItems="center">
            <GridItem>
              <VStack align="start" spacing={6}>
                <HStack spacing={4}>
                  <Tag size="lg" colorScheme="blue" borderRadius="full" px={4} >
                    <Icon as={FaRocket} mr={2} />
                    就活を効率化
                  </Tag>
                </HStack>
                <Heading
                  as="h1"
                  size="2xl"
                  fontWeight="bold"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  就活をスマートに、<br />効率的に
                </Heading>
                <Text fontSize="xl" color="gray.600">
                  JobMateで、あなたの就活をサポートします。<br />
                  ES管理から面接対策まで、すべてをシームレスに。
                </Text>
                <HStack spacing={4}>
                  <Button
                    as={Link}
                    to="/login"
                    size="lg"
                    colorScheme="blue"
                    px={8}
                    rightIcon={<FaArrowRight />}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    無料で始める
                  </Button>
                  <Button
                    as={Link}
                    to="/about"
                    size="lg"
                    variant="outline"
                    colorScheme="blue"
                    _hover={{
                      bg: 'blue.50',
                      transform: 'translateY(-2px)',
                    }}
                    px={8}
                  >
                    詳しく見る
                  </Button>
                </HStack>
              </VStack>
            </GridItem>
            <GridItem display={{ base: 'none', lg: 'block' }}>
              <Image
                src="/images/hero-image.svg"
                alt="JobMate Hero Image"
                maxW="500px"
                mx="auto"
                filter="drop-shadow(0 0 10px rgba(0,0,0,0.1))"
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box bg="white" py={12}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {stats.map((stat, index) => (
              <VStack key={index} spacing={2}>
                <Heading size="2xl" color="blue.500">
                  {stat.value}
                </Heading>
                <Text fontSize="lg" color={statsTextColor}>
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box bg="blue.50" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center" size="xl" color="gray.800">
              主な機能
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {features.map((feature, index) => (
                <Box
                  key={index}
                  p={8}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="lg"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: 'xl',
                    bg: cardHoverBg,
                  }}
                >
                  <VStack spacing={4} align="start">
                    <Icon as={feature.icon} w={10} h={10} color="blue.500" />
                    <Heading size="md" color="gray.800">{feature.title}</Heading>
                    <Text color={featureTextColor}>
                      {feature.description}
                    </Text>
                    <VStack align="start" spacing={2} w="100%">
                      {feature.benefits.map((benefit, idx) => (
                        <HStack key={idx} spacing={2}>
                          <Icon as={FaCheckCircle} color="blue.500" />
                          <Text fontSize="sm" color="gray.600">{benefit}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      {/* User Testimonials Section */}
      <Box bg="blue.50" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center" size="xl" color="gray.800">
              ユーザーの声
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box 
                p={6} 
                borderRadius="lg" 
                boxShadow="lg" 
                bg="white" 
                display="flex" 
                flexDirection="column" 
                alignItems="center"
              >
                <Image src="/images/sky.jpg" alt="User 1" borderRadius="full" boxSize="80px" mb={4} />
                <Text fontSize="lg" color="gray.600" textAlign="center" fontStyle="italic">
                  "JobMateを使って就活がスムーズになりました！機能が豊富で、特にES管理が便利です。"
                </Text>
                <Text fontWeight="bold" color="blue.500" mt={2}>- 山田太郎</Text>
              </Box>
              <Box 
                p={6} 
                borderRadius="lg" 
                boxShadow="lg" 
                bg="white" 
                display="flex" 
                flexDirection="column" 
                alignItems="center"
              >
                <Image src="/images/sky.jpg" alt="User 2" borderRadius="full" boxSize="80px" mb={4} />
                <Text fontSize="lg" color="gray.600" textAlign="center" fontStyle="italic">
                  "面接の準備が楽になり、自信を持って挑めるようになりました。"
                </Text>
                <Text fontWeight="bold" color="blue.500" mt={2}>- 佐藤花子</Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      {/* Benefits Section */}
      <Box bg="white" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center" size="xl" color="gray.800">
              なぜJobMateを選ぶのか
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {benefits.map((benefit, index) => (
                <HStack key={index} spacing={4} p={4} bg="blue.50" borderRadius="lg" boxShadow="md" transition="all 0.3s" _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}>
                  <Icon as={FaCheckCircle} color="blue.500" />
                  <Text fontSize="lg" color="gray.800">{benefit}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="blue.500" color="white" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="xl">
              さっそく始めましょう
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              無料で始められるJobMateで、あなたの就活をサポートします。
            </Text>
            <Button
              as={Link}
              to="/register"
              size="lg"
              colorScheme="whiteAlpha"
              px={8}
              rightIcon={<FaArrowRight />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                bg: 'whiteAlpha.300',
              }}
            >
              無料で始める
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;