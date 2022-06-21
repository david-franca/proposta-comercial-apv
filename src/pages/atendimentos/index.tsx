import { NextPage } from "next";
import { Container } from "../../components";
import Equipamentos from "../../views/Equipamentos";

const Estoque: NextPage = () => {
  return (
    <Container name="Equipamentos" select="estoque">
      <Equipamentos />
    </Container>
  );
};

export default Estoque;
