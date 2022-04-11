import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

interface PanelContentProps extends BoxProps {
  variant?: string;
}

export const PanelContent = (props: PanelContentProps) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PanelContent", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};
