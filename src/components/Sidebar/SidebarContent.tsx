import NextLink from "next/link";
import { useRouter } from "next/router";

import { Box, Button, Flex, Image, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";

import { Routes } from "../../@types/interfaces";
import { IconBox } from "../Icons/IconBox";
import { Separator } from "../Separator";

interface SidebarContendProps {
  routes: Routes[];
  selected: string;
  variantChange: string;
  logoText: string;
}

export const SidebarContent = ({
  routes,
  selected,
  variantChange,
  logoText,
}: SidebarContendProps) => {
  const router = useRouter();
  const logoName = useColorModeValue("/images/full-logo1.png", "/images/logo-name.png");
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
          <NextLink passHref href={`/master/${route.component}`} key={index}>
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
                  bg="teal.300"
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
        <NextLink passHref href={`/master/${route.component}`} key={index}>
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
                color="teal.300"
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

  return (
    <>
      <Box pt="25px" mb="12px">
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
          <Image alt="Logo" src={logoName} h="70px" />
          <Text fontSize="sm" mt="3px" paddingTop={"15px"}>
            {logoText}
          </Text>
        </Link>
        <Separator />
      </Box>
      <Stack direction="column" mb="40px">
        <Box>{links}</Box>
      </Stack>
    </>
  );
};
