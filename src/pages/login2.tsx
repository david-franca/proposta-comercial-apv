import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Footer from "../components/Footer/Footer";
import theme from "../theme/theme";

const Login2 = () => {
  const titleColor = useColorModeValue("red.400", "red.300");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Box w="100%">
        <Flex position="relative" mb="40px">
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
              justifyContent="start"
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
                <Heading color={titleColor} fontSize="32px" mb="10px">
                  Bem vindo(a)
                </Heading>
                <Text mb="36px" ms="4px" color={textColor} fontWeight="bold" fontSize="14px">
                  Coloque seu email e senha para entrar
                </Text>
                <FormControl>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Email
                  </FormLabel>
                  <Input
                    borderRadius="15px"
                    mb="24px"
                    fontSize="sm"
                    type="text"
                    placeholder="Seu endereço de email"
                    size="lg"
                  />
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Senha
                  </FormLabel>
                  <Input
                    borderRadius="15px"
                    mb="36px"
                    fontSize="sm"
                    type="password"
                    placeholder="Sua senha"
                    size="lg"
                  />
                  {/* <FormControl display="flex" alignItems="center">
                    <Switch id="remember-login" colorScheme="red" me="10px" />
                    <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal">
                      Remember me
                    </FormLabel>
                  </FormControl> */}
                  <Button
                    fontSize="15px"
                    type="submit"
                    bg="red.400"
                    w="100%"
                    h="45"
                    mb="20px"
                    color="white"
                    mt="20px"
                    borderRadius="15px"
                    _hover={{
                      bg: "red.300",
                    }}
                    _active={{
                      bg: "red.500",
                    }}
                  >
                    ENTRAR
                  </Button>
                </FormControl>
                {/* <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  maxW="100%"
                  mt="0px"
                >
                  <Text color={textColor} fontWeight="medium">
                    Don&apos;t have an account?
                    <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                      Sign Up
                    </Link>
                  </Text>
                </Flex> */}
              </Flex>
            </Flex>
            <Box
              display={{ base: "none", md: "block" }}
              overflowX="hidden"
              h="100%"
              w="40vw"
              position="absolute"
              right="0px"
            >
              <Box
                bgImage="/images/bg2.svg"
                w="100%"
                h="100%"
                bgSize="cover"
                bgPosition="50%"
                position="absolute"
                borderBottomLeftRadius="20px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box margin="70px">
                  <Image src="/images/logo3.png" alt="logo" />
                </Box>
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Box px="24px" mx="auto" width="1044px" maxW="100%">
          <Footer />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Login2;
