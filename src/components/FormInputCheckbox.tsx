import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputCheckbox: React.FC<FormInputProps> = ({
  name,
  control,
  setValue,
  label,
  required,
  validation = {}
}) => {
  if (required && !validation.required) {
    validation.required = `${name} is required`;
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { onChange, value, ref },
        fieldState: { invalid, error },
        formState: { errors }
      }) => {
        const parsedHelperText = error && error.message;
        return (
          <FormControl required={required} error={invalid}>
            <FormControlLabel
              label={label || ""}
              inputRef={ref}
              control={
                <Checkbox
                  color="primary"
                  sx={{
                    color: invalid ? "error.main" : undefined
                  }}
                  value={value}
                  checked={!!value}
                  onChange={() => {
                    onChange(!value);
                  }}
                />
              }
            />

            <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
