import { IoFileTray } from "react-icons/io5";

import { Center, Icon, Text } from "@chakra-ui/react";

const Empty = () => {
  return (
    <Center flexDir="column" w="100%" h="100%" color="gray.500">
      <Text>Sem dados a serem exibidos</Text>
      <Icon as={IoFileTray} boxSize={"16"} h="100%" w={"20px"} />
    </Center>
  );
};

export default Empty;
