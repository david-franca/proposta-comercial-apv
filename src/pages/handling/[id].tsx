import { useRouter } from "next/router";

import { DefaultAuthProps } from "../../@types/interfaces";
import { Container } from "../../components";
import { withProtected } from "../../hooks/route";
import HandlingView from "../../views/Handling";

const Handling = ({ auth }: DefaultAuthProps) => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <Container name="Atendimento" select="handling">
      <HandlingView id={id} auth={auth} />
    </Container>
  );
};

export default withProtected(Handling);
