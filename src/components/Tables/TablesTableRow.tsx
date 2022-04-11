import axios from "axios";
import moment from "moment";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

import { Avatar, Button, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";

import { Proposal } from "../../@types/interfaces";
import { Document } from "../../lib";

interface TablesRowProps {
  row: Document<Proposal>;
  onClick: (id: string) => void;
}

export const TablesTableRow = ({ row, onClick }: TablesRowProps) => {
  const { fullName, cellPhone, photoURL, createdAt, expiresIn, id } = row;
  const textColor = useColorModeValue("gray.700", "white");
  const [sourceImage, setSourceImage] = useState("");
  // let bgStatus = useColorModeValue("gray.400", "#1a202c");

  const formatCellPhone = (value: string) => {
    const head = value.substring(0, 2);
    const number = value.substring(2, 7) + "-" + value.substring(7);

    return `(${head}) ${number}`;
  };

  const random = () => {
    return Math.floor(Math.random() * 999);
  };

  useEffect(() => {
    if (photoURL) {
      axios
        .get(photoURL)
        .then(() => {
          setSourceImage(photoURL);
        })
        .catch(() => {
          setSourceImage(`https://picsum.photos/id/${random()}/1400`);
        });
    }
  }, [photoURL]);

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
          <Avatar src={sourceImage} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {fullName}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formatCellPhone(cellPhone)}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {moment(createdAt).calendar()}
        </Text>
      </Td>
      <Td>
        <NextLink passHref href={`handling/${id}`}>
          <Button p="0px" bg="transparent" variant="no-hover">
            <Text fontSize="md" color="gray.400" fontWeight="bold" cursor="pointer">
              Editar
            </Text>
          </Button>
        </NextLink>
      </Td>
    </Tr>
  );
};
