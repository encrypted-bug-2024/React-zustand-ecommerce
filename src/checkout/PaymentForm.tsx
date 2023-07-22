import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";

import { FormInputText } from "../components/FormInputText";
import { FormInputCheckbox } from "../components/FormInputCheckbox";
import { FormInputDropDown } from "../components/FormInputDropDown";

type FormValues = {
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
};

const defaultValues: FormValues = {
  cardName: "",
  cardNumber: "",
  expDate: "",
  cvv: ""
};

export default function PaymentForm() {
  const { handleSubmit, reset, control, setValue } = useForm<FormValues>({
    defaultValues: defaultValues
  });

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
    reset();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormInputText
            name="cardName"
            control={control}
            label="Name on card"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInputText
            name="cardNumber"
            control={control}
            label="Card number"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInputText
            name="expDate"
            control={control}
            label="Expiry date"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInputText
            name="cvv"
            control={control}
            label="CVV"
            required
            helperText="Last three digits on signature strip"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
