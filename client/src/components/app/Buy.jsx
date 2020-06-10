import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";

import Grid from "@material-ui/core/Grid";
import BounceLoader from "react-spinners/BounceLoader";
import Authapi from "../auth/AuthApi";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#ff1a1a"
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);


export default function Buy(props) {
  const { data, setData } = useContext(Authapi);
  const [show, setShow] = useState(true);
  const [intialValues, setIntialValues] = useState({
    address: "",
    pincode: "",
    email: "",
    phn: ""
  });


  const handleClose = () => {
    setShow(false);
    props.setState("");
  };


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

  function handleSubmit(values) {
    const address = JSON.stringify(values);
    const product = JSON.stringify(props.data.detail);
    const ItemD = JSON.stringify(props.data.value);
    let prms = new URLSearchParams(
      {
        address,
        product,
        ItemD
      });
    axios.post("/user/buy", prms)
      .then(function (response) {
        console.log(response.data);
        setData({ ...data, user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: intialValues,
    validationSchema: ValidationSchema,
    onSubmit: values => {
      handleSubmit(values);
    }
  });

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

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={show}
      >
        <DialogTitle
          disableTypography
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography component="span" variant="h5">
            {" "}
            Details{" "}
          </Typography>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
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
                    formik.touched.address &&
                    formik.errors.address !== undefined
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
                    formik.touched.pincode &&
                    formik.errors.pincode !== undefined
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
                  error={
                    formik.touched.email && formik.errors.email !== undefined
                  }
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
          </DialogContent>
          <DialogActions>
            <hr />
            <Button variant="contained" color="primary" type="submit">
              Confrim Order{" "}
              <BounceLoader size={15} color={"black"} loading={true} />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
