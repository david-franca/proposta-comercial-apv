import { ChangeEventHandler, ReactChild, ReactFragment, ReactPortal, useEffect } from "react";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import { MoneyInput } from "./MoneyInput";

const MoneyInputField = (props: {
  isRequired?: boolean;
  isInvalid?: boolean;
  htmlFor: string;
  name: string;
  values: number;
  id: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errorMessage?: boolean | string;
  isReadOnly?: boolean;
}) => {
  return (
    <FormControl isRequired={props.isRequired} isInvalid={props.isInvalid} mb="24px">
      <FormLabel htmlFor={props.htmlFor} ms="4px" fontSize="sm" fontWeight="normal">
        {props.name}
      </FormLabel>
      <InputGroup size="lg">
        <InputLeftAddon
          ms="4px"
          borderRadius="15px"
          bg="teal.300"
          fontSize="15px"
          color="white"
          fontWeight="bold"
        >
          R$
        </InputLeftAddon>
        <MoneyInput
          value={props.values}
          id={props.id}
          onChange={props.handleChange}
          isReadOnly={props.isReadOnly}
        />
      </InputGroup>
      <FormErrorMessage ms="4px">{props.errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export { MoneyInputField };
