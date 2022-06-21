import { DeleteIcon, EditIcon, InfoIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  Flex,
  IconButton,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger as OrigPopoverTrigger,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { FC, ReactNode } from "react";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoFileTrayFull,
  IoPencil,
  IoTrash,
} from "react-icons/io5";

import { Card, CardBody } from "../../components";
import { db } from "../../firebase/db";

const PopoverTrigger: FC<{ children: ReactNode }> = OrigPopoverTrigger;

const Equipamentos = () => {
  const HistoryList = (history: any[]) => {
    if (history.length > 0) {
      const lastHistoryAction = history[history.length - 1];
      return (
        <List>
          <ListItem>Tipo: {lastHistoryAction.type}</ListItem>
          <ListItem>Titular: {lastHistoryAction.bearer}</ListItem>
          <ListItem>Escritório: {lastHistoryAction.office}</ListItem>
          <ListItem>Data do Evento: {moment(new Date(lastHistoryAction.date)).calendar()}</ListItem>
        </List>
      );
    } else {
      return <Text>Sem Eventos</Text>;
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>Número</Th>
                <Th>Modelo</Th>
                <Th>Histórico</Th>
                <Th>Informações</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {db.map((equipamento) => (
                <Tr key={equipamento.id}>
                  <Td>{equipamento.number}</Td>
                  <Td>{equipamento.model}</Td>
                  <Td>
                    <IconButton variant="ghost" icon={<RepeatClockIcon />} aria-label="history" />
                  </Td>
                  <Td>
                    <IconButton
                      variant="ghost"
                      colorScheme={equipamento.installed ? "green" : "red"}
                      icon={equipamento.installed ? <IoCheckmarkCircle /> : <IoCloseCircle />}
                      aria-label="history"
                    />
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label="info" variant="ghost" icon={<InfoIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Informações do Último Evento</PopoverHeader>
                        <PopoverBody>{HistoryList(equipamento.history)}</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                  <Td>
                    <ButtonGroup size="sm" isAttached variant="solid">
                      <IconButton colorScheme="teal" aria-label="edit" icon={<EditIcon />} />
                      <IconButton colorScheme="red" aria-label="delete" icon={<DeleteIcon />} />
                      <IconButton colorScheme="green" aria-label="edit" icon={<IoFileTrayFull />} />
                    </ButtonGroup>
                  </Td>{" "}
                  #(v21JkmWfTK
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Equipamentos;
