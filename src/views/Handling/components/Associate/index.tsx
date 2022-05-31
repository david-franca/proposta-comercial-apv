import { useFormik } from "formik";
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
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { AssociateValues } from "../../../../@types/interfaces";
import { InputForm } from "../Input";
import { MaskedInputField } from "../MaskedInputField";

Yup.setLocale(ptForm);

interface AssociateProps {
  handleIndex: (index: number) => void;
  handlePerson: (person: AssociateValues) => void;
}

const initialValues: AssociateValues = {
  fullName: "",
  cellPhone: "",
  email: "",
};

export const Associate = ({ handleIndex, handlePerson }: AssociateProps) => {
  // const { values, touched, errors, handleChange } = useFormikContext<AssociateValues>();

  const phoneRegExp = /^\([0-9]+\)\s[0-9]+\s[0-9]+$/i;

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required().min(2),
    cellPhone: Yup.string().matches(phoneRegExp, "Número de telefone inválido").required(),
    email: Yup.string().email().required(),
  });

  const { handleSubmit, values, touched, errors, handleChange } = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      handlePerson(values);
      handleIndex(1);
    },
  });

  return (
    <AccordionItem>
      <Text as="h2">
        <AccordionButton onClick={() => handleIndex(0)}>
          <Box flex="1" textAlign="center">
            <Text>Dados do Associado</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Text>
      <AccordionPanel pb={4}>
        <form noValidate onSubmit={handleSubmit}>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
            <InputForm
              id="fullName"
              name="Nome"
              touched={touched.fullName}
              errors={errors.fullName}
              handleChange={handleChange}
              values={values.fullName}
              placeholder="Nome Completo"
              isRequired
              type="text"
            />
            <MaskedInputField
              name="Telefone"
              mask={[
                "(",
                /[1-9]/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              htmlFor="cellPhone"
              value={values.cellPhone}
              onChange={handleChange}
              id="cellPhone"
              errorMessage={touched.cellPhone && errors.cellPhone}
              isInvalid={touched.cellPhone && Boolean(errors.cellPhone)}
              placeholder="(99) 99999 9999"
              isRequired
            />
            <InputForm
              id="email"
              name="Email"
              touched={touched.email}
              errors={errors.email}
              handleChange={handleChange}
              values={values.email.toLowerCase()}
              placeholder="Endereço de e-mail"
              isRequired
              type="email"
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
