import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
import { createRef, LegacyRef } from "react";

interface MainPanelProps extends BoxProps {
  variant?: string;
}

const MainPanel = (props: MainPanelProps): JSX.Element => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default MainPanel;
