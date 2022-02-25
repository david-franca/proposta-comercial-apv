import Container from "../../components/Container/Container";
import BillingView from "../../views/Billing";

const Billing = () => {
  return (
    <Container name="Financeiro" select="billing">
      <BillingView />
    </Container>
  );
};

export default Billing;
