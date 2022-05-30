import currency from "currency.js";
import { FormikErrors, FormikTouched, useFormik, useFormikContext, withFormik } from "formik";
import NP from "number-precision";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { IoCheckbox, IoLogoWhatsapp } from "react-icons/io5";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  chakra,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  List,
  ListIcon,
  ListItem,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { AssociateValues, FIPE, VehicleValues } from "../../../../@types/interfaces";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { createLink, currencyBRL } from "../../../../utils";
import { InputForm } from "../Input";
import { MoneyInputField } from "../MoneyInputField";

const CIoLogoWhatsapp = chakra(IoLogoWhatsapp);
Yup.setLocale(ptForm);

interface SummaryValues {
  protected: number;
  discount: number;
  admin: number;
  theft: number;
  total: number;
  accession: boolean;
  inspection: boolean;
  installation: boolean;
  cotas: number;
  monthlyPayment: number;
}

const initialValues: SummaryValues = {
  protected: 0,
  discount: 0,
  admin: 0,
  theft: 200,
  total: 0,
  accession: true,
  inspection: true,
  installation: true,
  cotas: 0,
  monthlyPayment: 0,
};

interface SummaryProps {
  handleIndex: (index: number) => void;
  vehicle: VehicleValues;
  person: AssociateValues;
}

export const Summary = ({ handleIndex, person, vehicle }: SummaryProps) => {
  // Checkbox states
  const [admin, setAdmin] = useState(0);
  const [radioValue, setRadioValue] = useState(200);
  const [planValue, setPlanValue] = useState("3");
  const [planValueDisabled, setPlanValueDisabled] = useState(false);
  const [fipe] = useLocalStorage<FIPE>("fipe", {} as FIPE);

  const [cotas, setCotas] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [protectedValue, setProtectedValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [rateio, setRateio] = useState(0);

  const cotaValueUnity = 21.16;

  // const rateio = useMemo(() => cotas * cotaValueUnity, [cotas]);

  const monthlyPayment = useMemo(
    () => admin + 200 + (planValue === "7" || planValue === "10" ? rateio / 2 : rateio),
    [admin, planValue, rateio]
  );

  const openInNewTab = (): void => {
    const url = createLink(
      {
        admin,
        phone: person.cellPhone.replace(/[^0-9,]+/g, ""),
        theft: 200, // theft,
        cota: cotas,
        total,
      },
      fipe
    );
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const bodywork = vehicle.bodywork;
      const fipeValue = vehicle.fipe;
      const protectedValue = currency(fipeValue).add(bodywork).value;
      const adminValue = currency(protectedValue).multiply(0.0022).value;
      const cotasValue = NP.round(protectedValue / 10000, 0);

      //setFieldValue("protected", protectedValue);
      //setFieldValue("cotas", NP.round(protectedValue / 10000, 0));
      setProtectedValue(protectedValue);
      setCotas(cotasValue);

      if (protectedValue) {
        if (protectedValue < 100000) {
          setPlanValue("10");
          setPlanValueDisabled(true);
        }

        if (protectedValue > 100000) {
          setPlanValue("3");
          setPlanValueDisabled(false);
        }

        if (protectedValue > 0) {
          //setFieldValue("admin", adminValue);
          setAdmin(adminValue);
        }
      }

      if (discount && discount > 0) {
        /* setFieldValue(
          "admin",
          currency(adminValue).subtract(adminValue * (values.discount / 100)).value
        ); */
        setAdmin(currency(adminValue).subtract(adminValue * (discount / 100)).value);
        setCotas(discount >= 50 ? NP.round(cotasValue / 2, 1) : NP.round(cotasValue, 1));
      }
      if (!discount) {
        //setFieldValue("admin", adminValue);
        setAdmin(adminValue);
      }

      setTotal(NP.plus(adminValue, 600, 50, 170, 200));
    }, 500);

    // discount >= 50 ? NP.round(values.cotas / 2, 1) : NP.round(values.cotas, 1)

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle.bodywork]);

  useEffect(() => {
    if (["10", "7"].includes(planValue)) {
      //setFieldValue("discount", 50);
      setDiscount(50);
    }
    if (planValue === "3") {
      //setFieldValue("discount", 30);
      setDiscount(30);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planValue]);

  return (
    <AccordionItem>
      <Text as="h2">
        <AccordionButton onClick={() => handleIndex(2)}>
          <Box flex="1" textAlign="center">
            Resultado
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Text>
      <AccordionPanel pb={4}>
        <RadioGroup
          id="plain"
          value={planValue}
          onChange={setPlanValue}
          size="lg"
          ms="4px"
          colorScheme="teal"
          me="5px"
          mb="24px"
        >
          <Radio value="3" me="30px" isDisabled={planValueDisabled}>
            Master
          </Radio>
          <Radio value="7" me="30px" isDisabled={planValueDisabled}>
            Golden
          </Radio>
          <Radio value="10" me="30px" isDisabled={!planValueDisabled}>
            Top
          </Radio>
        </RadioGroup>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
          <Stat>
            <StatLabel>Valor Protegido</StatLabel>
            <StatNumber>{currencyBRL(protectedValue)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Taxa Administrativa</StatLabel>
            <StatNumber>{currencyBRL(admin)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Adesão</StatLabel>
            <StatNumber>{currencyBRL(600)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Vistoria</StatLabel>
            <StatNumber>{currencyBRL(50)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Instalação</StatLabel>
            <StatNumber>{currencyBRL(170)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Proteção Nacional</StatLabel>
            <StatNumber>{currencyBRL(200)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Cotas</StatLabel>
            <StatNumber>{cotas}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Mensalidade</StatLabel>
            <StatNumber>{currencyBRL(monthlyPayment)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>{currencyBRL(total)}</StatNumber>
          </Stat>
        </SimpleGrid>
        {/* <form noValidate onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="plain" ms="4px" fontSize="sm" fontWeight="normal">
              Planos
            </FormLabel>
            <RadioGroup
              id="plain"
              value={planValue}
              onChange={setPlanValue}
              size="lg"
              ms="4px"
              colorScheme="teal"
              me="5px"
              mb="24px"
            >
              <Radio value="3" me="30px" isDisabled={planValueDisabled}>
                Master
              </Radio>
              <Radio value="7" me="30px" isDisabled={planValueDisabled}>
                Golden
              </Radio>
              <Radio value="10" me="30px" isDisabled={!planValueDisabled}>
                Top
              </Radio>
            </RadioGroup>
          </FormControl>

          <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
            <MoneyInputField
              id="protectedValue"
              name="Valor Protegido"
              handleChange={handleChange}
              values={values.protected}
              errorMessage={touched.protected && errors.protected}
              isInvalid={touched.protected && Boolean(errors.protected)}
              htmlFor="protectedValue"
              isReadOnly
            />
            <MoneyInputField
              id="admin"
              name="Taxa Administrativa"
              handleChange={handleChange}
              values={values.admin}
              errorMessage={touched.admin && errors.admin}
              isInvalid={touched.admin && Boolean(errors.admin)}
              htmlFor="admin"
              isReadOnly
            />
            <InputForm
              id="discount"
              name="Desconto"
              touched={touched.discount}
              errors={errors.discount}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              values={values.discount}
              type="number"
              isRequired={false}
              addon="%"
              isReadOnly
            />
          </SimpleGrid>

          <FormControl display="flex" flexDir="column">
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Taxas
            </FormLabel>
            <Box>
              <Checkbox
                id="accession"
                colorScheme="teal"
                fontSize="sm"
                ms="4px"
                mb="12px"
                size="lg"
                isDisabled
                defaultChecked
                isChecked={accession}
                onChange={(e) => {
                  setAccession(e.target.checked);
                  setFieldValue("accession", e.target.checked);
                }}
              >
                Adesão
              </Checkbox>
              <Tooltip label="R$ 600,00" hasArrow fontSize="md" placement="right">
                <InfoOutlineIcon marginLeft="5px" fontSize="sm" />
              </Tooltip>
            </Box>
            <Box>
              <Checkbox
                colorScheme="teal"
                fontSize="sm"
                ms="4px"
                mb="12px"
                size="lg"
                isDisabled
                defaultChecked
                isChecked={inspection}
                onChange={(e) => {
                  setInspection(e.target.checked);
                  setFieldValue("inspection", e.target.checked);
                }}
              >
                Vistoria
              </Checkbox>
              <Tooltip label="R$ 50,00" hasArrow fontSize="md" placement="right">
                <InfoOutlineIcon marginLeft="5px" fontSize="sm" />
              </Tooltip>
            </Box>
            <Box>
              <Checkbox
                colorScheme="teal"
                fontSize="sm"
                ms="4px"
                mb="12px"
                size="lg"
                isDisabled
                defaultChecked
                isChecked={installation}
                onChange={(e) => {
                  setInstallation(e.target.checked);
                  setFieldValue("installation", e.target.checked);
                }}
              >
                Instalação
              </Checkbox>
              <Tooltip label="R$ 170,00" hasArrow fontSize="md" placement="right">
                <InfoOutlineIcon marginLeft="5px" fontSize="sm" />
              </Tooltip>
            </Box>
            <RadioGroup
              id="theft"
              value={radioValue}
              onChange={(value) => setRadioValue(parseInt(value))}
              display="flex"
              flexDir="column"
              size="lg"
              ms="4px"
              colorScheme="teal"
            >
              <Radio value={200} mb="12px" type="number">
                Proteção Nacional
              </Radio>
              <Radio value={140} mb="24px" type="number">
                Proteção Norte e Nordeste
              </Radio>
            </RadioGroup>
          </FormControl>

          <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing="24px">
            <MoneyInputField
              id="total"
              name="Total"
              handleChange={handleChange}
              values={values.total}
              errorMessage={touched.total && errors.total}
              isInvalid={touched.total && Boolean(errors.total)}
              htmlFor="total"
              isReadOnly
            />
            <InputForm
              id="cotas"
              name="Cotas"
              touched={touched.cotas}
              errors={errors.cotas}
              handleChange={handleChange}
              values={
                values.discount >= 50 ? NP.round(values.cotas / 2, 1) : NP.round(values.cotas, 1)
              }
              type="number"
              isReadOnly
            />
            <MoneyInputField
              id="monthlyPayment"
              name="Mensalidade"
              handleChange={handleChange}
              values={values.monthlyPayment}
              errorMessage={touched.monthlyPayment && errors.monthlyPayment}
              isInvalid={touched.monthlyPayment && Boolean(errors.monthlyPayment)}
              htmlFor="monthlyPayment"
              isReadOnly
            />
          </SimpleGrid>
          <Button
            type="submit"
            bg="teal.300"
            fontSize="15px"
            color="white"
            fontWeight="bold"
            // isLoading={loading}
            loadingText="Aguarde"
            w="100%"
            h="45"
            mb="24px"
            leftIcon={<CIoLogoWhatsapp />}
            onClick={() => openInNewTab()}
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
          >
            SALVAR E ENVIAR
          </Button>
        </form> */}
      </AccordionPanel>
    </AccordionItem>
  );
};
