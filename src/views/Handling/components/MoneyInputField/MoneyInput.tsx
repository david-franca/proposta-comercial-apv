import currency from "currency.js";
import React, { useEffect } from "react";
import NumberFormat, { NumberFormatProps, NumberFormatValues } from "react-number-format";

import { Input } from "@chakra-ui/react";

export type MoneyInputProps = NumberFormatProps & {
  value: number;
  isReadOnly?: boolean;
};

const MoneyInput = ({ value, isReadOnly, ...props }: MoneyInputProps) => {
  const formatProps = {
    thousandSeparator: ",",
    decimalSeparator: ".",
    decimalScale: 2,
    fixedDecimalScale: true,
    placeholder: "0.00",
  };

  return (
    <Input
      as={NumberFormat}
      id={props.id}
      {...formatProps}
      fontSize="sm"
      isReadOnly={isReadOnly}
      variant="filled"
      ms="4px"
      size="lg"
      borderRightRadius="15px"
      value={value ? currency(value, { precision: 10 }).value : 0}
      onChange={props.onChange}
      allowNegative={false}
      isAllowed={({ floatValue }: NumberFormatValues) => {
        if (!floatValue) {
          return true;
        }
        return floatValue >= 0 && floatValue <= 999999999999.99;
      }}
    />
  );
};

export { MoneyInput };
