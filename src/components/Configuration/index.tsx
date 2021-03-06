import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import TextMaskedInput from "react-text-mask";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import authService from "../../service/auth.service";
import { Separator } from "../Separator";
import { useDocument } from "../../lib";
import useAuth from "../../hooks/useAuth";

Yup.setLocale(ptForm);

interface ConfigurationProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialValues = {
  cellPhone: "",
  cotaValue: 0,
};

export const Configuration = (props: ConfigurationProps): JSX.Element => {
  const { isOpen, onClose } = props;

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  let colorButton = useColorModeValue("white", "gray.700");
  const settingsRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { configurations, handleConfigurations } = useAuth();

  const phoneRegExp = /^\([0-9]+\)\s[0-9]+\s[0-9]+$/i;

  const formSchema = Yup.object().shape({
    cellPhone: Yup.string().matches(phoneRegExp, "Número de telefone inválido").required(),
    cotaValue: Yup.number().required().moreThan(0),
  });

  const { errors, handleSubmit, setFieldValue, touched, values, handleChange } = useFormik({
    validationSchema: formSchema,
    initialValues,
    onSubmit: (values) => {
      handleConfigurations(values);
    },
  });

  useEffect(() => {
    if (configurations && configurations.exists) {
      setFieldValue("cellPhone", configurations.cellPhone);
      setFieldValue("cotaValue", configurations.cotaValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configurations]);

  return (
    <>
      <Drawer
        id="configuration-drawer"
        isOpen={isOpen}
        onClose={onClose}
        placement={"right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" my="16px">
              Configurações
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <form noValidate onSubmit={handleSubmit}>
                <Box>
                  <FormControl
                    isRequired
                    isInvalid={touched.cellPhone && Boolean(errors.cellPhone)}
                    mb="24px"
                  >
                    <FormLabel htmlFor="cellPhone" ms="4px" fontSize="md" fontWeight="600">
                      Telefone do Atendimento
                    </FormLabel>
                    <Input
                      as={TextMaskedInput}
                      guide
                      id="cellPhone"
                      fontSize="sm"
                      ms="4px"
                      borderRadius="15px"
                      type="text"
                      placeholder="Seu telefone"
                      size="lg"
                      value={values.cellPhone}
                      onChange={handleChange}
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
                    />
                    <FormErrorMessage ms="4px">
                      {touched.cellPhone && errors.cellPhone}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box mt="24px">
                  <FormControl
                    isRequired
                    isInvalid={touched.cotaValue && Boolean(errors.cotaValue)}
                  >
                    <FormLabel htmlFor="cotaValue" ms="4px" fontSize="md" fontWeight="600">
                      Valor da Cota
                    </FormLabel>
                    <InputGroup mb="24px" size="lg">
                      <InputLeftAddon
                        ms="4px"
                        borderRadius="15px"
                        bg="teal.300"
                        fontSize="15px"
                        color="white"
                        fontWeight="bold"
                      >
                        R$
                      </InputLeftAddon>
                      <Input
                        id="cotaValue"
                        fontSize="sm"
                        borderRadius="15px"
                        value={values.cotaValue}
                        type="number"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <FormErrorMessage ms="4px">
                      {touched.cotaValue && errors.cotaValue}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Separator />
                <Box mt="24px">
                  <Button
                    w="100%"
                    mb="16px"
                    bg={bgButton}
                    color={colorButton}
                    fontSize="xs"
                    variant="no-hover"
                    px="30px"
                    type="submit"
                  >
                    Salvar
                  </Button>

                  <Button
                    id="logout"
                    w="100%"
                    mb="16px"
                    bg="red.400"
                    color={colorButton}
                    fontSize="xs"
                    _hover={{
                      bg: "red.300",
                    }}
                    _active={{
                      bg: "red.500",
                    }}
                    px="30px"
                    type="button"
                    onClick={async () => {
                      await authService.logout();
                    }}
                  >
                    Sair
                  </Button>
                </Box>
              </form>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
