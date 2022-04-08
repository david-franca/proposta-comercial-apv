import { IconType } from "react-icons";

import { Flex, Icon, Progress, Text, useColorModeValue } from "@chakra-ui/react";

import IconBox from "../../../components/Icons/IconBox";

interface ChartStatisticsProps {
  title: string;
  amount: string;
  icon: IconType;
  percentage: number;
}

const ChartStatistics = ({ title, amount, icon, percentage }: ChartStatisticsProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex direction="column">
      <Flex alignItems="center">
        <IconBox h={"30px"} w={"30px"} bg={"teal.300"} me="6px">
          <Icon as={icon} h={"15px"} w={"15px"} color={"white"} />
        </IconBox>
        <Text fontSize="sm" color="gray.400" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
        {amount}
      </Text>
      <Progress colorScheme="teal" borderRadius="12px" h="5px" value={percentage} />
    </Flex>
  );
};

export default ChartStatistics;
