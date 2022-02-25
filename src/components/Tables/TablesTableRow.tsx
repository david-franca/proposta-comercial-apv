import { Timestamp } from "firebase/firestore";
import moment from "moment";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

interface Row {
  fullName: string;
  cellPhone: string;
  status: "Iniciado" | "Aprovado" | "Cancelado" | "Expirado" | "Aguardando";
  photoURL: string;
  createdAt: Timestamp;
  expiresIn: Timestamp;
  id: string;
}

interface TablesRowProps {
  row: Row;
  onClick: (id: string) => void;
}

function TablesTableRow({ row, onClick }: TablesRowProps) {
  const { fullName, status, cellPhone, photoURL, createdAt, expiresIn, id } = row;
  const { colorMode } = useColorMode();
  const [bgStatus, setBgStatus] = useState("");
  const textColor = useColorModeValue("gray.700", "white");
  const [statusType, setStatusType] = useState("");
  // let bgStatus = useColorModeValue("gray.400", "#1a202c");

  const formatCellPhone = (value: string) => {
    const head = value.substring(2, 4);
    const number = value.substring(4);

    return `(${head}) 9${number}`;
  };

  useEffect(() => {
    switch (status) {
      case "Aguardando":
        colorMode === "light" ? setBgStatus("#33B5E5") : setBgStatus("#0099CC");
        break;
      case "Aprovado":
        colorMode === "light" ? setBgStatus("#00C851") : setBgStatus("#007E33");
        break;
      case "Cancelado":
        colorMode === "light" ? setBgStatus("#FF4444") : setBgStatus("#CC0000");
        break;
      case "Expirado":
        colorMode === "light" ? setBgStatus("#FFBB33") : setBgStatus("#FF8800");
        break;
      case "Iniciado":
        colorMode === "light" ? setBgStatus("#9545D8") : setBgStatus("#511F7A");
        break;
    }
  }, [colorMode, status]);

  /*   useEffect(() => {
    const diff = moment(expiresIn.toMillis()).diff(moment(), "seconds");

    setStatusType(status);

    if (diff <= 0) {
      setStatusType("Expirado");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresIn]); */

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={photoURL} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {fullName}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={bgStatus}
          color="white"
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
          width="100%"
          textAlign="center"
        >
          {status}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formatCellPhone(cellPhone)}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {moment(createdAt.toDate()).calendar()}
        </Text>
      </Td>
      <Td>
        <NextLink href={`handling/${id}`}>
          <Button p="0px" bg="transparent" variant="no-hover">
            <Text fontSize="md" color="gray.400" fontWeight="bold" cursor="pointer">
              Editar
            </Text>
          </Button>
        </NextLink>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
