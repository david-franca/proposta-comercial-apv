import { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import NP from "number-precision";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { FaWhatsapp } from "react-icons/fa";
import Mask from "react-input-mask";
import { v4 } from "uuid";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  chakra,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";

import { FIPE, FipeApi, Models } from "../@types/interfaces";
import { auth, db, logout } from "../firebase/clientApp";
import { currencyBRL, currencyToNumber, fipeAPI, handleError } from "../utils";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { GetServerSideProps, NextPage } from "next";
import { absoluteUrl } from "../utils/baseURL";

Yup.setLocale(ptForm);

const CFaWhatsapp = chakra(FaWhatsapp);
interface FormValues {
  fullName: string;
  cellPhone: string;
  email: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: string;
  fipe: number;
  bodywork: number;
  protected: string;
  discount: number;
  admin: number;
  theft: string;
  total: number;
  accession: number;
  inspection: number;
  installation: number;
  cotas: number;
}

interface ServerProps {
  baseUrl?: string;
}

const initialValues: FormValues = {
  fullName: "",
  cellPhone: "",
  email: "",
  licensePlate: "",
  brand: "",
  model: "",
  year: "",
  fipe: 0,
  bodywork: 0,
  protected: "",
  discount: 0,
  admin: 0,
  theft: "200",
  total: 0,
  accession: 600,
  inspection: 50,
  installation: 170,
  cotas: 0,
};

const fipeDefault: FIPE = {
  Valor: "",
  Marca: "",
  Modelo: "",
  AnoModelo: "",
  Combustivel: "",
  CodigoFipe: "",
  MesReferencia: "",
  TipoVeiculo: 0,
  SiglaCombustivel: "",
};

const dateLong = new Date().toLocaleDateString("pt-br", {
  dateStyle: "long",
});

const phoneRegExp = /^\([0-9]+\)\s[0-9]+\s[0-9]+$/i;

const NextUi: NextPage<ServerProps> = ({ baseUrl }) => {
  const formSchema = Yup.object().shape({
    fullName: Yup.string().required().min(2),
    cellPhone: Yup.string().matches(phoneRegExp, "Número de telefone inválido").required(),
    email: Yup.string().email().required(),
    licensePlate: Yup.string().required(),
    brand: Yup.string().required(),
    model: Yup.string().required(),
    year: Yup.string().required(),
    fipe: Yup.number().required().moreThan(0),
    bodyWork: Yup.string().optional(),
    protected: Yup.string().required(),
    discount: Yup.number().optional().lessThan(100).positive(),
    theft: Yup.string().required(),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues,
    onSubmit: (values) => {
      addProposal(values);
      setPdfData(values);
      if (typeof window !== "undefined") {
        window.open(`${baseUrl}/pdf`, "_blank");
      }
    },
  });

  // FIPE values
  const [fetchedBrands, setFetchedBrands] = useState<FipeApi[]>([]);
  const [fetchedModels, setFetchedModels] = useState<FipeApi[]>([]);
  const [fetchedYears, setFetchedYears] = useState<FipeApi[]>([]);
  // Switch States
  const [discount, setDiscount] = useState(false);
  const [bodyWork, setBodyWork] = useState(false);
  // Checkbox states
  const [accession, setAccession] = useState(true);
  const [inspection, setInspection] = useState(true);
  const [installation, setInstallation] = useState(true);

  const [radioValue, setRadioValue] = useState("200");
  const [admin, setAdmin] = useState(0);

  const [user] = useAuthState(auth);
  const [_pdfData, setPdfData] = useLocalStorage("pdf", initialValues);
  const [_fipeData, setFipeData] = useLocalStorage<FIPE>("fipe", fipeDefault);

  // const [proposal, proposalLoading, proposalError] = useCollection(db.collection("proposal"), {});

  const addProposal = async (proposal: FormValues) => {
    if (user) {
      const id = v4();
      await db.collection("propostas").doc(user.uid).collection("open").doc(id).set(proposal);
    }
  };

  const total = NP.plus(
    formik.values.admin,
    Number(formik.values.accession),
    Number(formik.values.inspection),
    Number(formik.values.installation),
    Number(formik.values.theft)
  );

  // Get the brands os trucks
  useEffect(() => {
    fipeAPI
      .get(`caminhoes/marcas`)
      .then(({ data }: AxiosResponse<FipeApi[]>) => {
        setFetchedBrands(data);
      })
      .catch((e: AxiosError) => {
        handleError(e);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Get the models of trucks based on brand
  useEffect(() => {
    const brand = formik.values.brand;
    if (brand) {
      fipeAPI
        .get(`caminhoes/marcas/${brand}/modelos`)
        .then(({ data }: AxiosResponse<Models>) => {
          setFetchedModels(data.modelos);
        })
        .catch((e: AxiosError) => {
          handleError(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.brand]);
  // Get the year of the vehicle based on model and brand.
  useEffect(() => {
    const brand = formik.values.brand;
    const model = formik.values.model;

    if (model) {
      fipeAPI
        .get(`caminhoes/marcas/${brand}/modelos/${model}/anos`)
        .then(({ data }: AxiosResponse<FipeApi[]>) => {
          setFetchedYears(data);
        })
        .catch((e: AxiosError) => {
          handleError(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.model]);
  // Get the FIPE values of all data.
  useEffect(() => {
    const brand = formik.values.brand;
    const model = formik.values.model;
    const year = formik.values.year;
    if (year) {
      fipeAPI
        .get(`caminhoes/marcas/${brand}/modelos/${model}/anos/${year}`)
        .then(({ data }: AxiosResponse<FIPE>) => {
          formik.setFieldValue("fipe", currencyToNumber(data.Valor));
        })
        .catch((e: AxiosError) => {
          handleError(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.year]);
  // Clear the bodywork value if bodywork switch is false
  useEffect(() => {
    if (!bodyWork) {
      formik.setFieldValue("bodywork", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyWork]);
  // Clear the discount value if discount switch is false
  useEffect(() => {
    if (!discount) {
      formik.setFieldValue("discount", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discount]);
  // Set the value o vehicle on field FIPE
  useEffect(() => {
    const fipeValue = formik.values.fipe;
    formik.setFieldValue("protected", currencyBRL(fipeValue).slice(3));
    formik.setFieldValue("cotas", NP.round(fipeValue / 10000, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.fipe]);

  useEffect(() => {
    const bodywork = Number(formik.values.bodywork ?? 0);
    const fipeValue = Number(formik.values.fipe);
    const total = NP.plus(bodywork, fipeValue);
    formik.setFieldValue("protected", currencyBRL(total).slice(3));
    formik.setFieldValue("cotas", NP.round(total / 10000, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.bodywork]);

  useEffect(() => {
    formik.setFieldValue("theft", radioValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  useEffect(() => {
    const protectedValue = currencyToNumber(formik.values.protected);

    if (protectedValue && protectedValue > 0) {
      formik.setFieldValue("admin", NP.round(protectedValue * 0.0022, 2));
      setAdmin(NP.round(protectedValue * 0.0022, 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.protected]);

  useEffect(() => {
    const protectedValue = currencyToNumber(formik.values.protected);
    const adminValue = protectedValue * 0.0022;

    if (formik.values.discount && formik.values.discount > 0) {
      formik.setFieldValue(
        "admin",
        NP.round(adminValue - adminValue * (formik.values.discount / 100), 2)
      );
    }
    if (!formik.values.discount) {
      formik.setFieldValue("admin", NP.round(protectedValue * 0.0022, 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.discount]);

  useEffect(() => {
    if (accession) {
      formik.setFieldValue("accession", 600);
    } else {
      formik.setFieldValue("accession", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accession]);

  useEffect(() => {
    if (inspection) {
      formik.setFieldValue("inspection", 50);
    } else {
      formik.setFieldValue("inspection", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspection]);

  useEffect(() => {
    if (installation) {
      formik.setFieldValue("installation", 170);
    } else {
      formik.setFieldValue("installation", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installation]);

  useEffect(() => {
    formik.setFieldValue("total", total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <Flex
      id="container"
      alignItems="center"
      backgroundColor="gray.200"
      justifyContent="center"
      flexDirection="column"
      padding={0}
      margin={0}
    >
      <Heading size="md">Proposta Comercial - Proteção Veicular</Heading>
      <Text>
        {!user ? "" : user.displayName} - Fortaleza - {dateLong}
      </Text>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3} backgroundColor="whiteAlpha.900" p="2rem" width="50vw" boxShadow="md">
          <FormControl
            isRequired
            isInvalid={formik.touched.fullName && Boolean(formik.errors.fullName)}
          >
            <FormLabel htmlFor="fullName">Nome Completo</FormLabel>
            <Input
              id="fullName"
              label="Nome Completo"
              type="text"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.touched.fullName && formik.errors.fullName}</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={formik.touched.cellPhone && Boolean(formik.errors.cellPhone)}
          >
            <FormLabel htmlFor="cellPhone">Telefone</FormLabel>
            <Mask
              mask="(99) 99999 9999"
              value={formik.values.cellPhone}
              onChange={formik.handleChange}
            >
              {() => <Input id="cellPhone" label="Telefone" type="text" />}
            </Mask>
            <FormErrorMessage>
              {formik.touched.cellPhone && formik.errors.cellPhone}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={formik.touched.email && Boolean(formik.errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.touched.email && formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={formik.touched.licensePlate && Boolean(formik.errors.licensePlate)}
          >
            <FormLabel htmlFor="licensePlate">Placa do Veículo</FormLabel>
            <Mask
              mask="aaa-9**9"
              value={formik.values.licensePlate.toUpperCase()}
              onChange={formik.handleChange}
            >
              {() => <Input id="licensePlate" type="text" />}
            </Mask>
            <FormErrorMessage>
              {formik.touched.licensePlate && formik.errors.licensePlate}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Consulta Tabela FIPE</FormLabel>
            <Stack spacing={3}>
              <Select
                id="brand"
                onChange={formik.handleChange}
                value={formik.values.brand}
                isRequired
                isInvalid={
                  (formik.touched.brand && Boolean(formik.errors.brand)) ||
                  formik.values.brand === ""
                }
              >
                <option value="" selected>
                  Selecione
                </option>
                {fetchedBrands.map((brands, index) => (
                  <option value={brands.codigo} key={index}>
                    {brands.nome}
                  </option>
                ))}
                <FormErrorMessage>{formik.touched.brand && formik.errors.brand}</FormErrorMessage>
              </Select>
              <Select
                id="model"
                onChange={formik.handleChange}
                value={formik.values.model}
                isRequired
                isInvalid={
                  (formik.touched.model && Boolean(formik.errors.model)) ||
                  formik.values.model === ""
                }
              >
                <option value="" selected>
                  Selecione
                </option>
                {fetchedModels.map((models, index) => (
                  <option value={models.codigo} key={index}>
                    {models.nome}
                  </option>
                ))}
                <FormErrorMessage>{formik.touched.model && formik.errors.model}</FormErrorMessage>
              </Select>
              <Select
                id="year"
                onChange={formik.handleChange}
                value={formik.values.year}
                isRequired
                isInvalid={
                  (formik.touched.year && Boolean(formik.errors.year)) || formik.values.year === ""
                }
              >
                <option value="" selected>
                  Selecione
                </option>
                {fetchedYears.map((years, index) => (
                  <option value={years.codigo} key={index}>
                    {years.nome}
                  </option>
                ))}
                <FormErrorMessage>{formik.touched.year && formik.errors.year}</FormErrorMessage>
              </Select>
            </Stack>
          </FormControl>
          <FormControl
            isRequired
            isReadOnly
            isInvalid={formik.touched.fipe && Boolean(formik.errors.fipe)}
          >
            <FormLabel htmlFor="fipe">Valor na Tabela FIPE</FormLabel>
            <InputGroup>
              <InputLeftAddon>R$</InputLeftAddon>
              <Input id="fipe" type="text" value={currencyBRL(formik.values.fipe).slice(3)} />
            </InputGroup>
            <FormErrorMessage>{formik.touched.fipe && formik.errors.fipe}</FormErrorMessage>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="bodywork" mb="0">
              Possui Implemento?
            </FormLabel>
            <Switch
              id="bodywork"
              isChecked={bodyWork}
              onChange={(e) => setBodyWork(e.target.checked)}
            />
          </FormControl>
          <Collapse in={bodyWork} animateOpacity>
            <FormControl>
              <FormLabel htmlFor="bodywork">Valor do Agregado</FormLabel>
              <InputGroup>
                <InputLeftAddon>R$</InputLeftAddon>
                <NumberInput id="bodywork" precision={2} value={formik.values.bodywork}>
                  <NumberInputField onChange={formik.handleChange} />
                </NumberInput>
              </InputGroup>
            </FormControl>
          </Collapse>
          <FormControl>
            <FormLabel htmlFor="protectedValue">Valor Protegido</FormLabel>
            <InputGroup>
              <InputLeftAddon>R$</InputLeftAddon>
              <Input id="protectedValue" value={formik.values.protected} isReadOnly />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="admin">Taxa Administrativa</FormLabel>
            <InputGroup>
              <InputLeftAddon>R$</InputLeftAddon>
              <Input id="admin" value={admin} isReadOnly />
            </InputGroup>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="discount" mb="0">
              Desconto?
            </FormLabel>
            <Switch
              id="discount"
              isChecked={discount}
              onChange={(e) => setDiscount(e.target.checked)}
            />
          </FormControl>
          <Collapse in={discount} animateOpacity>
            <FormControl isInvalid={formik.touched.discount && Boolean(formik.errors.discount)}>
              <FormLabel htmlFor="discount">Percentagem</FormLabel>
              <InputGroup>
                <InputLeftAddon>%</InputLeftAddon>
                <NumberInput
                  step={1}
                  min={0}
                  max={100}
                  id="discount"
                  value={formik.values.discount}
                  clampValueOnBlur={false}
                >
                  <NumberInputField onChange={formik.handleChange} />
                </NumberInput>
                <FormErrorMessage>
                  {formik.touched.discount && formik.errors.discount}
                </FormErrorMessage>
              </InputGroup>
            </FormControl>
          </Collapse>
          <FormControl display="flex" flexDir="column">
            <FormLabel>Taxas</FormLabel>
            <Checkbox
              id="accession"
              value={formik.values.accession}
              isChecked={accession}
              onChange={(e) => setAccession(e.target.checked)}
            >
              Adesão
            </Checkbox>
            <Checkbox
              value={formik.values.inspection}
              isChecked={inspection}
              onChange={(e) => setInspection(e.target.checked)}
            >
              Vistoria
            </Checkbox>
            <Checkbox
              value={formik.values.installation}
              isChecked={installation}
              onChange={(e) => setInstallation(e.target.checked)}
            >
              Instalação
            </Checkbox>
            <RadioGroup
              id="theft"
              value={radioValue}
              onChange={setRadioValue}
              display="flex"
              flexDir="column"
            >
              <Radio value="200">Proteção Nacional</Radio>
              <Radio value="140">Proteção Norte e Nordeste</Radio>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="total">Total</FormLabel>
            <InputGroup>
              <InputLeftAddon>R$</InputLeftAddon>
              <Input
                id="total"
                value={Number.isNaN(formik.values.total) ? 0 : formik.values.total}
                isReadOnly
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="cotas">Cotas</FormLabel>
            <Input
              id="cotas"
              value={
                formik.values.discount >= 50
                  ? NP.round(formik.values.cotas / 2, 1)
                  : NP.round(formik.values.cotas, 1)
              }
              isReadOnly
            />
          </FormControl>

          <Flex paddingBottom={20} justifyContent="space-evenly">
            <Button colorScheme="linkedin" type="submit">
              Gerar PDF <ExternalLinkIcon mx="2px" />
            </Button>

            <Link
              target="_blank"
              isExternal
              href={`https://api.whatsapp.com/send?phone=55${formik.values.cellPhone.replace(
                /[^0-9,]+/g,
                ""
              )}&text=*Proteção%20Veicular%20Completa*%20%0a%0a%20*Veículo:*%20Caminhão%0a%20*Valor%20FIPE:*%20${currencyBRL(
                formik.values.fipe
              )}%20%0a%20*Adesão:*%20${currencyBRL(total)}%20%0a%20*Mensalidade:*%20${currencyBRL(
                admin
              )}%20%0a%20*Estimativa%20de%20Rateio:*%20${currencyBRL(formik.values.cotas * 20)}`}
              rel="noopener noreferrer"
            >
              <Button colorScheme="whatsapp" leftIcon={<CFaWhatsapp />}>
                Whatsapp
              </Button>
            </Link>
          </Flex>
        </Stack>
      </form>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { origin } = absoluteUrl(req);

  return {
    props: {
      baseUrl: origin,
    },
  };
};

export default NextUi;
