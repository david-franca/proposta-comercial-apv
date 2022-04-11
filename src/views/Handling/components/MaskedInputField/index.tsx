import React, { ChangeEvent } from "react";
import { Mask } from "react-text-mask";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

import { MaskedInput } from "./MaskedInput";

export type MaskedInputProps = {
  name: string;
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

const MaskedInputField = (props: MaskedInputProps) => {
  return (
    <FormControl isRequired={props.isRequired} isInvalid={props.isInvalid} mb="24px">
      <FormLabel htmlFor={props.htmlFor} ms="4px" fontSize="sm" fontWeight="normal">
        {props.name}
      </FormLabel>
      <MaskedInput
        mask={props.mask}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        htmlFor={props.htmlFor}
        id={props.id}
      />
      <FormErrorMessage ms="4px">{props.errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export { MaskedInputField };
