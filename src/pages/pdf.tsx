import dynamic from "next/dynamic";

import { Box, Flex, Text } from "@chakra-ui/react";

import { Head } from "../components/Head";

const PDFViewer = dynamic(() => import("../components/PDF"), {
  ssr: false,
});

// Create Document Component

export const PDF = () => {
  return (
    <Flex
      justifyContent="center"
      width="100%"
      height="100vh"
      alignItems="center"
      flexDirection="column"
    >
      <Head title="Download PDF" />
      <Flex paddingY={5} justifyContent="center" flexDirection="column" alignItems="center">
        <Text>Espere carregar os dados e então</Text>
        <Text>Clique no botão abaixo para fazer o download do documento!</Text>
      </Flex>
      <Box>
        <PDFViewer />
      </Box>
    </Flex>
  );
};

export default PDF;
