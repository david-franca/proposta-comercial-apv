import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { RefObject, useRef, useState } from "react";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";
import { Equipments } from "../../../models/Atendimentos/Equipments.model";

Yup.setLocale(ptForm);

const initialValues: Equipments = {
  number: 0,
  model: "BT",
  active: true,
  createdAt: new Date(),
  deleted: false,
  history: [],
  isInstalled: false,
  status: "Estoque",
  updatedAt: new Date(),
  observations: "",
};

interface CreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  handleCreateEquipment: (data: Equipments) => Promise<void>;
}

export const CreateDrawer = ({ isOpen, onClose, handleCreateEquipment }: CreateDrawerProps) => {
  const btnRef = useRef() as RefObject<HTMLButtonElement>;
  const [loading, setLoading] = useState(false);

  const formSchema = Yup.object().shape({
    number: Yup.number().required(),
    model: Yup.string().required(),
    observations: Yup.string().optional(),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await handleCreateEquipment({
          ...values,
          number: Number(values.number),
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <Drawer
      id="create-equipment"
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Adicionar Equipamento</DrawerHeader>

        <DrawerBody>
          <form noValidate>
            <FormControl
              mb="24px"
              isRequired
              isInvalid={formik.touched.number && Boolean(formik.errors.number)}
            >
              <FormLabel htmlFor="number">Número do Equipamento</FormLabel>
              <Input
                id="number"
                fontSize="sm"
                ms="4px"
                size="lg"
                borderRadius="15px"
                type="number"
                value={formik.values.number}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl
              mb="24px"
              isRequired
              isInvalid={formik.touched.number && Boolean(formik.errors.number)}
            >
              <FormLabel htmlFor="model">Modelo</FormLabel>
              <Select
                id="model"
                onChange={formik.handleChange}
                value={formik.values.model}
                fontSize="sm"
                borderRadius="15px"
                ms="4px"
                size="lg"
              >
                <option value="">Selecione</option>
                <option value="BT">Bluetooth</option>
                <option value="TC">Plus</option>
                <option value="S">Simples</option>
                <option value="MEC">Mecânico</option>
                <option value="SAT">Satelital</option>
              </Select>
            </FormControl>
            <FormControl
              mb="24px"
              isInvalid={formik.touched.observations && Boolean(formik.errors.observations)}
            >
              <FormLabel htmlFor="observations">Observações</FormLabel>

              <Textarea
                id="observations"
                fontSize="sm"
                ms="4px"
                size="lg"
                borderRadius="15px"
                value={formik.values.observations}
                onChange={formik.handleChange}
              />
            </FormControl>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={() => {
              formik.resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              formik.submitForm().then(() => {
                formik.resetForm();
                onClose();
              });
            }}
            isLoading={loading}
            loadingText="Aguarde..."
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
