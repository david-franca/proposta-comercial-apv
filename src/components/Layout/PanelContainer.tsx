import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

interface PanelContainerProps extends BoxProps {
  variant?: string;
}

const PanelContainer = (props: PanelContainerProps) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PanelContainer", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default PanelContainer;
