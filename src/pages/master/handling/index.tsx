import { DefaultAuthProps } from "../../../@types/interfaces";
import { Container } from "../../../components";
import { withProtected } from "../../../hooks/route";
import HandlingView from "../../../views/Handling";

const Handling = ({ auth }: DefaultAuthProps) => {
  return (
    <Container name="Atendimento" select="handling">
      <HandlingView auth={auth} />
    </Container>
  );
};

export default withProtected(Handling);
