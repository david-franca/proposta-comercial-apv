import React, { useEffect, useState } from "react";
import { FaCheck, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Document, useCollection, useDocument } from "swr-firestore-v9";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { StatusPayment, Withdrawals } from "../../@types/interfaces";
import useAuth from "../../hooks/useAuth";
import { currencyBRL } from "../../utils";

interface BillingRowProps {
  name: string;
  createdAt: string;
  email: string;
  value: string;
  status: StatusPayment;
  uid: string;
}

const BillingRow = ({ name, createdAt, email, value, status, uid }: BillingRowProps) => {
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { update, data } = useDocument<Withdrawals>(`/Withdrawals/${uid}`);
  const { add } = useCollection("/Transactions");
  const [withdrawals, setWithdrawals] = useState<Document<Withdrawals>>(
    {} as Document<Withdrawals>
  );
  const auth = useAuth();

  useEffect(() => {
    if (data) {
      setWithdrawals(data);
    }
  }, [data]);

  return (
    <AccordionItem p="14px" bg={bgColor} my="12px" borderRadius="12px" borderWidth={3}>
      <AccordionButton display="flex" w="100%" _focus={{}} borderRadius={"12px"}>
        <Flex direction="column" textAlign="left" w={"100%"}>
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {name}
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Chave PIX:{" "}
            <Text as="span" color="gray.500">
              {email}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Valor:{" "}
            <Text as="span" color="gray.500">
              {currencyBRL(value)}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Data de Criação:{" "}
            <Text as="span" color="gray.500">
              {createdAt}
            </Text>
          </Text>
        </Flex>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Flex direction={{ sm: "column", md: "row" }} justifyContent="space-evenly" w={"100%"}>
          <Button p="0px" bg="transparent" mb={{ sm: "10px", md: "0px" }} mr={{ md: "12px" }}>
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} mr="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                Excluir
              </Text>
            </Flex>
          </Button>
          <Button
            p="0px"
            bg="transparent"
            onClick={() => {
              update({ status: "Complete" });
              add({
                to: uid,
                approvedBy: auth.user?.uid,
                createdAt: new Date(),
                amount: withdrawals.request,
                type: "out",
              });
            }}
          >
            <Flex color={"green.500"} cursor="pointer" align="center" p="12px">
              <Icon as={FaCheck} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                Concluir
              </Text>
            </Flex>
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default BillingRow;
