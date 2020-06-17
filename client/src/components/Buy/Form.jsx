import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";

import Authapi from "../auth/AuthApi";
import BounceLoader from "react-spinners/BounceLoader";

import axios from "axios";

export default function (props) {
  const { data } = useContext(Authapi);
  const [intialValues, setIntialValues] = useState({
    address: "",
    pincode: "",
    email: "",
    phn: ""
  });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (data.user !== undefined) {
      setIntialValues({
        address: data.user.address,
        pincode: data.user.pincode,
        email: data.user.email,
        phn: data.user.phn
      });
    }

  }, [data])

  const ValidationSchema = Yup.object({
    address: Yup.string()
      .required("Field required!")
      .min(10, "invalid Address"),
    email: Yup.string()
      .required("Field required!")
      .email(),
    pincode: Yup.string()
      .required("Field required!")
      .matches(/^[0-9]{6}$/, "invalid pincode"),
    phn: Yup.string()
      .required("Field required!")
      .matches(/^[0-9]{10}$/, "invalid phonenumber")
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: intialValues,
    validationSchema: ValidationSchema,
    onSubmit: values => {
      submit(values);
    }
  });



  const submit = values => {
    setLoad(true);
    props.setValue(values);
    axios.get("/user/sendmail")
      .then(function (response) {
        if (response.data.done) {
          props.next();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            multiline
            rows={4}
            required
            fullWidth
            name="address"
            {...formik.getFieldProps("address")}
            helperText={formik.touched.address && formik.errors.address}
            error={
              formik.touched.address && formik.errors.address !== undefined
            }
            label="Address"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="pincode"
            {...formik.getFieldProps("pincode")}
            helperText={formik.touched.pincode && formik.errors.pincode}
            error={
              formik.touched.pincode && formik.errors.pincode !== undefined
            }
            label="Pincode"
            type="number"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="email"
            {...formik.getFieldProps("email")}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && formik.errors.email !== undefined}
            label="Email"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="phn"
            {...formik.getFieldProps("phn")}
            helperText={formik.touched.phn && formik.errors.phn}
            error={formik.touched.phn && formik.errors.phn !== undefined}
            label="Mobile no."
            size="small"
            type="number"
          />
        </Grid>
      </Grid>
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ float: "right" }}
      >
        Next <BounceLoader size={15} color={"black"} loading={load} />
      </Button>
    </form>
  );
}
