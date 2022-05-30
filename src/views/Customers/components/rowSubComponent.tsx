import currency from "currency.js";
import moment from "moment";
import { IoAdd, IoCreate, IoMenu, IoStar, IoTrash } from "react-icons/io5";

import {
  Box,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const SubComponent = () => {
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
      {/* {vehicles.map((vehicle, index) => {
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
                      icon={<IoMenu />}
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
      })} */}
    </Box>
  );
};

export default SubComponent;
