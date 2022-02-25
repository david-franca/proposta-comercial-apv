import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import Mask from "react-input-mask";
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
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import { Separator } from "../Separator/Separator";
import { Config } from "../../firebase";

Yup.setLocale(ptForm);

interface ConfigurationProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialValues = {
  cellPhone: "",
  cotaValue: 0,
};

export default function Configuration(props: ConfigurationProps) {
  const { isOpen, onClose } = props;

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  let colorButton = useColorModeValue("white", "gray.700");
  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");
  const settingsRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [configuration, setConfiguration] = useState<any[]>([]);
  const [id, setId] = useState("");

  const phoneRegExp = /^\([0-9]+\)\s[0-9]+\s[0-9]+$/i;

  const formSchema = Yup.object().shape({
    cellPhone: Yup.string().matches(phoneRegExp, "Número de telefone inválido").required(),
    cotaValue: Yup.number().required().moreThan(0),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues,
    onSubmit: (values) => {
      Config().update(id, values);
    },
  });

  useEffect(() => {
    Config()
      .getAll()
      .then((config) => {
        const docs: any[] = [];
        config.docs.forEach((doc) => {
          docs.push(doc.data());
          setId(doc.id);
        });
        setConfiguration(docs);
        formik.setFieldValue("cellPhone", docs[0].cellPhone);
        formik.setFieldValue("cotaValue", docs[0].cotaValue);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Drawer
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
              <form noValidate onSubmit={formik.handleSubmit}>
                <Box>
                  <FormControl
                    isRequired
                    isInvalid={formik.touched.cellPhone && Boolean(formik.errors.cellPhone)}
                    mb="24px"
                  >
                    <FormLabel htmlFor="cellPhone" ms="4px" fontSize="md" fontWeight="600">
                      Telefone do Atendimento
                    </FormLabel>
                    <Mask
                      mask="(99) 99999 9999"
                      value={formik.values.cellPhone}
                      onChange={formik.handleChange}
                    >
                      {() => (
                        <Input
                          id="cellPhone"
                          fontSize="sm"
                          ms="4px"
                          borderRadius="15px"
                          type="text"
                          placeholder="Seu telefone"
                          size="lg"
                        />
                      )}
                    </Mask>
                    <FormErrorMessage ms="4px">
                      {formik.touched.cellPhone && formik.errors.cellPhone}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box mt="24px">
                  <FormControl>
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
                        value={formik.values.cotaValue}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
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
                </Box>
              </form>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
