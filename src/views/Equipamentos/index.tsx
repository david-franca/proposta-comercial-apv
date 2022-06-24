import { AddIcon, DeleteIcon, EditIcon, InfoIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  Flex,
  IconButton,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger as OrigPopoverTrigger,
  Stat,
  StatLabel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircle, IoFileTrayFull } from "react-icons/io5";

import { Card, CardBody } from "../../components";
import { Document, useCollection } from "../../lib";
import { Equipments } from "../../models/Atendimentos/Equipments.model";
import { Installation } from "../../models/Atendimentos/Installation.model";
import { CreateDrawer } from "./components/CreateDrawer";
import { DeleteModel } from "./components/DeleteModal";
import TablePagination from "./components/TablePagination";

const PopoverTrigger: FC<{ children: ReactNode }> = OrigPopoverTrigger;

const Equipamentos = () => {
  const { isOpen: historyIsOpen, onOpen: historyOpen, onClose: historyClose } = useDisclosure();
  const { isOpen: createIsOpen, onOpen: createOpen, onClose: createClose } = useDisclosure();
  const { isOpen: deleteIsOpen, onOpen: deleteOpen, onClose: deleteClose } = useDisclosure();

  const btnRef = useRef() as RefObject<HTMLButtonElement>;
  const [take, setTake] = useState(10);
  const [pagination, setPagination] = useState<Document<Equipments>[][]>([]);
  const [tableValues, setTableValues] = useState<Document<Equipments>[]>([]);
  const [indexPage, setIndexPage] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [equipmentId, setEquipmentId] = useState("");

  const { data: equipmentsData, add: addEquipment } = useCollection<Equipments>("Equipments", {
    parseDates: ["createdAt"],
    orderBy: ["updatedAt", "desc"],
    listen: true,
  });

  const handleCreateEquipment = async (data: Equipments) => {
    try {
      await addEquipment(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let i: Document<Equipments>[] = [];
    if (equipmentsData && equipmentsData.length > 0) {
      i = [...equipmentsData];
      const result = new Array(Math.ceil(i.length / take)).fill(i).map((_) => i.splice(0, take));
      setPagination(result);
      setTableValues(result[indexPage]);
    }
  }, [take, indexPage, equipmentsData]);

  const HistoryList = (history: Installation[]) => {
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

  const handleIndex = (value: number) => {
    setIndexPage(value);
  };

  const handleTake = (value: number) => {
    setTake(value);
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardBody height="100%" flexDirection="column">
          <TableContainer overflowY="auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Número</Th>
                  <Th>Modelo</Th>
                  <Th>Histórico</Th>
                  <Th>Informações</Th>
                  <Th>
                    <IconButton
                      aria-label="add-equipment"
                      icon={<AddIcon />}
                      ref={btnRef}
                      onClick={createOpen}
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {tableValues.map((equipamento) => (
                  <Tr key={equipamento.id}>
                    <Td>{equipamento.number}</Td>
                    <Td>{equipamento.model}</Td>
                    <Td>
                      <IconButton
                        variant="ghost"
                        isDisabled={equipamento.history.length === 0}
                        icon={<RepeatClockIcon />}
                        aria-label="history"
                        ref={btnRef}
                        colorScheme="teal"
                        onClick={() => {
                          historyOpen();
                          setHistory(equipamento.history);
                        }}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        variant="ghost"
                        colorScheme={equipamento.isInstalled ? "green" : "red"}
                        icon={equipamento.isInstalled ? <IoCheckmarkCircle /> : <IoCloseCircle />}
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
                        <IconButton colorScheme="blue" aria-label="edit" icon={<EditIcon />} />
                        <IconButton
                          colorScheme="yellow"
                          aria-label="edit"
                          icon={<IoFileTrayFull />}
                        />
                        <IconButton
                          colorScheme="red"
                          aria-label="delete"
                          icon={<DeleteIcon />}
                          onClick={() => {
                            setEquipmentId(equipamento.id);
                            deleteOpen();
                          }}
                        />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <TablePagination
            handleIndex={handleIndex}
            indexPage={indexPage}
            pagination={pagination.length}
            handleTake={handleTake}
            take={take}
          />
          <Modal id="history-equipment" isOpen={historyIsOpen} onClose={historyClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Histórico do Equipamento</ModalHeader>

              <ModalBody>
                <OrderedList>
                  {history.map((his, index) => (
                    <ListItem key={index}>
                      <Stat pb={5}>
                        <StatLabel>Data: {moment(his.date).calendar()}</StatLabel>
                        <StatLabel>Tipo: {his.type}</StatLabel>
                        <StatLabel>Titular: {his.bearer}</StatLabel>
                        <StatLabel>Escritório: {his.office}</StatLabel>
                      </Stat>
                    </ListItem>
                  ))}
                </OrderedList>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Modal closeOnOverlayClick={false} isOpen={deleteIsOpen} onClose={deleteClose}>
            <ModalOverlay />
            <DeleteModel onClose={deleteClose} equipmentId={equipmentId} />
          </Modal>
          <CreateDrawer
            isOpen={createIsOpen}
            onClose={createClose}
            handleCreateEquipment={handleCreateEquipment}
          />
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Equipamentos;
