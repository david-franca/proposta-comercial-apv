import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { Routes } from "../../@types/interfaces";
import { routes as rotas } from "../../utils/routes";
import { IconBox } from "../Icons/IconBox";
import { Separator } from "../Separator";

interface SidebarContendProps {
  selected: string;
  variantChange: string;
  logoText: string;
}

export const SidebarContent = ({ selected, variantChange, logoText }: SidebarContendProps) => {
  const router = useRouter();
  const logoName = useColorModeValue("/images/full-logo1.png", "/images/logo-name.png");
  const switchPage = (page: string) => {
    router.push(`${page}`);
  };

  const useCreateLinks = () => {
    // Chakra Color Mode
    const activeBg = "transparent";
    const inactiveBg = useColorModeValue("gray.100", "gray.600");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    const sidebarActiveShadow = "none";
    return (
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        {rotas.map((rota, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex={1} textAlign="left">
                  {rota.label}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {rota.views.map((view) => {
                const isSelected = view.component === selected;
                return (
                  <NextLink passHref href={`/${view.component}`} key={index}>
                    <Button
                      onClick={() => switchPage(view.component)}
                      boxSize="initial"
                      justifyContent="flex-start"
                      alignItems="center"
                      bg={isSelected ? activeBg : "transparent"}
                      boxShadow={isSelected ? sidebarActiveShadow : ""}
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
                        boxShadow: isSelected ? "0px 7px 11px rgba(0, 0, 0, 0.04)" : "none",
                      }}
                    >
                      <Flex>
                        <IconBox
                          bg={isSelected ? "teal.300" : inactiveBg}
                          color={isSelected ? "white" : "teal.300"}
                          h="30px"
                          w="30px"
                          me="12px"
                          transition={variantChange}
                        >
                          {view.icon}
                        </IconBox>
                        <Text
                          color={isSelected ? activeColor : inactiveColor}
                          my="auto"
                          fontSize="sm"
                        >
                          {view.name}
                        </Text>
                      </Flex>
                    </Button>
                  </NextLink>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const links = <>{useCreateLinks()}</>;

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
