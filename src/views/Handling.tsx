import { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import NP from "number-precision";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoLogoWhatsapp } from "react-icons/io5";
import Mask from "react-input-mask";
import { v4 } from "uuid";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";
import moment from "moment";

import {
  Button,
  chakra,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  useColorModeValue,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";

import { FIPE, FipeApi, Models, Status } from "../@types/interfaces";
import { auth, Propostas, Users } from "../firebase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  capitalizeWords,
  createLink,
  currencyBRL,
  currencyToNumber,
  fipeAPI,
  handleError,
} from "../utils";
import { DocumentData, Timestamp } from "firebase/firestore";

Yup.setLocale(ptForm);

const CIoLogoWhatsapp = chakra(IoLogoWhatsapp);

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
  protected: number;
  discount: number;
  admin: number;
  theft: string;
  total: number;
  accession: number;
  inspection: number;
  installation: number;
  cotas: number;
  mensal: number;
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
  protected: 0,
  discount: 0,
  admin: 0,
  theft: "200",
  total: 0,
  accession: 600,
  inspection: 50,
  installation: 170,
  cotas: 0,
  mensal: 0,
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

interface HandlingProps {
  id?: string;
}

/* interface InitialProposta {
  cellPhone: string;
  code: string;
  createdAt: Timestamp;
  fullName: string;
  photoURL: string;
  status: string;
} */

const Handling = ({ id }: HandlingProps) => {
  const toast = useToast();
  const [toastMessage, setToastMessage] = useState<UseToastOptions>();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

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
    discount: Yup.number().optional().lessThan(100),
    theft: Yup.string().required(),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      await addProposal(values);
    },
  });

  // FIPE values
  const [fetchedBrands, setFetchedBrands] = useState<FipeApi[]>([]);
  const [fetchedModels, setFetchedModels] = useState<FipeApi[]>([]);
  const [fetchedYears, setFetchedYears] = useState<FipeApi[]>([]);
  // Switch States
  const [bodyWork, setBodyWork] = useState(false);
  // Checkbox states
  const [accession, setAccession] = useState(true);
  const [inspection, setInspection] = useState(true);
  const [installation, setInstallation] = useState(true);

  const [radioValue, setRadioValue] = useState("200");
  const [planValue, setPlanValue] = useState("3");
  const [planValueDisabled, setPlanValueDisabled] = useState(false);
  const [admin, setAdmin] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusProposta, setStatusProposta] = useState<Status>("Aguardando");

  const [user] = useAuthState(auth);
  // Localhost values
  const [_fipeData, setFipeData] = useLocalStorage<FIPE>("fipe", fipeDefault);
  const [fipe, setFipe] = useState(fipeDefault);

  // const [proposal, proposalLoading, proposalError] = useCollection(db.collection("proposal"), {});

  const addProposal = async (proposal: FormValues) => {
    try {
      setLoading(true);
      if (user && !id) {
        const id = v4();
        const today = moment();

        await Propostas().create(id, {
          createdBy: user.uid,
          createdAt: Timestamp.fromDate(today.toDate()),
          updatedAt: Timestamp.fromDate(today.toDate()),
          expiresIn: Timestamp.fromDate(today.add(5, "days").toDate()),
          fullName: capitalizeWords(proposal.fullName),
          cellPhone: proposal.cellPhone.replace(/[^0-9,]+/g, ""),
          email: proposal.email,
          licensePlate: proposal.licensePlate,
          brand: proposal.brand,
          model: proposal.model,
          year: proposal.year,
          fipe: Number(proposal.fipe),
          bodywork: Number(proposal.bodywork),
          protected: proposal.protected,
          discount: Number(proposal.discount),
          admin: Number(proposal.admin),
          theft: Number(proposal.theft),
          total: proposal.total,
          accession: proposal.accession,
          inspection: proposal.inspection,
          installation: proposal.installation,
          cotas: proposal.cotas,
        });
      }

      if (user && id) {
        const today = moment();

        const data = {
          createdBy: user.uid,
          updatedAt: Timestamp.fromDate(today.toDate()),
          expiresIn: Timestamp.fromDate(today.add(5, "days").toDate()),
          fullName: capitalizeWords(proposal.fullName),
          cellPhone: proposal.cellPhone.replace(/[^0-9,]+/g, ""),
          email: proposal.email,
          licensePlate: proposal.licensePlate,
          brand: proposal.brand,
          model: proposal.model,
          year: proposal.year,
          fipe: Number(proposal.fipe),
          bodywork: Number(proposal.bodywork),
          protected: proposal.protected,
          discount: Number(proposal.discount),
          admin: Number(proposal.admin),
          theft: Number(proposal.theft),
          total: proposal.total,
          accession: proposal.accession,
          inspection: proposal.inspection,
          installation: proposal.installation,
          cotas: proposal.cotas,
          status: "Iniciado",
        };

        await Propostas().update(id, data);

        if (statusProposta === "Aguardando") {
          const userByCode = await Users().getByCode(userCode);
          const userId = userByCode.docs[0].id;
          const wallet = userByCode.docs[0].data().wallet;
          await Users().update(userId, {
            wallet: wallet + 1,
          });
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const total = NP.plus(
    formik.values.admin,
    Number(formik.values.accession),
    Number(formik.values.inspection),
    Number(formik.values.installation),
    Number(formik.values.theft)
  );

  const cotaValueUnity = 21.16;

  const rateio = Number(formik.values.cotas) * cotaValueUnity;

  const mensal =
    Number(admin) +
    Number(formik.values.theft) +
    (planValue === "7" || planValue === "10" ? rateio / 2 : rateio);

  const openInNewTab = (): void => {
    if (Object.keys(formik.errors).length === 0) {
      const url = createLink(
        {
          admin: Number(admin),
          phone: formik.values.cellPhone.replace(/[^0-9,]+/g, ""),
          theft: parseInt(formik.values.theft),
          cota: Number(formik.values.cotas),
          total,
        },
        fipe
      );
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
  };

  // Get the brands os trucks
  useEffect(() => {
    fipeAPI
      .get(`caminhoes/marcas`)
      .then(({ data }: AxiosResponse<FipeApi[]>) => {
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
          setToastMessage({
            status: "error",
            description: e.message,
            title: "Consulta Tabela FIPE - Modelo",
            isClosable: true,
          });
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
          setToastMessage({
            status: "error",
            description: e.message,
            title: "Consulta Tabela FIPE - Ano",
            isClosable: true,
          });
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
          setFipeData(data);
          setFipe(data);
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
  }, [formik.values.year]);
  // Clear the bodywork value if bodywork switch is false
  useEffect(() => {
    if (!bodyWork) {
      formik.setFieldValue("bodywork", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyWork]);
  // Set the value o vehicle on field FIPE
  useEffect(() => {
    const fipeValue = formik.values.fipe;
    formik.setFieldValue("protected", currencyBRL(fipeValue).slice(3));
    formik.setFieldValue("cotas", NP.round(fipeValue / 10000, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.fipe]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const bodywork = Number(formik.values.bodywork ?? 0);
      const fipeValue = Number(formik.values.fipe);
      const total = NP.plus(bodywork, fipeValue);
      formik.setFieldValue("protected", currencyBRL(total).slice(3));
      formik.setFieldValue("cotas", NP.round(total / 10000, 0));
    }, 500);

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.bodywork]);

  useEffect(() => {
    formik.setFieldValue("theft", radioValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  useEffect(() => {
    const protectedValue =
      typeof formik.values.protected === "number"
        ? formik.values.protected
        : currencyToNumber(formik.values.protected);
    if (protectedValue < 100000) {
      setPlanValue("10");
      setPlanValueDisabled(true);
    }

    if (protectedValue && protectedValue > 100000) {
      setPlanValue("3");
      setPlanValueDisabled(false);
    }

    if (protectedValue && protectedValue > 0) {
      formik.setFieldValue("admin", NP.round(protectedValue * 0.0022, 2));
      setAdmin(NP.round(protectedValue * 0.0022, 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.protected]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const protectedValue = formik.values.protected;
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
    }, 500);

    return () => clearTimeout(timeOut);
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
    formik.setFieldValue("mensal", mensal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  useEffect(() => {
    if (planValue === "10") {
      formik.setFieldValue("discount", 50);
    }
    if (planValue === "7") {
      formik.setFieldValue("discount", 50);
    }
    if (planValue === "3") {
      formik.setFieldValue("discount", 30);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planValue]);

  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage]);

  useEffect(() => {
    if (id) {
      Propostas()
        .getById(id)
        .then((value) => {
          const proposta = value.data();
          if (proposta) {
            formik.setFieldValue("cellPhone", proposta.cellPhone ?? "");
            formik.setFieldValue("fullName", proposta.fullName ?? "");
            formik.setFieldValue("email", proposta.email ?? "");
            formik.setFieldValue("licensePlate", proposta.licensePlate ?? "");
            formik.setFieldValue("brand", proposta.brand ?? "");
            formik.setFieldValue("model", proposta.model ?? "");
            formik.setFieldValue("year", proposta.year ?? "");
            formik.setFieldValue("fipe", Number(proposta.fipe ?? 0));
            formik.setFieldValue("bodywork", Number(proposta.bodywork ?? 0));
            formik.setFieldValue("protected", proposta.protected ?? "");
            formik.setFieldValue("discount", Number(proposta.discount ?? 0));
            formik.setFieldValue("admin", Number(proposta.admin ?? 0));
            formik.setFieldValue("theft", Number(proposta.theft ?? 0));
            formik.setFieldValue("total", proposta.total ?? "");
            formik.setFieldValue("accession", proposta.accession ?? "");
            formik.setFieldValue("inspection", proposta.inspection ?? "");
            formik.setFieldValue("installation", proposta.installation ?? "");
            formik.setFieldValue("cotas", proposta.cotas ?? "");
            setUserCode(proposta.code ?? "");
            setLoading(false);
            setStatusProposta(proposta.status);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Text fontSize="xl" color={textColor} fontWeight="bold" textAlign="center" mb="22px">
        Proposta Comercial
      </Text>
      <form noValidate onSubmit={formik.handleSubmit}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
          <FormControl
            isRequired
            isInvalid={formik.touched.fullName && Boolean(formik.errors.fullName)}
            mb="24px"
          >
            <FormLabel htmlFor="fullName" ms="4px" fontSize="sm" fontWeight="normal">
              Nome
            </FormLabel>
            <Input
              id="fullName"
              fontSize="sm"
              ms="4px"
              size="lg"
              borderRadius="15px"
              type="text"
              placeholder="Seu nome completo"
              value={capitalizeWords(formik.values.fullName)}
              onChange={formik.handleChange}
            />
            <FormErrorMessage ms="4px">
              {formik.touched.fullName && formik.errors.fullName}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={formik.touched.cellPhone && Boolean(formik.errors.cellPhone)}
            mb="24px"
          >
            <FormLabel htmlFor="cellPhone" ms="4px" fontSize="sm" fontWeight="normal">
              Telefone
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
          <FormControl
            isRequired
            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
            mb="24px"
          >
            <FormLabel htmlFor="email" ms="4px" fontSize="sm" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              id="email"
              value={formik.values.email.toLowerCase()}
              onChange={formik.handleChange}
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="email"
              placeholder="Seu endereço de e-mail"
              size="lg"
            />
            <FormErrorMessage ms="4px">
              {formik.touched.email && formik.errors.email}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={formik.touched.licensePlate && Boolean(formik.errors.licensePlate)}
            mb="24px"
          >
            <FormLabel htmlFor="licensePlate" ms="4px" fontSize="sm" fontWeight="normal">
              Placa do Veículo
            </FormLabel>
            <Mask
              mask="aaa-9**9"
              value={formik.values.licensePlate.toUpperCase()}
              onChange={formik.handleChange}
            >
              {() => (
                <Input
                  id="licensePlate"
                  type="text"
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  placeholder="Placa do veículo"
                  size="lg"
                />
              )}
            </Mask>
            <FormErrorMessage ms="4px">
              {formik.touched.licensePlate && formik.errors.licensePlate}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Consulta Tabela FIPE
            </FormLabel>
            <Stack spacing={5} mb="24px">
              <Select
                id="brand"
                onChange={formik.handleChange}
                value={formik.values.brand}
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                size="lg"
                isRequired
                isInvalid={
                  (formik.touched.brand && Boolean(formik.errors.brand)) ||
                  formik.values.brand === ""
                }
              >
                <option defaultValue="">Selecione uma Marca</option>
                {fetchedBrands.map((brands, index) => (
                  <option value={brands.codigo} key={index}>
                    {brands.nome}
                  </option>
                ))}
                <FormErrorMessage ms="4px">
                  {formik.touched.brand && formik.errors.brand}
                </FormErrorMessage>
              </Select>
              <Select
                id="model"
                onChange={formik.handleChange}
                value={formik.values.model}
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                size="lg"
                isRequired
                isInvalid={
                  (formik.touched.model && Boolean(formik.errors.model)) ||
                  formik.values.model === ""
                }
              >
                <option defaultValue="">Selecione um Modelo</option>
                {fetchedModels.map((models, index) => (
                  <option value={models.codigo} key={index}>
                    {models.nome}
                  </option>
                ))}
                <FormErrorMessage ms="4px">
                  {formik.touched.model && formik.errors.model}
                </FormErrorMessage>
              </Select>
              <Select
                id="year"
                onChange={formik.handleChange}
                value={formik.values.year}
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                size="lg"
                isRequired
                isInvalid={
                  (formik.touched.year && Boolean(formik.errors.year)) || formik.values.year === ""
                }
              >
                <option defaultValue="">Selecione um Ano</option>
                {fetchedYears.map((years, index) => (
                  <option value={years.codigo} key={index}>
                    {years.nome === "32000" ? "Zero Km" : years.nome}
                  </option>
                ))}
                <FormErrorMessage ms="4px">
                  {formik.touched.year && formik.errors.year}
                </FormErrorMessage>
              </Select>
            </Stack>
          </FormControl>
          <FormControl
            isRequired
            isReadOnly
            isInvalid={formik.touched.fipe && Boolean(formik.errors.fipe)}
            mb="24px"
          >
            <FormLabel htmlFor="fipe" ms="4px" fontSize="sm" fontWeight="normal">
              Valor na Tabela FIPE
            </FormLabel>
            <InputGroup size="lg">
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
                id="fipe"
                fontSize="sm"
                borderRadius="15px"
                type="text"
                value={currencyBRL(formik.values.fipe).slice(3)}
              />
            </InputGroup>
            <FormErrorMessage ms="4px">
              {formik.touched.fipe && formik.errors.fipe}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <FormControl display="flex" alignItems="center" mb="24px">
          <Switch
            id="bodywork"
            colorScheme="teal"
            me="10px"
            isChecked={bodyWork}
            onChange={(e) => setBodyWork(e.target.checked)}
          />
          <FormLabel htmlFor="bodywork" mb="0" fontWeight="normal">
            Possui Implemento?
          </FormLabel>
        </FormControl>
        <Collapse in={bodyWork} animateOpacity>
          <FormControl>
            <FormLabel htmlFor="bodywork" ms="4px" fontSize="sm" fontWeight="normal">
              Valor do Agregado
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
              <NumberInput id="bodywork" precision={2} value={formik.values.bodywork}>
                <NumberInputField
                  fontSize="sm"
                  borderRightRadius="15px"
                  onChange={formik.handleChange}
                />
              </NumberInput>
            </InputGroup>
          </FormControl>
        </Collapse>
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
          <FormControl>
            <FormLabel htmlFor="protectedValue" ms="4px" fontSize="sm" fontWeight="normal">
              Valor Protegido
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
                id="protectedValue"
                fontSize="sm"
                borderRadius="15px"
                value={formik.values.protected}
                isReadOnly
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="admin" ms="4px" fontSize="sm" fontWeight="normal">
              Taxa Administrativa
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
              <Input id="admin" fontSize="sm" borderRadius="15px" value={admin} isReadOnly />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="discount" ms="4px" fontSize="sm" fontWeight="normal">
              Desconto
            </FormLabel>
            <InputGroup mb="24px" size="lg">
              <InputLeftAddon
                ms="4px"
                borderStartRadius="15px"
                bg="teal.300"
                fontSize="15px"
                color="white"
                fontWeight="bold"
              >
                %
              </InputLeftAddon>
              <NumberInput
                id="discount"
                step={1}
                min={0}
                max={100}
                width="100%"
                value={formik.values.discount}
                clampValueOnBlur={false}
              >
                <NumberInputField
                  fontSize="sm"
                  borderEndRadius="15px"
                  onChange={formik.handleChange}
                />
              </NumberInput>
              <FormErrorMessage ms="4px">
                {formik.touched.discount && formik.errors.discount}
              </FormErrorMessage>
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <FormControl display="flex" flexDir="column">
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Taxas
          </FormLabel>
          <Checkbox
            id="accession"
            colorScheme="teal"
            fontSize="sm"
            ms="4px"
            mb="12px"
            size="lg"
            value={formik.values.accession}
            isChecked={accession}
            onChange={(e) => setAccession(e.target.checked)}
          >
            Adesão
          </Checkbox>
          <Checkbox
            colorScheme="teal"
            fontSize="sm"
            ms="4px"
            mb="12px"
            size="lg"
            value={formik.values.inspection}
            isChecked={inspection}
            onChange={(e) => setInspection(e.target.checked)}
          >
            Vistoria
          </Checkbox>
          <Checkbox
            colorScheme="teal"
            fontSize="sm"
            ms="4px"
            mb="12px"
            size="lg"
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
            size="lg"
            ms="4px"
            colorScheme="teal"
          >
            <Radio value="200" mb="12px">
              Proteção Nacional
            </Radio>
            <Radio value="140" mb="24px">
              Proteção Norte e Nordeste
            </Radio>
          </RadioGroup>
        </FormControl>
        <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing="24px">
          <FormControl>
            <FormLabel htmlFor="total" ms="4px" fontSize="sm" fontWeight="normal">
              Total
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
                id="total"
                fontSize="sm"
                borderRadius="15px"
                value={Number.isNaN(formik.values.total) ? 0 : formik.values.total}
                isReadOnly
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="cotas" ms="4px" fontSize="sm" fontWeight="normal">
              Cotas
            </FormLabel>
            <Input
              id="cotas"
              mb="24px"
              size="lg"
              value={
                formik.values.discount >= 50
                  ? NP.round(formik.values.cotas / 2, 1)
                  : NP.round(formik.values.cotas, 1)
              }
              fontSize="sm"
              borderRadius="15px"
              isReadOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mensal" ms="4px" fontSize="sm" fontWeight="normal">
              Mensal
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
                id="mensal"
                value={
                  Number.isNaN(formik.values.mensal)
                    ? 0
                    : currencyBRL(NP.round(formik.values.mensal, 2)).slice(3)
                }
                fontSize="sm"
                borderRadius="15px"
                isReadOnly
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>
        <Button
          type="submit"
          bg="teal.300"
          fontSize="15px"
          color="white"
          fontWeight="bold"
          isLoading={loading}
          loadingText="Aguarde"
          w="100%"
          h="45"
          mb="24px"
          leftIcon={<CIoLogoWhatsapp />}
          /* onClick={() => openInNewTab()} */
          _hover={{
            bg: "teal.200",
          }}
          _active={{
            bg: "teal.400",
          }}
        >
          ENVIAR
        </Button>
      </form>
    </Flex>
  );
};

export default Handling;
