import { Container } from "../../components";
import { withProtected } from "../../hooks/route";
import CustomersView from "../../views/Customers";

const Customers = () => {
  return (
    <Container name="Indicações" select="tables">
      <CustomersView />
    </Container>
  );
};

export default withProtected(Customers);
