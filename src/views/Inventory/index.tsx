import { Flex, TableContainer, Table, Thead, Tr, Th } from "@chakra-ui/react";
import React from "react";
import { Card, CardBody } from "../../components";

export const Inventory = () => {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardBody height="100%" flexDirection="column">
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
        </CardBody>
      </Card>
    </Flex>
  );
};
