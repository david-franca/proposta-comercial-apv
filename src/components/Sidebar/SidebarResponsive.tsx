import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Routes } from "../../@types/interfaces";
import { routes as rotas } from "../../utils/routes";
import { IconBox } from "../Icons/IconBox";
import { Separator } from "../Separator";

interface SidebarProps {
  selected: string;
  logoText: string;
}

export const SidebarResponsive = ({ selected, logoText }: SidebarProps) => {
  const router = useRouter();

  let variantChange = "0.2s linear";

  const switchPage = (page: string) => {
    router.push(`${page}`);
  };

  const useCreateLinks = (routes: any[]) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const sidebarActiveShadow = "none";

    return (
      <Accordion defaultIndex={[0]} allowMultiple>
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
                  <NextLink
                    passHref
                    href={`/${rota.label.toLowerCase()}/${view.component}`}
                    key={index}
                  >
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

  const links = <>{useCreateLinks(rotas)}</>;

  const mainText = useColorModeValue("gray.700", "gray.200");
  let hamburgerColor = useColorModeValue("gray.500", "gray.200");
  const logoName = useColorModeValue("/images/full-logo1.png", "/images/logo-name.png");

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
        <Image alt="Logo" src={logoName} h="70px" me="10px" />
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
