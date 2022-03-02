import {
  IoCart,
  IoDocument,
  IoGlobe,
  IoRocket,
  IoShieldCheckmark,
  IoStatsChart,
  IoTimer,
  IoTrophy,
  IoWallet,
  IoWarning,
} from "react-icons/io5";

import {
  Box,
  Flex,
  Grid,
  Icon,
  Progress,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody";
import IconBox from "../components/Icons/IconBox";
import { useEffect, useRef, useState } from "react";
import BarChart from "../components/Charts/BarChart";
import CardHeader from "../components/Card/CardHeader";
import LineChart from "../components/Charts/LineChart";
import { Propostas } from "../firebase";

const Dashboard = () => {
  const iconTeal = useColorModeValue("red.500", "red.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const [waiting, setWaiting] = useState(0);
  const [approved, setApproved] = useState(0);
  const [initiated, setInitiated] = useState(0);
  const [expired, setExpired] = useState(0);

  const overlayRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const cardsData = [
    {
      label: "Aguardando",
      value: waiting,
      stats: "+55%",
      icon: IoTimer,
    },
    {
      label: "Iniciados",
      value: initiated,
      stats: "0%",
      icon: IoShieldCheckmark,
    },
    {
      label: "Expirados",
      value: expired,
      stats: "0%",
      icon: IoWarning,
    },
    {
      label: "Aprovados",
      value: approved,
      stats: "0%",
      icon: IoTrophy,
    },
  ];

  useEffect(() => {
    Propostas()
      .where("status", "==", "Aguardando")
      .then((prop) => {
        setWaiting(prop.size);
      });
  }, []);

  useEffect(() => {
    Propostas()
      .where("status", "==", "Iniciado")
      .then((prop) => {
        setInitiated(prop.size);
      });
  }, []);

  useEffect(() => {
    Propostas()
      .where("status", "==", "Expirado")
      .then((prop) => {
        setExpired(prop.size);
      });
  }, []);

  useEffect(() => {
    Propostas()
      .where("status", "==", "Aprovado")
      .then((prop) => {
        setApproved(prop.size);
      });
  }, []);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        {cardsData.map((card, index) => (
          <Card key={index} minH="83px">
            <CardBody>
              <Flex flexDirection="row" align="center" justify="center" w="100%">
                <Stat me="auto">
                  <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                    {card.label}
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      {card.value}
                    </StatNumber>
                    <StatHelpText
                      alignSelf="flex-end"
                      justifySelf="flex-end"
                      m="0px"
                      color={card.stats[0] !== "-" ? "green.400" : "red.500"}
                      fontWeight="bold"
                      ps="10px"
                      fontSize="md"
                    >
                      {card.stats}
                    </StatHelpText>
                  </Flex>
                </Stat>
                <IconBox h={"45px"} w={"45px"} bg={iconTeal}>
                  <Icon as={card.icon} h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      {/* <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <Card minHeight="290.5px" p="1.2rem">
          <CardBody w="100%">
            <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%">
              <Flex flexDirection="column" h="100%" lineHeight="1.6" width={{ lg: "45%" }}>
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  Built by developers
                </Text>
                <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
                  Purity UI Dashboard
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  From colors, cards, typography to complex elements, you will find the full
                  documentation.
                </Text>
                <Spacer />
                <Flex align="center">
                  <Button
                    p="0px"
                    variant="no-hover"
                    bg="transparent"
                    my={{ sm: "1.5rem", lg: "0px" }}
                  >
                    <Text
                      fontSize="sm"
                      color={textColor}
                      fontWeight="bold"
                      cursor="pointer"
                      transition="all .5s ease"
                      my={{ sm: "1.5rem", lg: "0px" }}
                      _hover={{ me: "4px" }}
                    >
                      Read more
                    </Text>
                    <Icon
                      as={IoArrowForward}
                      w="20px"
                      h="20px"
                      fontSize="2xl"
                      transition="all .5s ease"
                      mx=".3rem"
                      cursor="pointer"
                      pt="4px"
                      _hover={{ transform: "translateX(20%)" }}
                    />
                  </Button>
                </Flex>
              </Flex>
              <Spacer />
              <Flex
                bg="red.300"
                align="center"
                justify="center"
                borderRadius="15px"
                width={{ lg: "40%" }}
                minHeight={{ sm: "250px" }}
              >
                <Image
                  src="images/logo-white.svg"
                  alt="chakra image"
                  minWidth={{ md: "300px", lg: "auto" }}
                />
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card maxHeight="290.5px" p="1rem">
          <CardBody
            p="0px"
            backgroundImage="images/people-image.png"
            bgPosition="center"
            bgRepeat="no-repeat"
            w="100%"
            h={{ sm: "200px", lg: "100%" }}
            bgSize="cover"
            position="relative"
            borderRadius="15px"
          >
            <Box
              bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
              w="100%"
              position="absolute"
              h="inherit"
              borderRadius="inherit"
              ref={overlayRef}
            ></Box>
            <Portal containerRef={overlayRef}>
              <Flex
                flexDirection="column"
                color="white"
                p="1.5rem 1.2rem 0.3rem 1.2rem"
                lineHeight="1.6"
              >
                <Text fontSize="xl" fontWeight="bold" pb=".3rem">
                  Work with the rockets
                </Text>
                <Text fontSize="sm" fontWeight="normal" w={{ lg: "92%" }}>
                  Wealth creation is a revolutionary recent positive-sum game. It is all about who
                  takes the opportunity first.
                </Text>
                <Spacer />
                <Flex align="center" mt={{ sm: "20px", lg: "40px", xl: "90px" }}>
                  <Button p="0px" variant="no-hover" bg="transparent" mt="12px">
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      _hover={{ me: "4px" }}
                      transition="all .5s ease"
                    >
                      Read more
                    </Text>
                    <Icon
                      as={IoArrowForward}
                      w="20px"
                      h="20px"
                      fontSize="xl"
                      transition="all .5s ease"
                      mx=".3rem"
                      cursor="pointer"
                      _hover={{ transform: "translateX(20%)" }}
                      pt="4px"
                    />
                  </Button>
                </Flex>
              </Flex>
            </Portal>
          </CardBody>
        </Card>
      </Grid> */}
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        my="26px"
        gap="24px"
        mb={{ lg: "26px" }}
      >
        <Card p="16px">
          <CardBody>
            <Flex direction="column" w="100%">
              <BarChart />
              <Flex direction="column" mt="24px" mb="36px" alignSelf="flex-start">
                <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                  Usuários Ativos
                </Text>
                <Text fontSize="md" fontWeight="medium" color="gray.400">
                  <Text as="span" color="green.400" fontWeight="bold">
                    (+23%)
                  </Text>{" "}
                  do que a semana passada
                </Text>
              </Flex>
              <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox h={"30px"} w={"30px"} bg={iconTeal} me="6px">
                      <Icon as={IoWallet} h={"15px"} w={"15px"} color={iconBoxInside} />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Users
                    </Text>
                  </Flex>
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
                    32,984
                  </Text>
                  <Progress colorScheme="red" borderRadius="12px" h="5px" value={20} />
                </Flex>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox h={"30px"} w={"30px"} bg={iconTeal} me="6px">
                      <Icon as={IoRocket} h={"15px"} w={"15px"} color={iconBoxInside} />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Clicks
                    </Text>
                  </Flex>
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
                    2.42m
                  </Text>
                  <Progress colorScheme="red" borderRadius="12px" h="5px" value={90} />
                </Flex>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox h={"30px"} w={"30px"} bg={iconTeal} me="6px">
                      <Icon as={IoCart} h={"15px"} w={"15px"} color={iconBoxInside} />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Sales
                    </Text>
                  </Flex>
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
                    2,400$
                  </Text>
                  <Progress colorScheme="red" borderRadius="12px" h="5px" value={30} />
                </Flex>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox h={"30px"} w={"30px"} bg={iconTeal} me="6px">
                      <Icon as={IoStatsChart} h={"15px"} w={"15px"} color={iconBoxInside} />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Items
                    </Text>
                  </Flex>
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
                    320
                  </Text>
                  <Progress colorScheme="red" borderRadius="12px" h="5px" value={50} />
                </Flex>
              </SimpleGrid>
            </Flex>
          </CardBody>
        </Card>
        <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
          <CardHeader mb="20px" pl="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                Taxa de Aprovação
              </Text>
              <Text fontSize="md" fontWeight="medium" color="gray.400">
                <Text as="span" color="green.400" fontWeight="bold">
                  (+5%) a mais
                </Text>{" "}
                em 2022
              </Text>
            </Flex>
          </CardHeader>
          <Box w="100%" h={{ sm: "300px" }} ps="8px">
            <LineChart />
          </Box>
        </Card>
      </Grid>
    </Flex>
  );
};

export default Dashboard;
