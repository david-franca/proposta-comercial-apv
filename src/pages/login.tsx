import { AuthError } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

import {
  Box,
  Button,
  ChakraProvider,
  DarkMode,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useColorModeValue,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";

import { DefaultAuthProps } from "../@types/interfaces";
import Footer from "../components/Footer/Footer";
import { Head } from "../components/Head";
import { handleErrorFirebase } from "../firebase/errorHandling";
import { withPublic } from "../hooks/route";
import AuthService from "../service/auth.service";
import theme from "../theme/theme";

Yup.setLocale(ptForm);

const initialValues = {
  email: "",
  password: "",
};

const Login = ({ auth }: DefaultAuthProps) => {
  const titleColor = useColorModeValue("teal.500", "teal.300");
  const textColor = useColorModeValue("gray.500", "white");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { signInWithEmailAndPassword } = auth;
  const [toastMessage, setToastMessage] = useState<UseToastOptions>();

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(values.email, values.password);
        setLoading(false);
      } catch (error) {
        const e = error as AuthError;
        console.log(e);
        setToastMessage({
          status: "error",
          description: handleErrorFirebase(e),
          title: "Erro",
          isClosable: true,
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage]);

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <DarkMode>
        <Head title="Login" />
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
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl
                      isRequired
                      isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                      mb="24px"
                    >
                      <FormLabel htmlFor="email" ms="4px" fontSize="sm" fontWeight="normal">
                        Email
                      </FormLabel>
                      <Input
                        id="email"
                        borderRadius="15px"
                        fontSize="sm"
                        type="email"
                        placeholder="Seu endereço de email"
                        size="lg"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <FormErrorMessage ms="4px">
                        {formik.touched.email && formik.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                      mb="36px"
                    >
                      <FormLabel htmlFor="password" ms="4px" fontSize="sm" fontWeight="normal">
                        Senha
                      </FormLabel>
                      <Input
                        id="password"
                        borderRadius="15px"
                        fontSize="sm"
                        type="password"
                        placeholder="Sua senha"
                        size="lg"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <FormErrorMessage ms="4px">
                        {formik.touched.password && formik.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      fontSize="15px"
                      type="submit"
                      bg="teal.400"
                      w="100%"
                      h="45"
                      mb="20px"
                      color="white"
                      isLoading={loading}
                      mt="20px"
                      borderRadius="15px"
                      _hover={{
                        bg: "teal.300",
                      }}
                      _active={{
                        bg: "teal.500",
                      }}
                    >
                      ENTRAR
                    </Button>
                  </form>
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
                  bgImage="/images/bg6.jpg"
                  w="100%"
                  h="100%"
                  bgSize="cover"
                  bgPosition="100%"
                  position="absolute"
                  borderBottomLeftRadius="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box margin="70px">
                    <Image src="/images/full-logo.png" alt="logo" />
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Flex>
          <Box px="24px" mx="auto" width="1044px" maxW="100%">
            <Footer />
          </Box>
        </Box>
      </DarkMode>
    </ChakraProvider>
  );
};

export default withPublic(Login);
