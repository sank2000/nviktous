import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import BounceLoader from "react-spinners/BounceLoader";

import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function (props) {
  const [otp, setOtp] = useState();
  const [load, setLoad] = useState(false);
  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function handleSubmit() {
    setLoad(true);
    console.log(otp);
    let prms = new URLSearchParams(
      {
        OTP: otp
      });
    axios.post("/user/verify", prms)
      .then(function (response) {
        if (response.data.verified) {
          props.next();
        }
        else {
          setOpen(true);
        }
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <h4 style={{ textAlign: "center" }}>Check your Email!</h4>
      <p style={{ textAlign: "center" }}>
        We've sent you an email. Copy the OTP from there.
      </p>
      <TextField
        variant="outlined"
        required
        fullWidth
        name="otp"
        onChange={e => setOtp(e.target.value)}
        label="OTP"
        type="number"
        size="small"
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ float: "right" }}>
        {" "}
        Next{" "} <BounceLoader size={15} color={"black"} loading={load} />
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please enter correct otp !
        </Alert>
      </Snackbar>
    </>
  );
}
