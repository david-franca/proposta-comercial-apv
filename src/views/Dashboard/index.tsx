import { useCallback, useEffect, useMemo, useState } from "react";
import { IoShieldCheckmark, IoTimer, IoTrophy, IoWarning } from "react-icons/io5";
import { Document, useCollection } from "../../lib";

import { Flex, Grid, SimpleGrid } from "@chakra-ui/react";

import { AppContextInterface } from "../../@types/interfaces";
import ActiveUsers from "./components/ActiveUsers";
import MiniStatistics from "./components/MiniStatistics";
import PassRate from "./components/PassRate";

interface DashboardProps {
  auth: AppContextInterface;
}

const Dashboard = ({ auth }: DashboardProps) => {
  const [waiting, setWaiting] = useState(0);
  const [approved, setApproved] = useState(0);
  const [initiated, setInitiated] = useState(0);
  const [expired, setExpired] = useState(0);
  const [usersSize, setUsersSize] = useState(0);
  const [proposalSize, setProposalSize] = useState(0);
  const [usersArray, setUsersArray] = useState<Document[]>([]);

  const { data: proposal } = useCollection("Propostas", {
    orderBy: "createdAt",
    listen: true,
    parseDates: ["createdAt"],
  });
  const { data: users } = useCollection("Users", {
    listen: true,
    parseDates: ["createdAt"],
  });

  const percentage = useCallback(
    (size: number) => {
      const percent = (size * 100) / proposalSize;
      return Number.isNaN(percent) ? "0" : `${percent.toFixed(2)}%`;
    },
    [proposalSize]
  );

  const cardsData = useMemo(
    () => [
      {
        label: "Aguardando",
        value: waiting,
        stats: percentage(waiting),
        icon: IoTimer,
      },
      {
        label: "Iniciados",
        value: initiated,
        stats: percentage(initiated),
        icon: IoShieldCheckmark,
      },
      {
        label: "Expirados",
        value: expired,
        stats: percentage(expired),
        icon: IoWarning,
      },
      {
        label: "Aprovados",
        value: approved,
        stats: percentage(approved),
        icon: IoTrophy,
      },
    ],
    [approved, expired, initiated, percentage, waiting]
  );

  useEffect(() => {
    let aguarde = 0;
    let inicio = 0;
    let expira = 0;
    let aprova = 0;

    if (proposal) {
      proposal.forEach((doc) => {
        switch (doc.status) {
          case "Aguardando":
            aguarde++;
            setWaiting(aguarde);
            break;
          case "Aprovado":
            aprova++;
            setApproved(aprova);
            break;
          case "Expirado":
            expira++;
            setExpired(expira);
            break;
          case "Iniciado":
            inicio++;
            setInitiated(inicio);
            break;
          default:
            break;
        }
      });
      setProposalSize(proposal.length);
    }
  }, [proposal]);

  useEffect(() => {
    if (users) {
      setUsersArray(users);
      setUsersSize(users.length);
    }
  }, [users]);
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        {cardsData.map((card, index) => (
          <MiniStatistics
            key={index}
            icon={card.icon}
            title={card.label}
            percentage={card.stats}
            amount={card.value}
            isLoaded={!!proposal}
          />
        ))}
      </SimpleGrid>

      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        my="26px"
        gap="24px"
        mb={{ lg: "26px" }}
      >
        <ActiveUsers title="Usu??rios Ativos" percentage={15} isLoaded={!!users} users={usersSize} />
        <PassRate title="Taxa de Cadastros" percentage={25} isLoaded={!!users} users={usersArray} />
      </Grid>
    </Flex>
  );
};

export default Dashboard;
