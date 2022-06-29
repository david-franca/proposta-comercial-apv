import { NextPage } from "next";
import { Container } from "../components";
import Equipamentos from "../views/Equipamentos";

const EquipamentosPage: NextPage = () => {
  return (
    <Container name="Equipamentos" select="equipamentos">
      <Equipamentos />
    </Container>
  );
};

export default EquipamentosPage;
