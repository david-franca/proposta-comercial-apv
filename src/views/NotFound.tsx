import { useRouter } from "next/router";

import { Box, Button, Center, ChakraProvider, Flex, Heading, Image, Text } from "@chakra-ui/react";

import theme from "../theme/theme";

export default function NotFound() {
  const router = useRouter();

  const redirect = () => {
    router.replace("/login");
  };

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Box w="100%" textAlign="center">
        <Flex position="relative">
          <Flex
            h={{ sm: "initial", md: "75vh", lg: "85vh" }}
            w="100%"
            maxW="1044px"
            mx="auto"
            justifyContent="space-between"
            mb="30px"
            pt={{ sm: "100px", md: "0px" }}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              style={{ userSelect: "none" }}
              w={{ base: "100%", md: "50%", lg: "42%" }}
            >
              <Flex
                direction="column"
                w="100%"
                background="transparent"
                p="48px"
                mt={{ md: "150px", lg: "80px" }}
              >
                <Heading
                  display="inline-block"
                  as="h2"
                  size="2xl"
                  bgGradient="linear(to-r, teal.400, teal.600)"
                  backgroundClip="text"
                >
                  404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                  Página Não Encontrada
                </Text>
                <Text color={"gray.500"} mb={6}>
                  A página que você está procurando parece que não existe.
                </Text>
                <Button
                  colorScheme="teal"
                  bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                  color="white"
                  variant="solid"
                  onClick={redirect}
                >
                  Início
                </Button>
              </Flex>
            </Flex>
            <Box
              display={{ base: "none", md: "block" }}
              overflowX="hidden"
              h="100vh"
              w="40vw"
              position="absolute"
              right="0px"
            >
              <Box
                bgImage="/images/bg3.jpg"
                w="100%"
                h="100%"
                bgSize="cover"
                bgPosition="50%"
                position="absolute"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box margin="70px">
                  <Image src="/images/logo.png" alt="logo" />
                </Box>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
