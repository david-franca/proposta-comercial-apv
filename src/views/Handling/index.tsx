import { AxiosError, AxiosResponse } from "axios";
import currency from "currency.js";
import { useFormik } from "formik";
import NP from "number-precision";
import { useEffect, useMemo, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import Mask from "react-input-mask";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";

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

import { FIPE, FipeApi, FormValues, Models, Status } from "../../@types/interfaces";
import { Propostas } from "../../firebase";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { capitalizeWords, currencyToNumber, fipeAPI } from "../../utils";
import { InputForm } from "./components/Input";
import { MaskedInputField } from "./components/MaskedInputField";
import { MoneyInputField } from "./components/MoneyInputField";

Yup.setLocale(ptForm);

const CIoLogoWhatsapp = chakra(IoLogoWhatsapp);

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
  theft: 200,
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
    bodyWork: Yup.number().optional(),
    protected: Yup.string().required(),
    discount: Yup.number().optional().max(100),
    theft: Yup.number().required(),
  });

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues,
    onSubmit: async (values) => {
      values.bodywork = currency(values.bodywork).value;
      values.fipe = currency(values.fipe).value;
      values.admin = currency(values.admin).value;
      values.total = currency(values.total).value;
      values.mensal = currency(values.mensal).value;
      console.log(values);
      // await addProposal(values);
    },
  });

  // FIPE values
  const [fetchedBrands, setFetchedBrands] = useState<FipeApi[]>([]);
  const [fetchedModels, setFetchedModels] = useState<FipeApi[]>([]);
  const [fetchedYears, setFetchedYears] = useState<FipeApi[]>([]);
  // Checkbox states
  const [accession, setAccession] = useState(true);
  const [inspection, setInspection] = useState(true);
  const [installation, setInstallation] = useState(true);

  const [radioValue, setRadioValue] = useState(200);
  const [planValue, setPlanValue] = useState("3");
  const [planValueDisabled, setPlanValueDisabled] = useState(false);
  const [admin, setAdmin] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusProposta, setStatusProposta] = useState<Status>("Aguardando");

  // Localhost values
  const [_fipeData, setFipeData] = useLocalStorage<FIPE>("fipe", fipeDefault);
  const [fipe, setFipe] = useState(fipeDefault);

  // const [proposal, proposalLoading, proposalError] = useCollection(db.collection("proposal"), {});

  /* const addProposal = async (proposal: FormValues) => {
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
          const userSnapshot = await Users().getByCode(userCode);
          console.log("userByCode", userSnapshot.size);
          userSnapshot.forEach(async (doc) => {
            console.log(doc.data());
            if (doc.exists()) {
              const userId = doc.id;
              const wallet = doc.data().wallet;
              console.log(userId, wallet);
              await Users().update(userId, {
                wallet: wallet + 1,
              });
            }
          });
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }; */

  const total = useMemo(
    () =>
      NP.plus(
        formik.values.admin,
        Number(formik.values.accession),
        Number(formik.values.inspection),
        Number(formik.values.installation),
        Number(formik.values.theft)
      ),
    [
      formik.values.accession,
      formik.values.admin,
      formik.values.inspection,
      formik.values.installation,
      formik.values.theft,
    ]
  );

  const cotaValueUnity = 21.16;

  const rateio = useMemo(() => Number(formik.values.cotas) * cotaValueUnity, [formik.values.cotas]);

  const mensal = useMemo(
    () =>
      Number(admin) +
      Number(formik.values.theft) +
      (planValue === "7" || planValue === "10" ? rateio / 2 : rateio),
    [admin, formik.values.theft, planValue, rateio]
  );

  /*   const openInNewTab = (): void => {
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
  }; */

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

  // Set the value o vehicle on field FIPE
  useEffect(() => {
    const fipeValue = formik.values.fipe;
    formik.setFieldValue("protected", fipeValue);
    formik.setFieldValue("cotas", NP.round(fipeValue / 10000, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.fipe]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const bodywork = formik.values.bodywork;
      const fipeValue = formik.values.fipe;
      const total = currency(bodywork).add(fipeValue).value;
      formik.setFieldValue("protected", total);
      formik.setFieldValue("cotas", NP.round(total / 10000, 0));
    }, 500);

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.bodywork]);

  useEffect(() => {
    console.log(radioValue);
    formik.setFieldValue("theft", radioValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  useEffect(() => {
    const protectedValue =
      typeof formik.values.protected === "number"
        ? formik.values.protected
        : currency(formik.values.protected).value;
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
      const adminValue = currency(protectedValue).multiply(0.0022).value;

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
          if (value.exists()) {
            const proposta = value.data();
            const head = String(proposta.cellPhone).substring(0, 2); // 85
            const body1 = String(proposta.cellPhone).substring(2, 7);
            const body2 = String(proposta.cellPhone).substring(7, 11);
            const cellPhone = `(${head}) ${body1} ${body2}`;

            formik.setFieldValue("cellPhone", cellPhone ?? "");
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
          <InputForm
            id="fullName"
            name="Nome"
            touched={formik.touched.fullName}
            errors={formik.errors.fullName}
            handleChange={formik.handleChange}
            values={capitalizeWords(formik.values.fullName)}
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
            value={formik.values.cellPhone}
            onChange={formik.handleChange}
            id="cellPhone"
            errorMessage={formik.touched.cellPhone && formik.errors.cellPhone}
            isInvalid={formik.touched.cellPhone && Boolean(formik.errors.cellPhone)}
            placeholder="(99) 99999 9999"
            isRequired
          />
          <InputForm
            id="email"
            name="Email"
            touched={formik.touched.email}
            errors={formik.errors.email}
            handleChange={formik.handleChange}
            values={formik.values.email.toLowerCase()}
            placeholder="Endereço de e-mail"
            isRequired
            type="email"
          />
          <MaskedInputField
            mask={[/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, "-", /\d/, /[a-zA-Z0-9]/, /\d/, /\d/]}
            name="Placa do Veículo"
            htmlFor="licensePlate"
            id="licensePlate"
            value={formik.values.licensePlate.toUpperCase()}
            onChange={formik.handleChange}
            placeholder="XXX-9999"
            errorMessage={formik.touched.licensePlate && formik.errors.licensePlate}
            isInvalid={formik.touched.licensePlate && Boolean(formik.errors.licensePlate)}
            isRequired
          />
        </SimpleGrid>

        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Consulta Tabela FIPE
            </FormLabel>
            <Stack spacing={7} mb="24px">
              <Select
                id="brand"
                onChange={formik.handleChange}
                value={formik.values.brand}
                fontSize="sm"
                borderRadius="15px"
                size="lg"
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
                borderRadius="15px"
                size="lg"
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
                borderRadius="15px"
                size="lg"
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
          <MoneyInputField
            id="fipe"
            name="Valor na Tabela FIPE"
            handleChange={formik.handleChange}
            values={formik.values.fipe}
            errorMessage={formik.touched.fipe && formik.errors.fipe}
            isInvalid={formik.touched.fipe && Boolean(formik.errors.fipe)}
            htmlFor="fipe"
            isRequired
            isReadOnly
          />
        </SimpleGrid>

        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
          <MoneyInputField
            id="bodywork"
            name="Valor do Agregado"
            handleChange={formik.handleChange}
            values={formik.values.bodywork}
            errorMessage={formik.touched.bodywork && formik.errors.bodywork}
            isInvalid={formik.touched.bodywork && Boolean(formik.errors.bodywork)}
            htmlFor="bodywork"
          />
        </SimpleGrid>

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
            handleChange={formik.handleChange}
            values={formik.values.protected}
            errorMessage={formik.touched.protected && formik.errors.protected}
            isInvalid={formik.touched.protected && Boolean(formik.errors.protected)}
            htmlFor="protectedValue"
            isReadOnly
          />
          <MoneyInputField
            id="admin"
            name="Taxa Administrativa"
            handleChange={formik.handleChange}
            values={formik.values.admin}
            errorMessage={formik.touched.admin && formik.errors.admin}
            isInvalid={formik.touched.admin && Boolean(formik.errors.admin)}
            htmlFor="admin"
            isReadOnly
          />
          <InputForm
            id="discount"
            name="Desconto"
            touched={formik.touched.discount}
            errors={formik.errors.discount}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            values={formik.values.discount}
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
            handleChange={formik.handleChange}
            values={formik.values.total}
            errorMessage={formik.touched.total && formik.errors.total}
            isInvalid={formik.touched.total && Boolean(formik.errors.total)}
            htmlFor="total"
            isReadOnly
          />
          <InputForm
            id="cotas"
            name="Cotas"
            touched={formik.touched.cotas}
            errors={formik.errors.cotas}
            handleChange={formik.handleChange}
            values={
              formik.values.discount >= 50
                ? NP.round(formik.values.cotas / 2, 1)
                : NP.round(formik.values.cotas, 1)
            }
            type="number"
            isReadOnly
          />
          <MoneyInputField
            id="mensal"
            name="Mensalidade"
            handleChange={formik.handleChange}
            values={formik.values.mensal}
            errorMessage={formik.touched.mensal && formik.errors.mensal}
            isInvalid={formik.touched.mensal && Boolean(formik.errors.mensal)}
            htmlFor="mensal"
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
