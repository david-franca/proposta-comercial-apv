import { FormikErrors } from "formik";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import { FormValues } from "../../../@types/interfaces";

interface InputFormProps {
  id: string;
  name: string;
  touched?: boolean;
  errors?: string;
  handleChange: (e: ChangeEvent<any>) => void;
  values: string | number;
  placeholder?: string;
  isRequired?: boolean;
  type?: HTMLInputTypeAttribute;
  addon?: string;
  isReadOnly?: boolean;
  step?: number;
  min?: number;
  max?: number;
  currency?: boolean;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const InputForm = (props: InputFormProps) => {
  return (
    <FormControl
      isRequired={props.isRequired}
      isReadOnly={props.isReadOnly}
      isInvalid={props.touched && Boolean(props.errors)}
      mb="24px"
    >
      <FormLabel htmlFor={props.id} ms="4px" fontSize="sm" fontWeight="normal">
        {props.name}
      </FormLabel>
      <InputGroup size="lg">
        {props.addon && (
          <InputLeftAddon
            ms="4px"
            borderRadius="15px"
            bg="teal.300"
            fontSize="15px"
            color="white"
            fontWeight="bold"
          >
            {props.addon}
          </InputLeftAddon>
        )}

        {props.type === "number" ? (
          <NumberInput
            id={props.id}
            step={props.step ?? 1}
            min={props.min ?? 0}
            max={props.max ?? 100}
            width="100%"
            value={props.values}
            clampValueOnBlur={false}
            onChange={(_val, num) => props.setFieldValue && props.setFieldValue(props.id, num)}
          >
            <NumberInputField
              borderRightRadius={props.isReadOnly ? "15px" : "10px"}
              borderLeftRadius={props.addon ? "initial" : "15px"}
              fontSize="sm"
              type="number"
            />
            {!props.isReadOnly && (
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            )}
          </NumberInput>
        ) : (
          <Input
            id={props.id}
            fontSize="sm"
            ms="4px"
            size="lg"
            borderRadius="15px"
            type={props.type}
            placeholder={props.placeholder}
            value={props.values}
            onChange={props.handleChange}
          />
        )}
      </InputGroup>
      <FormErrorMessage ms="4px">{props.touched && props.errors}</FormErrorMessage>
    </FormControl>
  );
};

export { InputForm };
