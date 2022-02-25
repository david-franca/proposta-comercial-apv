import { IoCard, IoHammer, IoHome, IoStatsChart } from "react-icons/io5";

import { chakra, Flex, Icon, Spinner } from "@chakra-ui/react";

import { Routes } from "../@types/interfaces";

const Card = chakra(IoCard);
const Home = chakra(IoHome);
const StatsChart = chakra(IoStatsChart);

const dashRoutes: Routes[] = [
  {
    name: "Dashboard",
    icon: <Icon as={Home} />,
    component: "dashboard",
  },
  {
    name: "Indicações",
    icon: <Icon as={StatsChart} />,
    component: "tables",
  },
  {
    name: "Financeiro",
    icon: <Icon as={Card} />,
    component: "billing",
  },
  {
    name: "Atendimento",
    icon: <Icon as={IoHammer} />,
    component: "handling",
  },
];
export default dashRoutes;
