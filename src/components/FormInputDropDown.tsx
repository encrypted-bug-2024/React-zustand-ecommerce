import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputDropDown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  required,
  options
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      name={name}
      rules={{ required: required ? required : false }}
      control={control}
      render={({
        field: { onChange, value, ref, onBlur },
        fieldState: { invalid, error }
      }) => {
        return (
          <FormControl required={required} error={invalid}>
            {/* <InputLabel>{label}</InputLabel> */}
            {/* <Select
              onChange={onChange}
              value={value}
              variant="outlined"
              inputRef={ref}
            >
              {generateSingleOptions()}
            </Select> */}

            <TextField
              inputRef={ref}
              helperText={error ? error.type : null}
              size="medium"
              select
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              variant="outlined"
              label={label}
            >
              {generateSingleOptions()}
            </TextField>
          </FormControl>
        );
      }}
    />
  );
};
