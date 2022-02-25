import React from "react";

import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-evenly"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {new Date().getFullYear()},{" "}
        <Link color="red.400" href="https://www.apvtruck.com.br" target="_blank">
          {"APV Truck "}
        </Link>
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="https://www.apvtruck.com.br">
            {"Site"}
          </Link>
        </ListItem>
        <ListItem>
          <Link color="gray.400" href="https://www.apvtruck.com.br/license">
            {"License"}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
