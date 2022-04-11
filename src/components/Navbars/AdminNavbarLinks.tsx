import { useEffect, useState } from "react";
import { IoMoon, IoSearch, IoSettings, IoSunny } from "react-icons/io5";

// Chakra Imports
import {
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { Routes } from "../../@types/interfaces";
import dashRoutes from "../../utils/routes";
import { SidebarResponsive } from "../Sidebar/SidebarResponsive";

interface HeaderLinksProp {
  fixed: boolean;
  secondary: boolean;
  onOpen: () => void;
  logoText: string;
  selected: string;
}

export const HeaderLinks = (props: HeaderLinksProp) => {
  const { fixed, secondary, onOpen, logoText, selected, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [routeActive, setRouteActive] = useState<Routes>();

  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }

  /*   useEffect(() => {
    if (routeActive) {
      selected(routeActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeActive]); */

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement>
          <IconButton
            aria-label="Search Icon"
            bg="inherit"
            borderRadius="inherit"
            _active={{
              bg: "inherit",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={<Icon as={IoSearch} color={searchIcon} w="15px" h="15px" />}
          />
        </InputLeftElement>
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Digite aqui..."
          borderRadius="inherit"
        />
      </InputGroup>
      {/* <Link href="/login">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<Icon as={IoPerson} color={navbarIcon} w="22px" h="22px" me="0px" />}
        >
          <Text display={{ sm: "none", md: "flex" }}>Sign In</Text>
        </Button>
      </Link> */}
      <SidebarResponsive routes={dashRoutes} selected={selected} {...rest} logoText="Truck Level" />
      <Icon
        as={IoSettings}
        id="settings"
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      <Icon
        as={colorMode === "dark" ? IoSunny : IoMoon}
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={toggleColorMode}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      {/* <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu> */}
    </Flex>
  );
};
