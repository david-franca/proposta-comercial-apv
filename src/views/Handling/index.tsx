import { useState } from "react";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

import { Accordion, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { AssociateValues, DefaultAuthProps, FIPE, VehicleValues } from "../../@types/interfaces";
import { useCollection, useDocument } from "../../lib";
import { CustomersModel, VehiclesModels } from "../../models";
import { Associate } from "./components/Associate";
import { Summary } from "./components/Summary";
import { Vehicle } from "./components/Vehicle";

Yup.setLocale(ptForm);

type HandlingProps = DefaultAuthProps & {
  id?: string;
};

const Handling = ({ id, auth }: HandlingProps) => {
  const textColor = useColorModeValue("gray.700", "white");

  const { data: customerDoc, update: updateCustomer } = useDocument<CustomersModel>(
    id ? `Customers/${id}` : null,
    {
      parseDates: ["createdAt", "updatedAt", "expiresIn"],
    }
  );
  const { data: vehicleDoc, update: updateVehicle } = useDocument<VehiclesModels>(
    id ? `Vehicles/${id}` : null,
    {
      parseDates: ["createdAt", "updatedAt", "expiresIn"],
    }
  );
  const { add: addCustomer } = useCollection<CustomersModel>("Customers", {
    parseDates: ["createdAt", "updatedAt", "expiresIn"],
  });
  const { add: addVehicle } = useCollection<VehiclesModels>("Vehicles", {
    parseDates: ["createdAt", "updatedAt"],
  });

  const [index, setIndex] = useState<number | undefined>(0);
  const [person, setPerson] = useState({} as AssociateValues);
  const [vehicle, setVehicle] = useState({} as VehicleValues);
  const [fipe, setFipe] = useState({} as FIPE);

  const handleIndexAccordionItem = (indexItem: number) => {
    setIndex(indexItem);
  };

  const handlePerson = (person: AssociateValues) => {
    setPerson(person);
  };

  const handleVehicle = (vehicle: VehicleValues) => {
    setVehicle(vehicle);
  };

  const handleFipe = (fipe: FIPE) => {
    setFipe(fipe);
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Text fontSize="xl" color={textColor} fontWeight="bold" textAlign="center" mb="22px">
        Proposta Comercial
      </Text>

      <Accordion paddingBottom={8} index={index}>
        <Associate handleIndex={handleIndexAccordionItem} handlePerson={handlePerson} />

        <Vehicle
          handleIndex={handleIndexAccordionItem}
          handleVehicle={handleVehicle}
          handleFipe={handleFipe}
        />

        <Summary
          handleIndex={handleIndexAccordionItem}
          vehicle={vehicle}
          person={person}
          fipe={fipe}
        />
      </Accordion>
    </Flex>
  );
};

export default Handling;
