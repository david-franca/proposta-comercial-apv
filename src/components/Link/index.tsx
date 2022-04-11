import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: any;
}

export const Link = ({ href, children }: LinkProps) => {
  return (
    <NextLink href={href} passHref>
      <a>{children}</a>
    </NextLink>
  );
};
