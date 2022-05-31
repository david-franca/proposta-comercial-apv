import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";

import { FIPE, FipeApi, VehicleValues } from "../../../../@types/interfaces";
import { currencyToNumber, fipeAPI } from "../../../../utils";
import { MoneyInputField } from "../MoneyInputField";
import currency from "currency.js";
import { MaskedInputField } from "../MaskedInputField";

Yup.setLocale(ptForm);

interface VehicleProps {
  handleIndex: (index: number) => void;
  handleVehicle: (vehicle: VehicleValues) => void;
  handleFipe: (fipe: FIPE) => void;
}

const initialValues: VehicleValues = {
  brand: "",
  model: "",
  year: "",
  fipe: 0,
  bodywork: 0,
  licensePlate: "",
};

export const Vehicle = ({ handleIndex, handleVehicle, handleFipe }: VehicleProps) => {
  const [fetchedBrands, setFetchedBrands] = useState<FipeApi[]>([]);
  const [fetchedModels, setFetchedModels] = useState<FipeApi[]>([]);
  const [fetchedYears, setFetchedYears] = useState<FipeApi[]>([]);
  const [toastMessage, setToastMessage] = useState<UseToastOptions>();
  const toast = useToast();

  const formSchema = Yup.object().shape({
    brand: Yup.string().required(),
    model: Yup.string().required(),
    year: Yup.string().required(),
    fipe: Yup.number().required().moreThan(0),
    bodyWork: Yup.string().optional(),
    licensePlate: Yup.string().required(),
  });

  const { handleSubmit, values, touched, errors, handleChange, setFieldValue } = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      values.bodywork = currency(values.bodywork).value;
      values.fipe = currency(values.fipe).value;
      handleVehicle(values);
      handleIndex(2);
    },
  });

  // Get the brands os trucks
  useEffect(() => {
    fipeAPI
      .get<FipeApi[]>(`trucks/brands`)
      .then(({ data }) => {
        setFetchedBrands(data);
      })
      .catch((e: AxiosError) => {
        setToastMessage({
          status: "error",
          description: e.message,
          title: "Consulta Tabela FIPE - Marca",
          isClosable: true,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get the models of trucks based on brand
  useEffect(() => {
    const brand = values.brand;
    if (brand) {
      fipeAPI
        .get<FipeApi[]>(`trucks/brands/${brand}/models`)
        .then(({ data }) => {
          setFetchedModels(data);
        })
        .catch((e: AxiosError) => {
          setToastMessage({
            status: "error",
            description: e.message,
            title: "Consulta Tabela FIPE - Modelo",
            isClosable: true,
          });
        });
    }
  }, [values.brand]);

  // Get the year of the vehicle based on model and brand.
  useEffect(() => {
    const brand = values.brand;
    const model = values.model;

    if (model) {
      fipeAPI
        .get<FipeApi[]>(`trucks/brands/${brand}/models/${model}/years`)
        .then(({ data }) => {
          setFetchedYears(data);
        })
        .catch((e: AxiosError) => {
          setToastMessage({
            status: "error",
            description: e.message,
            title: "Consulta Tabela FIPE - Ano",
            isClosable: true,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.model]);

  // Get the FIPE values of all data.
  useEffect(() => {
    const brand = values.brand;
    const model = values.model;
    const year = values.year;
    if (year) {
      fipeAPI
        .get<FIPE>(`trucks/brands/${brand}/models/${model}/years/${year}`)
        .then(({ data }) => {
          setFieldValue("fipe", currencyToNumber(data.price));
          handleFipe(data);
        })
        .catch((e: AxiosError) => {
          setToastMessage({
            status: "error",
            description: e.message,
            title: "Consulta Tabela FIPE - Valor",
            isClosable: true,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.year]);

  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage]);

  return (
    <AccordionItem>
      <Text as="h2">
        <AccordionButton onClick={() => handleIndex(1)}>
          <Box flex="1" textAlign="center">
            Dados do Veículo
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Text>
      <AccordionPanel pb={4}>
        <form noValidate onSubmit={handleSubmit}>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Consulta Tabela FIPE
              </FormLabel>
              <Stack spacing={7} mb="24px">
                <Select
                  id="brand"
                  onChange={handleChange}
                  value={values.brand}
                  fontSize="sm"
                  borderRadius="15px"
                  size="lg"
                  isDisabled={fetchedBrands.length === 0}
                >
                  <option defaultValue="">Selecione uma Marca</option>
                  {fetchedBrands.map((brands, index) => (
                    <option value={brands.code} key={index}>
                      {brands.name}
                    </option>
                  ))}
                  <FormErrorMessage ms="4px">{touched.brand && errors.brand}</FormErrorMessage>
                </Select>
                <Select
                  id="model"
                  onChange={handleChange}
                  value={values.model}
                  fontSize="sm"
                  borderRadius="15px"
                  size="lg"
                  isDisabled={fetchedModels.length === 0}
                >
                  <option defaultValue="">Selecione um Modelo</option>
                  {fetchedModels.map((models, index) => (
                    <option value={models.code} key={index}>
                      {models.name}
                    </option>
                  ))}
                  <FormErrorMessage ms="4px">{touched.model && errors.model}</FormErrorMessage>
                </Select>
                <Select
                  id="year"
                  onChange={handleChange}
                  value={values.year}
                  fontSize="sm"
                  borderRadius="15px"
                  size="lg"
                  isDisabled={fetchedYears.length === 0}
                >
                  <option defaultValue="">Selecione um Ano</option>
                  {fetchedYears.map((years, index) => (
                    <option value={years.code} key={index}>
                      {years.name === "32000" ? "Zero Km" : years.name}
                    </option>
                  ))}
                  <FormErrorMessage ms="4px">{touched.year && errors.year}</FormErrorMessage>
                </Select>
              </Stack>
            </FormControl>
            <MoneyInputField
              id="fipe"
              name="Valor na Tabela FIPE"
              handleChange={handleChange}
              values={values.fipe}
              errorMessage={touched.fipe && errors.fipe}
              isInvalid={touched.fipe && Boolean(errors.fipe)}
              htmlFor="fipe"
              isRequired
              isReadOnly
            />

            <MoneyInputField
              id="bodywork"
              name="Valor do Agregado"
              handleChange={handleChange}
              values={values.bodywork}
              errorMessage={touched.bodywork && errors.bodywork}
              isInvalid={touched.bodywork && Boolean(errors.bodywork)}
              htmlFor="bodywork"
            />
            <MaskedInputField
              mask={[/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, "-", /\d/, /[a-zA-Z0-9]/, /\d/, /\d/]}
              name="Placa do Veículo"
              htmlFor="licensePlate"
              id="licensePlate"
              value={values.licensePlate.toUpperCase()}
              onChange={handleChange}
              placeholder="XXX-9999"
              errorMessage={touched.licensePlate && errors.licensePlate}
              isInvalid={touched.licensePlate && Boolean(errors.licensePlate)}
              isRequired
            />
          </SimpleGrid>
          <Flex justifyContent="flex-end">
            <Button colorScheme="teal" type="submit">
              Continuar
            </Button>
          </Flex>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
};
