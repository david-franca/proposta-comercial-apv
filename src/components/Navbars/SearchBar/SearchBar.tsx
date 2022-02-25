import React from "react";

import { IoSearch } from "react-icons/io5";

import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";

interface SearchBarProps {
  variant?: string;
}

export function SearchBar(props: SearchBarProps) {
  // Pass the computed styles into the `__css` prop

  // Chakra Color Mode
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "gray.800");
  return (
    <InputGroup
      bg={inputBg}
      borderRadius="15px"
      w="200px"
      _focus={{
        borderColor: { mainTeal },
      }}
      _active={{
        borderColor: { mainTeal },
      }}
    >
      <InputLeftElement>
        <IconButton
          bg="inherit"
          aria-label="search-icon"
          borderRadius="inherit"
          _active={{
            bg: "inherit",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
          icon={<Icon as={IoSearch} color={searchIconColor} w="15px" h="15px" />}
        />
      </InputLeftElement>
      <Input fontSize="xs" py="11px" placeholder="Digite aqui..." borderRadius="inherit" />
    </InputGroup>
  );
}
