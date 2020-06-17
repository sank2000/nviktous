import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'

import axios from "axios";


import Form from "./Form";

import Otp from "./OTP";

import Payment from "./Payment";

import Authapi from "../auth/AuthApi";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const useStyles = makeStyles(theme => ({
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

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

function getSteps() {
  return ["Details", "OTP", "Payment"];
}

export default function App(props) {
  const [show, setShow] = useState(true);
  const { data, setData } = useContext(Authapi);

  const [value, setValue] = useState({});

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = React.useState(false);
  const steps = getSteps();

  function submit(pay) {
    const address = JSON.stringify(value);
    const product = JSON.stringify(props.data.detail);
    const ItemD = JSON.stringify(props.data.value);
    const payment = JSON.stringify(pay);
    let prms = new URLSearchParams(
      {
        address,
        product,
        ItemD,
        payment
      });
    axios.post("/user/buy", prms)
      .then(function (response) {
        setOpen(true);
        setData({ ...data, user: response.data });
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleCloseA = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleClose = () => {
    setShow(false);
    props.setState("");
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Form next={handleNext} setValue={setValue} />;
      case 1:
        return <Otp next={handleNext} prev={handleBack} />;
      case 2:
        return <Payment submit={submit} />;
      default:
        return "Unknown Action";
    }
  }

  return (
    <>
      <div className={classes.root}>
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
            confrim{" "}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>{getStepContent(activeStep)}</div>
          </DialogContent>
        </Dialog>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseA}>
        <Alert onClose={handleCloseA} severity="success">
          Order Placed Successfully !!
        </Alert>
      </Snackbar>
    </>
  );
}
