import { currencyBRL } from ".";

export const createLink = (config: {
  cotas: number;
  phone: string;
  admin: string;
  total: string;
  fipe: string;
}) => {
  const { cotas, phone, admin, total, fipe } = config;
  return `https://api.whatsapp.com/send?phone=55${phone}8&text=*Proteção%20Veicular%20Completa*%20%0a%0a%20*Veículo:*%20Caminhão%0a%20*Valor%20FIPE:*%20${fipe}%20%0a%20*Adesão:*%20${total}%20%0a%20*Mensalidade:*%20${admin}%20%0a%20*Estimativa%20de%20Rateio:*%20${currencyBRL(
    cotas * 20
  )}`;
};
