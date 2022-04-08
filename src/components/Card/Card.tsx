import { Skeleton, SkeletonProps, useStyleConfig } from "@chakra-ui/react";

interface CardProps extends SkeletonProps {
  variant?: string;
}

function Card(props: CardProps) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Skeleton __css={styles} isLoaded={true} {...rest}>
      {children}
    </Skeleton>
  );
}

export default Card;
