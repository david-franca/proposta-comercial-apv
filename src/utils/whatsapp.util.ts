import { FIPE } from "../@types/interfaces";
import { currencyBRL } from "./currency.utils";

export const createLink = (
  config: {
    phone: string;
    admin: number;
    theft: number;
    cota: number;
    total: number;
  },
  fipe: FIPE
) => {
  const { phone, admin, theft, cota, total } = config;
  const space = "%20";
  const breakLine = "%0a";
  const model = [
    "🚛APV TRUCK🚛",
    "",
    "*Proteção total do seu veículo* 🚛🚚🚛🚚",
    "✅ Roubo 🔫",
    "✅ Furto ✋🤚",
    "✅ Colisão 🚗💥🚙",
    "✅ Incêndio🔥",
    "✅ Destombamento 100%",
    "✅ Guincho em caso de acidente 💥🚛 ILIMITADO ",
    "✅ Guincho em caso de pane elétrica ou mecânica de 300km total",
    "✅ Auxílio para-brisa ",
    "✅ Auxílio danos corporais até 50mil (até 03 pessoas)",
    "✅ Auxílio Despesas médicas, hospitalares e odontológicas de até 10 mil ",
    "✅ Auxílio alimentação e funeral  por morte acidental até 5 mil",
    "✅ Cobertura de até 200 mil para terceiros (a contratar) ",
    "✅ Assistência 24 horas em todo território nacional 📞🔧🇧🇷 ",
    "✅ Sem perfil de condutor 👩🏻👨🏻",
    "✅ Localizador sem custo na mensalidade",
    "",
    `${fipe.Marca} ${fipe.Modelo} ${fipe.AnoModelo}`,
    `FIPE: ${fipe.Valor}`,
    "",
    "➡️ MENSALIDADE:",
    currencyBRL(admin + theft + cota * 21.16),
    "",
    "➡️Taxa de associação:",
    `${currencyBRL(total)}, já incluso a primeira mensalidade.`,
    "",
    "Proposta válida por 5 dias",
  ];

  const result = model.map((data) => data.replace(/\s/g, space)).join(breakLine);
  return `https://api.whatsapp.com/send?phone=55${phone}&text=${result}`;
};
