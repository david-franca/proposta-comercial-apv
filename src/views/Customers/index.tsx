import currency from "currency.js";
import moment from "moment";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  IoAdd,
  IoArrowDown,
  IoArrowUp,
  IoChevronDown,
  IoChevronUp,
  IoCreate,
  IoEllipse,
  IoEllipsisVertical,
  IoMenu,
  IoStar,
  IoSwapVertical,
  IoTrash,
} from "react-icons/io5";
import { Column, Row, useExpanded, usePagination, useSortBy, useTable } from "react-table";

import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { Card, CardBody } from "../../components";
import { Document, useCollection } from "../../lib";
import { CustomersModel, VehiclesModels } from "../../models";

const Customers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: customersColl } = useCollection<CustomersModel>("Customers", {
    listen: true,
    parseDates: ["createdAt", "updatedAt"],
  });

  const { data: vehiclesColl } = useCollection<VehiclesModels>("Vehicles", {
    listen: true,
    parseDates: ["createdAt", "updatedAt", "expiresIn"],
  });

  const [customers, setCustomers] = useState<Document<CustomersModel>[]>([]);
  const [vehicles, setVehicles] = useState<Document<VehiclesModels>[]>([]);
  const [modalName, setModalName] = useState("");

  const columns = useMemo<Column<Document<CustomersModel>>[]>(
    () => [
      { Header: "Nome", accessor: "fullName" },
      { Header: "Telefone", accessor: "cellPhone" },
      { Header: "Email", accessor: "email" },
      {
        // Build our expander column
        id: "expander", // Make sure it has an ID
        Header: () => null,
        Cell: ({ row }) => {
          return (
            <Box {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? <Icon as={IoChevronUp} /> : <Icon as={IoChevronDown} />}
            </Box>
          );
        },
      },
    ],
    []
  );

  const renderRowSubComponent = (row: Row<Document<CustomersModel>>) => {
    return (
      <Box backgroundColor="gray.600" borderRadius="10px" py="5px">
        <SimpleGrid
          columns={6}
          spacing={5}
          whiteSpace="nowrap"
          pl="15px"
          alignItems="center"
          fontWeight="bold"
        >
          <Flex>
            <Text>Placa</Text>
          </Flex>
          <Flex>
            <Text>Valor</Text>
          </Flex>
          <Flex>
            <Text>Modelo</Text>
          </Flex>
          <Flex>
            <Text>Cotas</Text>
          </Flex>
          <Flex>
            <Text>Data de Expiração</Text>
          </Flex>
          <Center>
            <Tooltip label="Adicionar Veículo" hasArrow>
              <IconButton aria-label="add-vehicles" icon={<IoAdd />} />
            </Tooltip>
          </Center>
        </SimpleGrid>
        {vehicles.map((vehicle, index) => {
          if (row.original.id === vehicle.customerId) {
            return (
              <Box>
                <SimpleGrid
                  key={index}
                  columns={6}
                  spacing={5}
                  whiteSpace="nowrap"
                  pl="15px"
                  paddingY="5px"
                  alignItems="center"
                >
                  <Text key={index} overflow="hidden" textOverflow="ellipsis">
                    {vehicle.licensePlate}
                  </Text>
                  <Text key={index} overflow="hidden" textOverflow="ellipsis">
                    {currency(vehicle.protected, {
                      symbol: "R$",
                      separator: ".",
                      decimal: ",",
                    }).format()}
                  </Text>
                  <Text key={index} overflow="hidden" textOverflow="ellipsis">
                    {vehicle.model}
                  </Text>
                  <Text key={index} overflow="hidden" textOverflow="ellipsis">
                    {vehicle.cotas}
                  </Text>
                  <Tooltip hasArrow label={moment(vehicle.expiresIn).calendar()}>
                    <Text key={index} overflow="hidden" textOverflow="ellipsis">
                      {moment(vehicle.expiresIn).calendar()}
                    </Text>
                  </Tooltip>
                  <Center>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<IoEllipsisVertical />}
                        variant="outline"
                      />
                      <MenuList>
                        <MenuItem icon={<IoCreate />} onClick={() => setModalName("edit")}>
                          Editar
                        </MenuItem>
                        <MenuItem icon={<IoStar />} onClick={() => setModalName("status")}>
                          Alterar Status
                        </MenuItem>
                        <MenuItem
                          icon={<IoTrash />}
                          onClick={() => setModalName("remove")}
                          color="red.500"
                        >
                          Apagar
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Center>
                </SimpleGrid>
              </Box>
            );
          }
          return null;
        })}
      </Box>
    );
    // return <Text>Customers</Text>;
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    visibleColumns,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: customers,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    if (customersColl) {
      setCustomers(customersColl);
    }
  }, [customersColl]);

  useEffect(() => {
    if (vehiclesColl) {
      setVehicles(vehiclesColl);
    }
  }, [vehiclesColl]);

  useEffect(() => {
    switch (modalName) {
      case "edit":
        alert("edit");
        break;
      case "status":
        alert("status");
        break;
      case "remove":
        alert("remove");
        break;
      default:
        setModalName("");
        break;
    }
  }, [modalName]);
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardBody>
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <Th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <Icon as={IoArrowDown} marginLeft="10px" />
                          ) : (
                            <Icon as={IoArrowUp} marginLeft="10px" />
                          )
                        ) : (
                          <Icon as={IoSwapVertical} marginLeft="10px" />
                        )}
                      </span>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <Fragment key={index}>
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <Td {...cell.getCellProps()} key={index}>
                            {cell.render("Cell")}
                          </Td>
                        );
                      })}
                    </Tr>
                    {!row.isExpanded ? (
                      <Tr>
                        <Td colSpan={visibleColumns.length}>{renderRowSubComponent(row)}</Td>
                      </Tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
        <HStack spacing="24px" paddingTop="24px">
          <Flex>
            <IconButton
              variant="ghost"
              icon={<ArrowLeftIcon />}
              aria-label="arrow-left-icon"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <IconButton
              variant="ghost"
              icon={<ChevronLeftIcon />}
              aria-label="chevron-left-icon"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <IconButton
              variant="ghost"
              icon={<ChevronRightIcon />}
              aria-label="chevron-right-icon"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            <IconButton
              variant="ghost"
              icon={<ArrowRightIcon />}
              aria-label="arrow-right-icon"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />
          </Flex>
          <HStack>
            <Text>Página</Text>
            <Text fontWeight="bold">
              {pageIndex + 1} de {pageOptions.length}
            </Text>{" "}
          </HStack>
          <HStack>
            <Text>Vá para a pagina:</Text>
            <Input
              type="number"
              w="auto"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
            />
          </HStack>
          <HStack>
            <Text>Mostrando:</Text>
            <Select
              value={pageSize}
              w="auto"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
          </HStack>
        </HStack>
      </Card>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
      </Modal>
    </Flex>
  );
};

export default Customers;
