import {
  Button,
  Center,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";

import { CardBody } from "../../../components";
import { Document, useDocument } from "../../../lib";
import { Equipments } from "../../../models/Atendimentos/Equipments.model";

interface DeleteModelProps {
  equipmentId: string;
  onClose: () => void;
}

export const DeleteModel = ({ equipmentId, onClose }: DeleteModelProps) => {
  const [equipment, setEquipment] = useState<Document<Equipments>>({} as Document<Equipments>);
  const [loading, setLoading] = useState(false);

  const { data: equipmentDoc, deleteDocument } = useDocument<Equipments>(
    equipmentId ? `/Equipments/${equipmentId}` : null
  );

  const deleteEquipment = async () => {
    setLoading(true);
    try {
      await deleteDocument();
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (equipmentDoc) {
      setEquipment(equipmentDoc);
    }
  }, [equipmentDoc]);

  return (
    <ModalContent>
      <ModalHeader>Atenção</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CardBody px="5px" flexDir="column">
          <Center flexDir="column">
            <Icon as={IoWarning} w="150px" h="150px" textColor="red.400" />
            <Text mb="12px" textAlign="center">
              Tem certeza que quer apagar o equipamento <b>&quot;{equipment.number}&quot;</b>?
            </Text>
            <Text mb="12px" textAlign="center" color="red.400" fontWeight="bold">
              Essa ação não pode ser desfeita!
            </Text>
          </Center>
        </CardBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => deleteEquipment()}
            colorScheme="red"
            isLoading={loading}
            loadingText="Deletando..."
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalBody>
    </ModalContent>
  );
};
