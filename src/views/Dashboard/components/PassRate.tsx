import { useEffect, useState } from "react";
import { Document } from "swr-firestore-v9";

import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { Users } from "../../../@types/interfaces";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import LineChart from "../../../components/Charts/LineChart";
import { userByWeek } from "../../../utils/random";

interface PassRateProps {
  title: string;
  percentage: number;
  isLoaded: boolean;
  users: Document<Users>[];
}
const PassRate = ({ title, isLoaded, users }: PassRateProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const [percentage, setPercentage] = useState(0);

  const getPercentageChange = (oldNumber: number, newNumber: number) => {
    const decreaseValue = newNumber - oldNumber;

    return (decreaseValue / oldNumber) * 100;
  };

  useEffect(() => {
    const result = userByWeek(users);
    const percent = getPercentageChange(result.userLastWeek, result.userThisWeek);
    setPercentage(parseFloat(percent.toFixed(2)));
  }, [users]);

  return (
    <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }} isLoaded={isLoaded}>
      <CardHeader mb="20px" pl="22px">
        <Flex direction="column" alignSelf="flex-start">
          <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
            {title}
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.400">
            <Text as="span" color={percentage > 0 ? "green.400" : "red.400"} fontWeight="bold">
              {`${percentage}%`} {percentage > 0 ? "a mais" : "a menos"}
            </Text>{" "}
            que na semana passada
          </Text>
        </Flex>
      </CardHeader>
      <Box w="100%" h={{ sm: "300px" }} ps="8px">
        <LineChart users={users} />
      </Box>
    </Card>
  );
};

export default PassRate;
