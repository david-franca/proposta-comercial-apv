import currency from "currency.js";
import NP from "number-precision";
import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  chakra,
  Divider,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";

import { AssociateValues, FIPE, VehicleValues } from "../../../../@types/interfaces";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { createLink, currencyBRL } from "../../../../utils";
import { Card, CardBody } from "../../../../components";

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

interface SummaryProps {
  handleIndex: (index: number) => void;
  vehicle: VehicleValues;
  person: AssociateValues;
  fipe: FIPE;
}

export const Summary = ({ handleIndex, person, vehicle, fipe }: SummaryProps) => {
  // Checkbox states
  const [planValue, setPlanValue] = useState("");

  const [discount, setDiscount] = useState(0);
  const [rateio, setRateio] = useState(0);
  const [protectedValue, setProtectedValue] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [cotas, setCotas] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [total, setTotal] = useState(0);

  const cotaValueUnity = 21.16;

  const openInNewTab = (): void => {
    const url = createLink(
      {
        admin,
        phone: person.cellPhone.replace(/[^0-9,]+/g, ""),
        theft: 200,
        cota: cotas,
        total,
      },
      fipe
    );
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    const bodywork = vehicle.bodywork;
    const fipeValue = vehicle.fipe;
    const protectedValue = currency(fipeValue).add(bodywork).value;
    const adminValue = currency(protectedValue).multiply(0.0022).value;
    const cotasValue = NP.round(protectedValue / 10000, 0);

    let discountValue = 0;
    let planValueRaw = "";

    if (protectedValue) {
      if (protectedValue < 100000) {
        planValueRaw = "Top";
      }
      if (protectedValue > 100000) {
        planValueRaw = "Master";
      }
    }
    if (planValueRaw === "Master") {
      discountValue = 50;
    }
    if (planValueRaw === "Top") {
      discountValue = 30;
    }

    setAdmin(currency(adminValue).subtract(adminValue * (discountValue / 100)).value);
    setCotas(discountValue >= 50 ? NP.round(cotasValue / 2, 1) : NP.round(cotasValue, 1));

    const rateioValue = cotasValue * cotaValueUnity;

    setDiscount(discountValue);
    setPlanValue(planValueRaw);
    setTotal(NP.plus(adminValue, 600, 50, 170, 200));
    setProtectedValue(protectedValue);
    setRateio(rateioValue);
    setMonthlyPayment(adminValue + 200 + (planValueRaw === "10" ? rateioValue / 2 : rateioValue));
  }, [vehicle]);

  return (
    <AccordionItem>
      <Text as="h2">
        <AccordionButton onClick={() => handleIndex(2)}>
          <Box flex="1" textAlign="center">
            Resumo
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Text>
      <AccordionPanel pb={4}>
        <Card p="16px">
          <CardBody h="100%" flexDir="column">
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }}>
              <Box>
                <Flex mb={8}>
                  <Heading as="h3" size="lg">
                    Veículo
                  </Heading>
                </Flex>
                <Stack spacing={3} mb={6}>
                  <Text>
                    Marca: <Text as="strong">{fipe.brand}</Text>
                  </Text>
                  <Text>
                    Código FIPE: <Text as="strong">{fipe.codeFipe}</Text>
                  </Text>
                  <Text>
                    Tipo de Combustível: <Text as="strong">{fipe.fuel}</Text>
                  </Text>
                  <Text>
                    Modelo: <Text as="strong">{fipe.model}</Text>
                  </Text>
                  <Text>
                    Valor: <Text as="strong">{fipe.price}</Text>
                  </Text>
                  <Text>
                    Mês de Referência: <Text as="strong">{fipe.referenceMonth}</Text>
                  </Text>
                </Stack>
              </Box>
              <Box>
                <Flex mb={8}>
                  <Heading as="h3" size="lg">
                    Cliente
                  </Heading>
                </Flex>
                <Stack spacing={3} mb={6}>
                  <Text>
                    Nome: <Text as="strong">{person.fullName}</Text>
                  </Text>
                  <Text>
                    Telefone: <Text as="strong">{person.cellPhone}</Text>
                  </Text>
                  <Text>
                    Email: <Text as="strong">{person.email}</Text>
                  </Text>
                  <Text>
                    Placa do Veículo: <Text as="strong">{person.licensePlate}</Text>
                  </Text>
                </Stack>
              </Box>
            </SimpleGrid>
            <Center mb={8}>
              <Heading as="h3" size="lg">
                Plano {planValue}
              </Heading>
            </Center>
            <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing={10}>
              <Stat>
                <StatLabel>Desconto</StatLabel>
                <StatNumber>{discount}%</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Rateio Previsto</StatLabel>
                <StatNumber>{currencyBRL(rateio)}</StatNumber>
              </Stat>
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
            <Center mt={8}>
              <Button
                type="submit"
                bg="teal.300"
                fontSize="15px"
                color="white"
                fontWeight="bold"
                // isLoading={loading}
                loadingText="Aguarde"
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
            </Center>
          </CardBody>
        </Card>
      </AccordionPanel>
    </AccordionItem>
  );
};
