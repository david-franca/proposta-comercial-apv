import React, { ChangeEvent } from "react";
import TextMaskedInput, { Mask } from "react-text-mask";

import { Input } from "@chakra-ui/react";

export type MaskedInputProps = {
  htmlFor: string;
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  id: string;
  placeholder: string;
  errorMessage?: string | boolean;
  mask: Mask | ((value: string) => Mask);
  isRequired?: boolean;
  isInvalid?: boolean;
};

const MaskedInput = (props: MaskedInputProps) => {
  return (
    <Input
      as={TextMaskedInput}
      {...props}
      guide
      fontSize="sm"
      ms="4px"
      borderRadius="15px"
      type="text"
      size="lg"
    />
  );
};

export { MaskedInput };
