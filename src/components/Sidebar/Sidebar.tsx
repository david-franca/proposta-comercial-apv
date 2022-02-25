import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import IconBox from "../Icons/IconBox";
import { Separator } from "../Separator/Separator";

interface Routes {
  category?: string;
  path?: string;
  state?: string;
  views?: Array<Routes>;
  name: string;
  icon?: JSX.Element;
  component: string;
  layout?: string;
}

interface SidebarProps {
  routes: Array<Routes>;
  selected: string;
}

export const Sidebar = ({ routes, selected }: SidebarProps) => {
  const mainPanel = useRef() as React.MutableRefObject<HTMLInputElement>;
  const router = useRouter();
  // const [routeSelected, setRouteSelected] = useState<Routes>(routes[0]);

  let variantChange = "0.2s linear";

  const swithPage = (page: string) => {
    router.push(`${page}`);
  };

  const useCreateLinks = (routes: Routes[]): JSX.Element[] => {
    // Chakra Color Mode
    const activeBg = "transparent";
    const inactiveBg = useColorModeValue("gray.100", "gray.600");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const sidebarActiveShadow = "none";

    return routes.map((route, index) => {
      if (route.component == selected) {
        return (
          <NextLink href={`/master/${route.component}`} key={index}>
            <Button
              key={index}
              onClick={() => swithPage(route.component)}
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              boxShadow={sidebarActiveShadow}
              bg={activeBg}
              transition={variantChange}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Flex>
                <IconBox
                  bg="red.500"
                  color="white"
                  h="30px"
                  w="30px"
                  me="12px"
                  transition={variantChange}
                >
                  {route.icon}
                </IconBox>
                <Text color={activeColor} my="auto" fontSize="sm">
                  {route.name}
                </Text>
              </Flex>
            </Button>
          </NextLink>
        );
      }
      return (
        <NextLink href={`/master/${route.component}`} key={index}>
          <Button
            key={index}
            onClick={() => swithPage(route.component)}
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bg="transparent"
            mb={{
              xl: "12px",
            }}
            mx={{
              xl: "auto",
            }}
            py="12px"
            ps={{
              sm: "10px",
              xl: "16px",
            }}
            borderRadius="15px"
            w="100%"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            <Flex>
              <IconBox
                bg={inactiveBg}
                color="red.300"
                h="30px"
                w="30px"
                me="12px"
                transition={variantChange}
              >
                {route.icon}
              </IconBox>
              <Text color={inactiveColor} my="auto" fontSize="sm">
                {route.name}
              </Text>
            </Flex>
          </Button>
        </NextLink>
      );
    });
  };

  const links = <>{useCreateLinks(routes)}</>;

  const mainText = useColorModeValue("gray.700", "gray.200");

  const sidebarBg = useColorModeValue("white", "gray.700");
  const sidebarRadius = "16px";
  const sidebarMargins = "16px 0px 16px 16px";

  const brand = (
    <Box pt="25px" mb="12px">
      <Link
        href="#"
        target="_blank"
        display="flex"
        lineHeight="100%"
        mb="30px"
        fontWeight="bold"
        justifyContent="center"
        alignContent="center"
        fontSize="11px"
      >
        <Image
          alt="Logo"
          src={useColorModeValue("/images/logo1.png", "/images/logo3.png")}
          h="70px"
          me="10px"
        />
      </Link>
      <Separator />
    </Box>
  );

  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <Box>{brand}</Box>
          <Stack direction="column" mb="40px">
            <Box>{links}</Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export const SidebarResponsive = ({ selected, routes }: SidebarProps) => {
  const router = useRouter();

  let variantChange = "0.2s linear";

  const swithPage = (page: string) => {
    router.push(`${page}`);
  };

  const useCreateLinks = (routes: Routes[]) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((route, index) => {
      if (route.component === selected) {
        // selected(route);
        return (
          <NextLink href={`/master/${route.component}`} key={index}>
            <Button
              onClick={() => swithPage(route.component)}
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                <IconBox bg="red.500" color="white" h="30px" w="30px" me="12px">
                  {route.icon}
                </IconBox>
                <Text color={activeColor} my="auto" fontSize="sm">
                  {route.name}
                </Text>
              </Flex>
            </Button>
          </NextLink>
        );
      }
      return (
        <NextLink href={`/master/${route.component}`} key={index}>
          <Button
            onClick={() => swithPage(route.component)}
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bg="transparent"
            mb={{
              xl: "12px",
            }}
            mx={{
              xl: "auto",
            }}
            py="12px"
            ps={{
              sm: "10px",
              xl: "16px",
            }}
            borderRadius="15px"
            w="100%"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            <Flex>
              <IconBox bg={inactiveBg} color="red.300" h="30px" w="30px" me="12px">
                {route.icon}
              </IconBox>
              <Text color={inactiveColor} my="auto" fontSize="sm">
                {route.name}
              </Text>
            </Flex>
          </Button>
        </NextLink>
      );
    });
  };

  const links = <>{useCreateLinks(routes)}</>;

  const mainText = useColorModeValue("gray.700", "gray.200");
  let hamburgerColor = useColorModeValue("gray.500", "gray.200");

  const brand = (
    <Box pt="35px" mb="8px">
      <Link
        href="#"
        target="_blank"
        display="flex"
        lineHeight="100%"
        mb="30px"
        fontWeight="bold"
        justifyContent="center"
        alignContent="center"
        fontSize="11px"
      >
        <Image
          alt="Logo"
          src={useColorModeValue("/images/logo.png", "/images/logo2.png")}
          h="70px"
          me="10px"
        />
      </Link>
      <Separator />
    </Box>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainPanel = useRef() as React.MutableRefObject<HTMLInputElement>;
  const btnRef = useRef() as React.MutableRefObject<SVGSVGElement>;

  return (
    <Flex display={{ sm: "flex", xl: "none" }} ref={mainPanel} alignItems="center">
      <HamburgerIcon color={hamburgerColor} w="18px" h="18px" ref={btnRef} onClick={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          w="250px"
          maxW="250px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
        >
          <DrawerCloseButton _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }} />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%">
              <Box>{brand}</Box>
              <Stack direction="column" mb="40px">
                <Box>{links}</Box>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
