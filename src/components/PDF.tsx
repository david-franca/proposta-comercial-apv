import { Pane } from "evergreen-ui";

/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Font,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import numero from "numero-por-extenso";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { FIPE } from "../@types/interfaces";
import { currencyBRL, currencyToNumber } from "../utils";

const fonts = {
  regular: "Open Sans Regular",
  bold: "Open Sans Bold",
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  container: {
    margin: 10,
    padding: 10,
    display: "flex",
    alignItems: "center",
    fontSize: 11,
    fontFamily: fonts.regular,
  },
  image: {
    marginBottom: 10,
    width: 125,
  },
  date: {
    alignSelf: "flex-end",
    padding: 5,
  },
  title: {
    fontSize: 15,
    textDecoration: "underline",
    paddingVertical: 10,
    textTransform: "uppercase",
    fontFamily: fonts.bold,
  },
  background: {
    backgroundColor: "yellow",
  },
  subtitle: {
    textTransform: "uppercase",
    backgroundColor: "#3775ac",
    paddingVertical: 2,
  },
  bold: {
    fontFamily: fonts.bold,
  },
  regular: {
    fontFamily: fonts.regular,
  },
  row: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingVertical: 2,
    flexWrap: "wrap",
  },
  descriptions: {
    alignSelf: "flex-start",
    paddingVertical: 10,
  },
  content: {
    textTransform: "uppercase",
    alignSelf: "flex-start",
    paddingBottom: 10,
  },
  uppercase: {
    textTransform: "uppercase",
  },
  line: {
    width: "100%",
    height: 5,
    backgroundColor: "blue",
    marginBottom: 10,
  },
  footer: {
    flexShrink: 0,
  },
});

Font.register({
  family: fonts.bold,
  src: `/fonts/OpenSans-Bold.ttf`,
});

Font.register({
  family: fonts.regular,
  src: `/fonts/OpenSans-Regular.ttf`,
});

const dateLong = new Date().toLocaleDateString("pt-br", { dateStyle: "long" });

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

const pdfDefault = {
  accession: false,
  admin: "",
  cotas: 0,
  discount: 0,
  inspection: true,
  installation: true,
  name: "",
  phone: "",
  theft: true,
  total: "",
};

const PDF = () => {
  const [fipe] = useLocalStorage<FIPE>("fipe", fipeDefault);
  const [pdf] = useLocalStorage("pdf", pdfDefault);

  const proposal1 = numero.porExtenso(currencyToNumber(pdf.total), "monetario");
  const proposal2 = numero.porExtenso(
    currencyToNumber(pdf.total) - 200,
    "monetario"
  );
  const proposal3 = numero.porExtenso(1020, "monetario");
  const others = numero.porExtenso(300, "monetario");
  const value = numero.porExtenso(120, "monetario");

  return (
    <Pane height="100vh">
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" style={styles.page}>
            <View></View>
          </Page>
          <Page size="A4" style={styles.page}>
            <View id="container" style={styles.container}>
              <Image src="/images/logo.png" style={styles.image} />
              <View id="date" style={styles.date}>
                <Text>Fortaleza, {dateLong} </Text>
              </View>
              <View id="title">
                <Text style={styles.title}>
                  Proposta Comercial - Proteção Veicular
                </Text>
              </View>
              <View id="descriptions" style={styles.descriptions}>
                <View id="contract" style={styles.row}>
                  <Text style={styles.bold}>Contrato: </Text>
                  <Text>
                    Sr(a). {pdf.name} - {pdf.phone}
                  </Text>
                </View>
                <Text style={[styles.bold]}>
                  Prezado, segue abaixo nossa proposta:
                </Text>
              </View>
              <View id="vehicles" style={{ paddingVertical: 10 }}>
                <View id="model" style={[styles.row, styles.background]}>
                  <Text style={[styles.bold]}>Veículo: </Text>
                  <Text>{`${fipe.Marca} ${fipe.Modelo} ${fipe.AnoModelo}`}</Text>
                </View>
                <View
                  style={[
                    styles.row,
                    styles.background,
                    { alignSelf: "center" },
                  ]}
                >
                  <Text style={styles.bold}>Fipe: </Text>
                  <Text>{fipe.Valor}</Text>
                </View>
              </View>
              <View
                id="subtitle"
                style={{ paddingVertical: 10, alignSelf: "flex-start" }}
              >
                <Text style={[styles.bold, styles.subtitle]}>
                  Proposta 1 - Proteção Veicular Completa
                </Text>
              </View>
              <View id="services" style={[styles.bold, styles.content]}>
                <Text>Proteção contra acidente</Text>
                <Text>Proteção contra incêndio</Text>
                {pdf.theft ? <Text>Proteção contra roubo e furto</Text> : <></>}
                <Text>Diesel S10 a preço de custo</Text>
                <Text>Destombamento de veículo em caso de acidente</Text>
                <Text>Auxílio guincho com 300 km</Text>
                <Text>Auxílio parabrisa com cobertura de 70% do valor</Text>
                <Text>Auxílio danos corporais de até R$ 50.000,00</Text>
                <Text>Rastreamento veicular com monitoramento 24h</Text>
              </View>
              <View id="group1" style={[styles.content, styles.regular]}>
                <View>
                  <Text style={styles.bold}>Adesão (Já incluso 1º mês)</Text>
                  <Text>Taxa de adesão: R$ 600,00</Text>
                  <Text>
                    Taxa administrativa com proteção roubo e furto:{" "}
                    {currencyBRL(currencyToNumber(pdf.admin) + 200)}
                  </Text>
                  {pdf.discount > 0 ? (
                    <Text>
                      (Aplicado {pdf.discount}% de desconto na taxa
                      administrativa)
                    </Text>
                  ) : (
                    <></>
                  )}
                  <Text>Instalação do equipamento: R$ 170,00</Text>
                  <Text>Vistoria: R$ 50,00</Text>
                </View>
              </View>
              <View id="total" style={styles.row}>
                <Text>
                  <Text style={[styles.bold, styles.uppercase]}>
                    Valor total da adesão: {pdf.total}{" "}
                  </Text>
                  <Text style={{ marginRight: 15 }}>({proposal1})</Text>
                </Text>
              </View>
              <View style={[styles.row, { paddingVertical: 8 }]}>
                <Text style={[styles.bold, styles.uppercase]}>
                  Valor estimado para os meses seguintes
                </Text>
                <Text style={[styles.bold, styles.uppercase]}>
                  Taxa administrativa com proteção roubo e furto:{" "}
                  {currencyBRL(currencyToNumber(pdf.admin) + 200)}
                </Text>
                {pdf.discount > 0 ? (
                  <Text>
                    (Aplicado {pdf.discount}% de desconto na taxa
                    administrativa)
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.row}>
                <Text style={styles.uppercase}>
                  Estimativa de rateio com {pdf.cotas} cotas de participação:{" "}
                  {currencyBRL(pdf.cotas * 20)}{" "}
                </Text>
                <Text>(quando houver)</Text>
              </View>
              <View style={[styles.line, { marginTop: 90 }]}></View>
              <View style={styles.footer}>
                <Text>
                  Rua Guarani 58, Paupina. Fortaleza - CE, CEP 60.873-530, CNPJ
                  nº 12.460.490/0002-79
                </Text>
              </View>
            </View>
          </Page>
          <Page size="A4" style={styles.page}>
            <View id="container" style={styles.container}>
              <Image src="/images/logo.png" style={styles.image} />
              <View
                id="subtitle"
                style={{ paddingVertical: 10, alignSelf: "flex-start" }}
              >
                <Text style={[styles.bold, styles.subtitle]}>
                  Proposta 2 - Proteção Veicular para Acidente e Incêndio
                </Text>
              </View>
              <View id="services" style={[styles.bold, styles.content]}>
                <Text>Proteção contra acidente</Text>
                <Text>Proteção contra incêndio</Text>
                <Text>Diesel S10 a preço de custo</Text>
                <Text>Destombamento de veículo em caso de acidente</Text>
                <Text>Auxílio guincho com 300 km</Text>
                <Text>Auxílio parabrisa com cobertura de 70% do valor</Text>
                <Text>Auxílio danos corporais de até R$ 50.000,00</Text>
                <Text>Rastreamento veicular com monitoramento 24h</Text>
              </View>
              <View id="group1" style={[styles.content, styles.regular]}>
                <View>
                  <Text style={styles.bold}>Adesão (Já incluso 1º mês)</Text>
                  <Text>Taxa de adesão: R$ 600,00</Text>
                  <Text>Taxa administrativa: {pdf.admin}</Text>
                  <Text>
                    (Aplicado {pdf.discount}% de desconto na taxa
                    administrativa)
                  </Text>
                  <Text>Instalação do equipamento: R$ 170,00</Text>
                  <Text>Vistoria: R$ 50,00</Text>
                </View>
              </View>
              <View id="total" style={styles.row}>
                <Text>
                  <Text style={[styles.bold, styles.uppercase]}>
                    Valor total da adesão:{" "}
                    {currencyBRL(currencyToNumber(pdf.total) - 200)}{" "}
                  </Text>
                  <Text style={{ marginRight: 15 }}>({proposal2})</Text>
                </Text>
              </View>
              <View style={[styles.row, { paddingVertical: 8 }]}>
                <Text style={[styles.bold, styles.uppercase]}>
                  Valor estimado para os meses seguintes
                </Text>
                <Text style={[styles.bold, styles.uppercase]}>
                  Taxa administrativa com proteção roubo e furto: {pdf.admin}
                </Text>
                {pdf.discount > 0 ? (
                  <Text>
                    (Aplicado {pdf.discount}% de desconto na taxa
                    administrativa)
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.row}>
                <Text style={styles.uppercase}>
                  Estimativa de rateio com {pdf.cotas} cotas de participação:{" "}
                  {currencyBRL(pdf.cotas * 20)}{" "}
                </Text>
                <Text>(quando houver)</Text>
              </View>

              <View
                id="subtitle"
                style={{ paddingVertical: 10, alignSelf: "flex-start" }}
              >
                <Text style={[styles.bold, styles.subtitle]}>
                  Proposta 3 - Proteção Veicular Contra Roubo e Furto
                </Text>
              </View>
              <View id="services" style={[styles.bold, styles.content]}>
                <Text>Proteção contra roubo e furto</Text>
                <Text>Diesel S10 a preço de custo</Text>
                <Text>Rastreamento veicular com monitoramento 24h</Text>
              </View>
              <View id="group1" style={[styles.content, styles.regular]}>
                <View>
                  <Text style={styles.bold}>Adesão (Já incluso 1º mês)</Text>
                  <Text>Taxa de adesão: R$ 600,00</Text>
                  <Text>Proteção Roubo e Furto: R$ 200,00</Text>
                  <Text>Instalação do equipamento: R$ 170,00</Text>
                  <Text>Vistoria: R$ 50,00</Text>
                </View>
              </View>
              <View id="total" style={styles.row}>
                <Text>
                  <Text style={[styles.bold, styles.uppercase]}>
                    Valor total da adesão: R$ 1020,00{" "}
                  </Text>
                  <Text style={{ marginRight: 15 }}>({proposal3})</Text>
                </Text>
              </View>
              <View style={[styles.row, { paddingVertical: 8 }]}>
                <Text style={[styles.bold, styles.uppercase]}>
                  Valor estimado para os meses seguintes
                </Text>
                <Text style={[styles.bold, styles.uppercase]}>
                  Proteção roubo e furto: R$ 200,00
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.uppercase}>
                  Estimativa de rateio com {pdf.cotas} cotas de participação:{" "}
                  {currencyBRL(pdf.cotas * 20)}{" "}
                </Text>
                <Text>(quando houver)</Text>
              </View>
              <View style={[styles.line, { marginTop: 35 }]}></View>
              <View style={styles.footer}>
                <Text>
                  Rua Guarani 58, Paupina. Fortaleza - CE, CEP 60.873-530, CNPJ
                  nº 12.460.490/0002-79
                </Text>
              </View>
            </View>
          </Page>
          <Page size="A4" style={styles.page}>
            <View id="container" style={styles.container}>
              <Image src="/images/logo.png" style={styles.image} />
              <View id="title">
                <Text style={styles.title}>Outros</Text>
              </View>
              <View
                id="subtitle"
                style={{ paddingVertical: 10, alignSelf: "flex-start" }}
              >
                <Text style={[styles.bold, styles.subtitle]}>
                  Rastreamento Veicular
                </Text>
              </View>
              <View id="services" style={[styles.bold, styles.content]}>
                <Text>Rastreamento Veicular Via GPRS</Text>
                <Text>Diesel S10 a preço de custo</Text>
                <Text>Monitoramento 24h</Text>
                <Text>Auxílio Guincho</Text>
              </View>
              <View id="group1" style={[styles.descriptions, styles.regular]}>
                <Text>
                  <Text style={[styles.bold, styles.uppercase]}>
                    Adesão: R$ 300,00{" "}
                  </Text>
                  <Text style={{ marginRight: 15 }}>({others})</Text>
                </Text>
                <Text>(Inclusa instalação do equipamento)</Text>
              </View>
              <View id="group1" style={[styles.descriptions, styles.regular]}>
                <Text>
                  <Text style={[styles.bold, styles.uppercase]}>
                    Valor Mensal: R$ 120,00{" "}
                  </Text>
                  <Text style={{ marginRight: 15 }}>({value})</Text>
                </Text>
              </View>
              <View id="title">
                <Text style={styles.title}>Considerações</Text>
              </View>
              <View>
                <Text>
                  - Nenhuma das propostas incluem seguro contra terceiros, para
                  o mesmo, considerar o acréscimo de R$ 190,00 (
                  {numero.porExtenso(190, "monetario")}) para inclusão através
                  de parceiros;
                </Text>
                <Text>- Proposta com validade de 05 dias;</Text>
                <Text>- Valores atuais sujeitos a reajuste.</Text>
              </View>
              <View style={[styles.line, { marginTop: 315 }]}></View>
              <View style={styles.footer}>
                <Text>
                  Rua Guarani 58, Paupina. Fortaleza - CE, CEP 60.873-530, CNPJ
                  nº 12.460.490/0002-79
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Pane>
  );
};

export default PDF;
