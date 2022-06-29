import { Container } from "../components";
import { Inventory } from "../views/Inventory";

const InventoryPage = () => {
  return (
    <Container name="Estoque" select="inventory">
      <Inventory />
    </Container>
  );
};

export default InventoryPage;
