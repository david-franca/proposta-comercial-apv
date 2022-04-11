import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

interface CardBodyProps extends BoxProps {
  variant?: string;
}

export const CardBody = (props: CardBodyProps) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};
