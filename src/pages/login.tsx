import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FaFacebook, FaGlobe, FaInstagram } from "react-icons/fa";

import {
  Box,
  chakra,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Head } from "../components/Head";
import { auth, firebase } from "../firebase/clientApp";

const CFaGlobe = chakra(FaGlobe);
const CFaInstagram = chakra(FaInstagram);
const CFaFacebook = chakra(FaFacebook);

// Configure FirebaseUI.
const uiConfig: firebaseui.auth.Config = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/master",
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const Login = () => {
  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]}
      gap={3}
      backgroundImage="url('/images/bg.png')"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Head title="Login" />
      <GridItem
        w="100%"
        h="100vh"
        backgroundImage="url('/images/truck.png')"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="right"
        display={["none", "none", "grid"]}
      />
      <GridItem w="100%" h="100vh">
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
            <Image
              src="/images/logo2.png"
              alt="Logo APV Truck"
              objectFit="contain"
              boxSize="300px"
            />
            <Box minW={{ base: "90%", md: "468px" }}>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </Box>
          </Stack>
          <Box
            as="footer"
            role="contentinfo"
            mx="auto"
            maxW="7xl"
            py="12"
            px={{ base: "4", md: "8" }}
          >
            <Box
              gap={2}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              <Link
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={1}
                href="https://www.apvtruck.com.br"
              >
                <CFaGlobe />
                www.apvtruck.com.br
              </Link>
              <Text>/</Text>
              <Text>@apvtruck</Text>
              <Icon as={CFaInstagram} />
              <Icon as={CFaFacebook} />
            </Box>
          </Box>
        </Flex>
      </GridItem>

      <GridItem
        w="100%"
        h="100vh"
        backgroundImage="url('/images/tank.png')"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="left"
        display={["none", "none", "grid"]}
      />
    </Grid>
  );
};

export default Login;
