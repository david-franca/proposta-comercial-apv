import {
  Flex,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

import { Card, CardBody } from "../../components";

export const Staff = () => {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardBody height="100%" flexDirection="column">
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Escritórios</Tab>
              <Tab>Técnicos</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer overflowY="auto">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Estado</Th>
                      </Tr>
                    </Thead>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer overflowY="auto">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Estado</Th>
                      </Tr>
                    </Thead>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Flex>
  );
};
