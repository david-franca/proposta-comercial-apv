export const currencyToNumber = (value: string) => {
  return parseFloat(value.replace(/[^0-9\-,]+/g, "").replace(/,/g, "."));
};

export const currencyBRL = (value: number | string) => {
  let val: number = 0;
  val = typeof value === "string" ? parseFloat(value) : value;
  return val.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
