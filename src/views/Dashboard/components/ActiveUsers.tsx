import { IoFileTray } from "react-icons/io5";

import { Center, Icon, Text, useColorModeValue } from "@chakra-ui/react";

import { Card, CardBody } from "../../../components";

interface ActiveUsersProps {
  title: string;
  percentage: number;
  isLoaded: boolean;
  users: number;
}

const ActiveUsers = ({ title, percentage, isLoaded, users }: ActiveUsersProps) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="16px" isLoaded={isLoaded}>
      <CardBody h="100%">
        <Center flexDir="column" w="100%" h="100%">
          <Text>Sem dados a serem exibidos</Text>
          <Icon as={IoFileTray} boxSize={"16"} h="100%" w={"20px"} />
          {/* <BarChart />
          <Flex direction="column" mt="24px" mb="36px" alignSelf="flex-start">
            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
              {title}
            </Text>
            <Text fontSize="md" fontWeight="medium" color="gray.400">
              <Text as="span" color="green.400" fontWeight="bold">
                {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
              </Text>{" "}
              do que a semana passada
            </Text>
          </Flex>
          <SimpleGrid gap={{ sm: "12px" }} columns={4}>
            <ChartStatistics title="Users" amount={`${users}`} icon={IoWallet} percentage={20} />
            <ChartStatistics title="Clicks" amount={"2.42m"} icon={IoRocket} percentage={90} />
            <ChartStatistics title="Sales" amount={"2,400$"} icon={IoCart} percentage={30} />
            <ChartStatistics title="Items" amount={"320"} icon={IoStatsChart} percentage={50} />
          </SimpleGrid> */}
        </Center>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
