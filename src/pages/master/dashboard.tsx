import Container from "../../components/Container/Container";
import DashboardView from "../../views/Dashboard";

const Dashboard = () => {
  return (
    <Container name="Dashboard" select="dashboard">
      <DashboardView />
    </Container>
  );
};

export default Dashboard;
