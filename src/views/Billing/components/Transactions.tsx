import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaRegCalendarAlt } from "react-icons/fa";
import { IoFileTray } from "react-icons/io5";
import { Document, useCollection } from "../../../lib";

// Chakra imports
import { Center, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

import { Transaction, Withdrawals } from "../../../@types/interfaces";
// Custom components
import { Card, CardBody, CardHeader, Empty, TransactionRow } from "../../../components";

interface TransactionsProps {
  title: string;
  date: string;
  transactions: Document<Withdrawals>[];
}

const Transactions = ({ title, date }: TransactionsProps) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const [transactions, setTransactions] = useState<Document<Transaction>[]>([]);

  const { data } = useCollection<Transaction>("/Transactions", {
    listen: true,
    parseDates: ["createdAt"],
  });

  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data]);

  return (
    <Card my="24px" ml={{ lg: "24px" }}>
      <CardHeader mb="12px">
        <Flex direction="column" w="100%">
          <Flex
            direction={{ sm: "column", lg: "row" }}
            justify={{ sm: "center", lg: "space-between" }}
            align={{ sm: "center" }}
            w="100%"
            my={{ md: "12px" }}
          >
            <Text color={textColor} fontSize={{ sm: "lg", md: "xl", lg: "lg" }} fontWeight="bold">
              {title}
            </Text>
            <Flex align="center">
              <Icon as={FaRegCalendarAlt} color="gray.400" fontSize="md" me="6px"></Icon>
              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                {date}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody h="100%">
        <Flex direction="column" w="100%">
          {transactions.length < 0 ? (
            transactions.map((row, index) => {
              return (
                <TransactionRow
                  key={index}
                  name={row.to}
                  logo={row.type === "out" ? FaArrowDown : FaArrowUp}
                  date={row.createdAt}
                  price={row.amount}
                />
              );
            })
          ) : (
            <Empty />
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Transactions;
