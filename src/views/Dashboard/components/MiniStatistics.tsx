import { IconType } from "react-icons";
import { string } from "yup/lib/locale";

import {
  Flex,
  Icon,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

import { Card, CardBody, IconBox } from "../../../components";

interface MiniStatisticsProps {
  title: string;
  amount: number;
  percentage: string;
  icon: IconType;
  isLoaded: boolean;
}

const MiniStatistics = ({ title, amount, percentage, icon, isLoaded }: MiniStatisticsProps) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Card minH="83px" isLoaded={isLoaded}>
      <CardBody>
        <Flex flexDirection="row" align="center" justify="center" w="100%">
          <Stat me="auto">
            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg" color={textColor}>
                {amount}
              </StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                m="0px"
                color={percentage[0] !== "-" ? "green.400" : "red.500"}
                fontWeight="bold"
                ps="10px"
                fontSize="md"
              >
                {percentage}
              </StatHelpText>
            </Flex>
          </Stat>
          <IconBox h={"45px"} w={"45px"} bg={iconTeal}>
            <Icon as={icon} h={"24px"} w={"24px"} color={iconBoxInside} />
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatistics;
