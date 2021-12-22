export const currencyToNumber = (value: string) => {
  return parseFloat(value.replace(/[^0-9\-,]+/g, "").replace(/,/g, "."));
};

export const currencyBRL = (value: number) => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
