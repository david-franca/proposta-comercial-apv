import { AxiosError, AxiosResponse } from "axios";
import {
  Button,
  Checkbox,
  Combobox,
  EditIcon,
  Heading,
  IconButton,
  Label,
  Link,
  LinkIcon,
  Pane,
  Popover,
  Switch,
  Text,
  TextInputField,
  Tooltip,
} from "evergreen-ui";
import { useRouter } from "next/router";
import NP from "number-precision";
import { ChangeEvent, MouseEventHandler, SyntheticEvent, useEffect, useState } from "react";
import Mask from "react-input-mask";

import { FIPE, FipeApi, Models } from "../@types/interfaces";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { currencyBRL, currencyToNumber } from "../utils";
import { absoluteUrl } from "../utils/baseURL";
import { fipeAPI } from "../utils/fipe.utils";
import { handleError } from "../utils/handle.utils";

import type { GetServerSideProps, NextPage } from "next";
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

interface ServerProps {
  baseUrl?: string;
}

const Home: NextPage<ServerProps> = ({ baseUrl }) => {
  // Form States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [fipe, setFipe] = useState("0");
  const [admin, setAdmin] = useState("0");
  // Checkbox States
  const [accession, setAccession] = useState(true);
  const [theft, setTheft] = useState(true);
  const [inspection, setInspection] = useState(true);
  const [installation, setInstallation] = useState(true);
  // Selected value on combobox
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  // Combobox itens
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  // FIPE values
  const [fetchedBrands, setFetchedBrands] = useState<FipeApi[]>([]);
  const [fetchedModels, setFetchedModels] = useState<FipeApi[]>([]);
  const [fetchedYears, setFetchedYears] = useState<FipeApi[]>([]);
  // Loading states
  const [brandLoading, setBrandLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [yearLoading, setYearLoading] = useState(false);
  // Switch States
  const [discount, setDiscount] = useState(false);
  const [discountValue, setDiscountValue] = useState("0");
  const [bodyWork, setBodyWork] = useState(false);
  const [bodyWorkValue, setBodyWorkValue] = useState("0");
  // Values of tax
  const theftValue = theft ? 200 : 0;
  const inspectionValue = inspection ? 50 : 0;
  const installationValue = installation ? 170 : 0;
  const [accessionState, setAccessionState] = useState(600);
  const accessionValue = accessionState;
  // Others States
  const [adminDiscount, setAdminDiscount] = useState(0);
  const [protectedValue, setProtectedValue] = useState("0");
  const [cotas, setCotas] = useState(0);
  const [newValue, setNewValue] = useState(accessionState);
  const [_fipeData, setFipeData] = useLocalStorage<FIPE>("fipe", fipeDefault);

  const handleClick = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setPdfData(pdfDefault);
    if (typeof window !== "undefined") {
      window.open(`${baseUrl}/pdf`, "_blank");
    }
  };

  const filter = (name: string, array: FipeApi[]) => {
    let filter: string | number = "";
    array.forEach((value) => (value.nome === name ? (filter = value.codigo) : ""));
    return filter;
  };

  const createArray = (array: FipeApi[]) => {
    const value: string[] = [];
    array.forEach((data) => {
      if (data.nome === "32000") {
        data.nome = "Zero KM";
      }
      value.push(data.nome);
    });
    return value;
  };

  const dateLong = new Date().toLocaleDateString("pt-br", {
    dateStyle: "long",
  });

  const total = currencyBRL(
    NP.round(
      adminDiscount +
        theftValue +
        inspectionValue +
        installationValue +
        (accession ? accessionValue : 0),
      2
    )
  );

  const pdfDefault = {
    name: fullName,
    phone: phone,
    admin,
    total,
    cotas,
    discount: parseInt(discountValue),
    theft,
    inspection,
    installation,
    accession,
  };

  const [_pdfData, setPdfData] = useLocalStorage("pdf", pdfDefault);

  // Calculate Admin Tax with or without discount.
  useEffect(() => {
    if (discount && discountValue) {
      const adminTax = currencyToNumber(admin);
      const percentage = parseInt(discountValue) / 100;
      const d = adminTax - adminTax * percentage;
      setAdminDiscount(d);
    }
    if (!discount) {
      const adminTax = currencyToNumber(admin);
      const percentage = 0;
      const d = adminTax - adminTax * percentage;
      setDiscountValue("0");
      setAdminDiscount(d);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discount, discountValue]);
  // Clear the value of bodywork input if switch is off
  useEffect(() => {
    if (!bodyWork) {
      setProtectedValue(fipe);
      setBodyWorkValue("0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyWork]);
  // Get the brands os trucks
  useEffect(() => {
    setBrandLoading(true);
    fipeAPI
      .get(`caminhoes/marcas`)
      .then(({ data }: AxiosResponse<FipeApi[]>) => {
        setBrands(createArray(data));
        setFetchedBrands(data);
        setBrandLoading(false);
      })
      .catch((e: AxiosError) => {
        handleError(e);
        setBrandLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Get the models of trucks based on brand
  useEffect(() => {
    if (brand) {
      setModelLoading(true);
      fipeAPI
        .get(`caminhoes/marcas/${brand}/modelos`)
        .then(({ data }: AxiosResponse<Models>) => {
          setModels(createArray(data.modelos));
          setFetchedModels(data.modelos);
          setModelLoading(false);
        })
        .catch((e: AxiosError) => {
          handleError(e);
          setModelLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);
  // Get the year of the vehicle based on model and brand.
  useEffect(() => {
    if (model) {
      setYearLoading(true);
      fipeAPI
        .get(`caminhoes/marcas/${brand}/modelos/${model}/anos`)
        .then(({ data }: AxiosResponse<FipeApi[]>) => {
          setYears(createArray(data));
          setFetchedYears(data);
          setYearLoading(false);
        })
        .catch((e: AxiosError) => {
          handleError(e);
          setYearLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);
  // Get the FIPE values of all data.
  useEffect(() => {
    if (year) {
      fipeAPI
        .get(`caminhoes/marcas/${brand}/modelos/${model}/anos/${year}`)
        .then(({ data }: AxiosResponse<FIPE>) => {
          setFipe(data.Valor);
          setFipeData(data);
        })
        .catch((e: AxiosError) => {
          handleError(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);
  // When get the value of vehicle on the fipe table, set the variables
  useEffect(() => {
    if (fipe) {
      const fipeNumber = currencyToNumber(fipe);
      setAdmin(currencyBRL(NP.round(fipeNumber * 0.0022, 2)));
      setAdminDiscount(fipeNumber * 0.0022);
      setCotas(NP.round(currencyToNumber(fipe) / 10000, 0));
    }
  }, [fipe]);
  // Calculate the value of admin tax with fipe value and bodywork value
  useEffect(() => {
    const value = parseInt(bodyWorkValue);
    const fipeNumber = currencyToNumber(fipe);
    if (value && !Number.isNaN(value)) {
      setAdmin(currencyBRL(NP.round((fipeNumber + value) * 0.0022, 2)));
    } else if (bodyWork === false) {
      setAdmin(currencyBRL(NP.round(fipeNumber * 0.0022, 2)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyWorkValue]);
  // Add the value of bodywork with the vehicle fipe value
  useEffect(() => {
    const body = currencyToNumber(bodyWorkValue);
    const fipeValue = currencyToNumber(fipe);

    if (fipeValue && body) {
      setProtectedValue(currencyBRL(currencyToNumber(fipe) + currencyToNumber(bodyWorkValue)));
      setAdmin(currencyBRL(NP.round((fipeValue + body) * 0.0022, 2)));
      setAdminDiscount((fipeValue + body) * 0.0022);
    }
  }, [bodyWorkValue, fipe]);

  return (
    <Pane
      id="container"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      padding={0}
      margin={0}
    >
      <Pane>
        <Pane padding={20}>
          <Heading size={600}>Proposta Comercial - Proteção Veicular</Heading>
        </Pane>
        <Text paddingBottom={20}>Fortaleza - {dateLong}</Text>
        <Pane paddingY={10}>
          <TextInputField
            label="Nome Completo"
            required
            value={fullName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
          />
          <Mask
            mask="(99) 99999 9999"
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          >
            {() => <TextInputField id="cellPhone" required label="Telefone" type="tel" />}
          </Mask>
          <TextInputField
            label="E-mail"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <Mask
            mask="aaa-9**9"
            value={licensePlate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLicensePlate(e.target.value.toUpperCase())
            }
          >
            {() => (
              <TextInputField id="licensePlate" required label="Placa do Veículo" type="text" />
            )}
          </Mask>
        </Pane>
        <Pane>
          <Label>Consulta Tabela FIPE</Label>
          <Combobox
            items={brands}
            isLoading={brandLoading}
            placeholder="Marca do Veículo"
            onChange={(selected) => setBrand(filter(selected, fetchedBrands))}
            paddingY={10}
            width="100%"
          />
          <Combobox
            items={models}
            isLoading={modelLoading}
            placeholder="Modelo do Veículo"
            onChange={(selected) => setModel(filter(selected, fetchedModels))}
            paddingY={10}
            width="100%"
          />
          <Combobox
            items={years}
            isLoading={yearLoading}
            placeholder="Ano do Veículo"
            onChange={(selected) => setYear(filter(selected, fetchedYears))}
            paddingY={10}
            width="100%"
          />
          <TextInputField label="Valor na tabela FIPE" placeholder="R$ ..." value={fipe} readOnly />
          <Pane display="flex" flexDirection="row" paddingBottom={15}>
            <Label paddingRight={10}>Possui Implemento?</Label>
            <Switch
              checked={bodyWork}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBodyWork(e.target.checked)}
            />
          </Pane>
          <Pane hidden={!bodyWork}>
            <TextInputField
              placeholder="R$"
              label="Valor do Agregado"
              value={bodyWorkValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBodyWorkValue(e.target.value)}
            />
          </Pane>
          <TextInputField
            label="Valor Protegido"
            placeholder="R$ ..."
            value={protectedValue}
            readOnly
          />
          <TextInputField label="Taxa Administrativa" readOnly placeholder="R$ ..." value={admin} />
        </Pane>
        <Pane display="flex" flexDirection="row" paddingBottom={15}>
          <Label paddingRight={10}>Desconto?</Label>
          <Switch
            checked={discount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDiscount(e.target.checked)}
          />
        </Pane>
        <Pane hidden={!discount}>
          <TextInputField
            label="Percentagem"
            value={discountValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDiscountValue(e.target.value)}
          />
        </Pane>
        <Pane display="flex" flexDirection="column">
          <Pane display="flex" alignItems="center">
            <Checkbox
              paddingRight={5}
              checked={accession}
              onChange={(e) => setAccession(e.target.checked)}
              label={`Taxa de Adesão: ${currencyBRL(accessionValue)}`}
            />
            <Popover
              content={
                <Pane
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <TextInputField
                    type="number"
                    label="Novo Valor"
                    value={accessionState}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setAccessionState(parseInt(e.target.value))
                    }
                    min={50}
                    max={1000}
                  />
                </Pane>
              }
            >
              <Tooltip content="Editar">
                <IconButton icon={EditIcon} color="muted" border="none" />
              </Tooltip>
            </Popover>
          </Pane>
          <Pane>
            <Checkbox
              checked={theft}
              onChange={(e) => setTheft(e.target.checked)}
              label={`Proteção Roubo e Furto: R$ 200.00 `}
            />
          </Pane>
          <Checkbox
            checked={inspection}
            onChange={(e) => setInspection(e.target.checked)}
            label={`Taxa de Vistoria: R$ 50.00`}
          />
          <Checkbox
            checked={installation}
            onChange={(e) => setInstallation(e.target.checked)}
            label={`Instalação: R$ 170.00`}
          />
        </Pane>
        <Pane>
          <TextInputField label="Total" readOnly value={total} />
          <TextInputField
            label="Cotas"
            readOnly
            value={currencyToNumber(discountValue) === 50 ? cotas / 2 : cotas}
          />
        </Pane>
        <Pane paddingBottom={20} display="flex" justifyContent="space-evenly">
          <Button formTarget="_blank" onClick={handleClick}>
            Download PDF
          </Button>
          <Link
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=5585987884378&text=*Proteção%20Veicular%20Completa*%20%0a%0a%20*Veículo:*%20Caminhão%0a%20*Valor%20FIPE:*%20${fipe}%20%0a%20*Adesão:*%20${total}%20%0a%20*Mensalidade:*%20${admin}%20%0a%20*Estimativa%20de%20Rateio:*%20${currencyBRL(
              cotas * 20
            )}`}
            rel="noopener noreferrer"
          >
            Whatsapp
          </Link>
        </Pane>
      </Pane>
    </Pane>
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

export default Home;
