import { chakra, Icon } from "@chakra-ui/react";
import {
  IoBarbell,
  IoBuild,
  IoBusiness,
  IoFileTrayStacked,
  IoHammer,
  IoIdCard,
  IoStatsChart,
} from "react-icons/io5";

const StatsChart = chakra(IoStatsChart);
const Hammer = chakra(IoHammer);
const Barbell = chakra(IoBarbell);
const Business = chakra(IoBusiness);
const Build = chakra(IoBuild);
const FileTrayStacked = chakra(IoFileTrayStacked);

interface Rotas {
  label: string;
  views: { name: string; icon: JSX.Element; component: string }[];
}

export const routes: Rotas[] = [
  {
    label: "Master",
    views: [
      {
        name: "Indicações",
        icon: <Icon as={StatsChart} />,
        component: "tables",
      },
      {
        name: "Atendimento",
        icon: <Icon as={Hammer} />,
        component: "handling",
      },
    ],
  },
  {
    label: "Suporte",
    views: [
      {
        name: "Equipamentos",
        component: "equipamentos",
        icon: <Icon as={Barbell} />,
      },
      {
        name: "Apoio",
        component: "staff",
        icon: <Icon as={Business} />,
      },
      {
        name: "Estoque",
        component: "inventory",
        icon: <Icon as={FileTrayStacked} />,
      },
    ],
  },
];
