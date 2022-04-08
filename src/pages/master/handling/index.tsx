import Container from "../../../components/Container/Container";
import { withProtected } from "../../../hooks/route";
import HandlingView from "../../../views/Handling";

const Handling = () => {
  return (
    <Container name="Atendimento" select="handling">
      <HandlingView />
    </Container>
  );
};

export default withProtected(Handling);
