import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInputText } from "../components/FormInputText";
import { FormInputCheckbox } from "../components/FormInputCheckbox";
import { FormInputDropDown } from "../components/FormInputDropDown";

type FormValues = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
};

const options = [
  {
    label: "Dropdown Option 1",
    value: "1"
  },
  {
    label: "Dropdown Option 2",
    value: "2"
  }
];

const defaultValues: FormValues = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postcode: "",
  country: ""
};

export default function AddressForm() {
  const { handleSubmit, reset, control, setValue } = useForm<FormValues>({
    defaultValues: defaultValues
  });

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
    reset();
    // data.id = patients.length + 1;
    // setPatients((prevState: any) => [...prevState, data]);
    // handleClose();
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormInputText
            name="firstName"
            control={control}
            label="First Name"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText
            name="lastName"
            control={control}
            label="Last Name"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="address1"
            control={control}
            label="Address Line 1"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="address2"
            control={control}
            label="Address Line 2"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormInputText name="city" control={control} label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText name="state" control={control} label="State" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText name="postcode" control={control} label="Postcode" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText name="country" control={control} label="Country" />
        </Grid>

        <Grid item xs={12}>
          <FormGroup row>
            <FormInputCheckbox
              control={control}
              setValue={setValue}
              name={"billingAddress"}
              label={"Use this address for payment details"}
              required
            />
          </FormGroup>
        </Grid>
      </Grid>
    </>
  );
}
