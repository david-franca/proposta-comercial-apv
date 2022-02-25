import { Flex } from "@chakra-ui/react";
import Lottie from "react-lottie";

import waiting from "../animations/waiting.json";

export const Waiting = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Lottie options={{ loop: true, autoplay: true, animationData: waiting }} />
    </Flex>
  );
};
