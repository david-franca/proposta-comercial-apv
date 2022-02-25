import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IconBoxProps extends FlexProps {
  children: ReactNode;
}

export default function IconBox(props: IconBoxProps) {
  const { children, ...rest } = props;

  return (
    <Flex alignItems={"center"} justifyContent={"center"} borderRadius={"12px"} {...rest}>
      {children}
    </Flex>
  );
}
