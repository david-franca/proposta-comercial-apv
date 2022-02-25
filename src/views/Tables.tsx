import {
  Accordion,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody";
import CardHeader from "../components/Card/CardHeader";
import TablesTableRow from "../components/Tables/TablesTableRow";
import { db } from "../firebase";

const Tables = () => {
  const [tablesData, setTablesData] = useState<any[]>([]);
  const [idRow, setIdRow] = useState("");

  const onClick = (id: string) => {
    setIdRow(id);
  };

  useEffect(() => {
    db.collection("Propostas")
      .where("code", "!=", "")
      .onSnapshot((snapshot) => {
        const table: any[] = [];
        snapshot.forEach((doc) => {
          if (doc.data()) {
            const resultDoc = {
              id: doc.id,
              ...doc.data(),
            };
            table.push(resultDoc);
          }
        });
        setTablesData(table);
      });
  }, []);

  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Indicações
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                  Nome
                </Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Telefone</Th>
                <Th color="gray.400">Data</Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              {tablesData.map((row, index) => {
                return <TablesTableRow key={index} row={row} onClick={onClick} />;
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Tables;
