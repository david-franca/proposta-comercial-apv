import { useRouter } from "next/router";
import { useEffect } from "react";

import { Flex, Text } from "@chakra-ui/react";

import { withPublic } from "../hooks/route";

const NextUi = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  });

  return (
    <Flex>
      <Text>Olá</Text>
    </Flex>
  );
};

export default withPublic(NextUi);
