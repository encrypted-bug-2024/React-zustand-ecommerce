import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { FormInputProps } from "./FormInputProps";

export const FormInputText = ({
  name,
  control,
  label,
  required,
  options,
  validation = {},
  type,
  helperText
}: FormInputProps) => {
  if (required && !validation.required) {
    validation.required = `The field is required`;
  }

  if (type === "email" && !validation.pattern) {
    validation.pattern = {
      // eslint-disable-next-line no-useless-escape
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter a valid email address"
    };
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error }
        }) => {
          return (
            <TextField
              inputRef={ref}
              helperText={error ? error.message : helperText}
              size="medium"
              error={!!error}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              fullWidth
              label={label}
              variant="standard"
              type={type}
              required={required}
            />
          );
        }}
        rules={validation}
      />
    </>
  );
};
