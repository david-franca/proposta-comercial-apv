import Container from "../../../components/Container/Container";
import HandlingView from "../../../views/Handling";

const Handling = () => {
  return (
    <Container name="Atendimento" select="handling">
      <HandlingView />
    </Container>
  );
};

export default Handling;
