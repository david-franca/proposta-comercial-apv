import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

interface CardHeaderProps extends BoxProps {
  variant?: string;
}

export const CardHeader = (props: CardHeaderProps) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardHeader", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};
