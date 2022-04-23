import NextLink from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

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

import { Routes } from "../../@types/interfaces";
import { IconBox } from "../Icons/IconBox";
import { Separator } from "../Separator";

interface SidebarProps {
  routes: Array<Routes>;
  selected: string;
  logoText: string;
}

export const SidebarResponsive = ({ selected, routes, logoText }: SidebarProps) => {
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
          <NextLink passHref href={`/master/${route.component}`} key={index}>
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
                <IconBox bg="teal.300" color="white" h="30px" w="30px" me="12px">
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
        <NextLink passHref href={`/master/${route.component}`} key={index}>
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
              <IconBox bg={inactiveBg} color="teal.300" h="30px" w="30px" me="12px">
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
        alignItems="center"
        fontSize="11px"
        flexDir="column"
      >
        <Image alt="Logo" src="/images/logo-name.png" h="70px" me="10px" />
        <Text fontSize="sm" mt="3px" paddingTop={"15px"}>
          {logoText}
        </Text>
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
