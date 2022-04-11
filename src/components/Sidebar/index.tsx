import React, { useRef } from "react";

import { Box, useColorModeValue } from "@chakra-ui/react";

import { SidebarContent } from "./SidebarContent";

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

  let variantChange = "0.2s linear";

  const mainText = useColorModeValue("gray.700", "gray.200");

  const sidebarBg = useColorModeValue("white", "gray.700");
  const sidebarRadius = "16px";
  const sidebarMargins = "16px 0px 16px 16px";

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
          <SidebarContent
            routes={routes}
            selected={selected}
            variantChange={variantChange}
            logoText="Truck Level"
          />
        </Box>
      </Box>
    </Box>
  );
};
