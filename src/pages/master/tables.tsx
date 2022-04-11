import { Container } from "../../components";
import { withProtected } from "../../hooks/route";
import TablesView from "../../views/Tables";

const Tables = () => {
  return (
    <Container name="Indicações" select="tables">
      <TablesView />
    </Container>
  );
};

export default withProtected(Tables);
