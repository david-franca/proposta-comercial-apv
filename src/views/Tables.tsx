import { useEffect, useMemo, useState } from "react";
import { Document, useCollection } from "../lib";

import {
  Flex,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import { Proposal } from "../@types/interfaces";
import { Card, CardBody, TablesTableRow } from "../components";

const Tables = () => {
  const [tablesData, setTablesData] = useState<Document<Proposal>[]>([]);
  const [idRow, setIdRow] = useState("");
  const textColor = useColorModeValue("gray.700", "white");
  const { data } = useCollection<Proposal>("Propostas", {
    where: ["code", "!=", ""],
    listen: true,
    parseDates: ["createdAt", "updatedAt", "expiresIn"],
  });

  const panels = useMemo(() => ["Iniciado", "Aguardando", "Aprovado", "Cancelado", "Expirado"], []);
  const captions = useMemo(() => ["Nome", "Telefone", "Data", ""], []);

  const onClick = (id: string) => {
    setIdRow(id);
  };

  useEffect(() => {
    if (data) {
      setTablesData(data);
    }
  }, [data]);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} isLoaded={!!data}>
        {/* <Text fontSize="xl" color={textColor} fontWeight="bold">
            Indicações
          </Text> */}
        <Tabs isFitted variant="line" width="100%">
          <TabList>
            {panels.map((title, key) => (
              <Tab key={key}>{title}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {panels.map((title, index) => (
              <TabPanel key={index}>
                <CardBody>
                  <Table variant="simple" color={textColor}>
                    <Thead>
                      <Tr my=".8rem" pl="0px" color="gray.400">
                        {captions.map((caption, idx) => {
                          return (
                            <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : undefined}>
                              {caption}
                            </Th>
                          );
                        })}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tablesData.map((doc, index) =>
                        doc.status === title ? (
                          <TablesTableRow key={index} row={doc} onClick={onClick} />
                        ) : (
                          <></>
                        )
                      )}
                    </Tbody>
                  </Table>
                </CardBody>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Card>
    </Flex>
  );
};

export default Tables;
