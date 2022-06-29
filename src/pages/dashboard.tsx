import { DefaultAuthProps } from "../@types/interfaces";
import { Container } from "../components";
import { withProtected } from "../hooks/route";
import DashboardView from "../views/Dashboard";

const Dashboard = ({ auth }: DefaultAuthProps) => {
  return (
    <Container name="Dashboard" select="dashboard">
      <DashboardView auth={auth} />
    </Container>
  );
};

export default withProtected(Dashboard);
