import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import TextField from "@material-ui/core/TextField";
import FacebookIcon from "@material-ui/icons/Facebook";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import BounceLoader from "react-spinners/BounceLoader";
import { useFormik } from "formik";
import * as Yup from "yup";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Slide from "@material-ui/core/Slide";

import { signin, signup } from "../../RouteAccess"

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
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


const intialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: ""
};
export default function (props) {
  const [inOpen, setinOpen] = useState(true);
  const [upOpen, setupOpen] = useState(false);
  const [btnUp, setBtnUp] = useState(false);
  const [btnIn, setBtnIn] = useState(false);
  const [btnF, setBtnF] = useState(false);
  const [btnG, setBtnG] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({
    content: "",
    type: "error"
  });
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [PassValues, setPassValues] = useState({
    password: "",
    showPassword: false
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const PassHandleChange = prop => event => {
    setPassValues({ ...PassValues, [prop]: event.target.value });
    handleChange(event);
  };

  const handleClickShowPassword = () => {
    setPassValues({ ...PassValues, showPassword: !PassValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  function handleChange(event) {
    const { value, name } = event.target;
    setUser(old => {
      return {
        ...old,
        [name]: value
      };
    });
  }

  const ValidationSchema = Yup.object({
    name: Yup.string()
      .required("Field required!")
      .min(3),
    email: Yup.string()
      .required("Field required!")
      .email(),
    password: Yup.string()
      .required("Field required!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, Letter, Number and Special Character"
      ),
    cpassword: Yup.string()
      .required("Field required !")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
  });

  const formik = useFormik({
    initialValues: intialValues,
    validationSchema: ValidationSchema,
    onSubmit: values => {
      submitSignUp(values);
    }
  });

  const SigninClose = () => {
    setinOpen(false);
    props.setState("");
  };

  const SigninOpen = () => {
    setinOpen(true);
  };

  const SignupClose = () => {
    setupOpen(false);
    props.setState("");
  };

  const SignupOpen = () => {
    setupOpen(true);
  };

  const submitSignIn = async (e) => {
    e.preventDefault();
    setBtnIn(true);
    const res = await signin(user);
    console.log(res.data);
    setBtnIn(false);
    if (res.data.auth) {
      window.open("/", "_self");
    }
    else {
      setMsg({
        content: res.data.message,
        type: "error"
      })
      setOpen(true);
    }
  };


  const submitSignUp = async (values) => {
    setBtnUp(true);
    const res = await signup(values);
    console.log(res.data);
    setBtnUp(false);
    if (res.data.auth) {
      window.open("/", "_self");
    }
    else {
      setMsg({
        content: res.data.message,
        type: "error"
      });
      setOpen(true);
    }
  };

  const withGoogle = async () => {
    setBtnG(true);
    window.location = "/auth/google"

  };

  const withFacebook = async () => {
    setBtnF(true);
    window.location = "/auth/facebook"
  };



  return (
    <>
      {/* <Button variant="contained" color="primary" onClick={SigninOpen}>
        Open
      </Button> */}
      <Dialog
        onClose={SigninClose}
        scroll="body"
        aria-labelledby="customized-dialog-title"
        open={inOpen}
        TransitionComponent={Transition}
      >
        <DialogTitle disableTypography onClose={SigninClose}>
          <Typography component="span" variant="h5">
            {" "}
            Sign In{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={submitSignIn}>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  name="email"
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth required={true}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={PassValues.showPassword ? "text" : "password"}
                    value={PassValues.password}
                    fullWidth
                    label="Password"
                    variant="standard"
                    required
                    name="password"
                    onChange={PassHandleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {PassValues.showPassword ? (
                            <Visibility />
                          ) : (
                              <VisibilityOff />
                            )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={100}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  type="submit"
                >
                  Sign In{" "}
                  <BounceLoader size={15} color={"black"} loading={btnIn} />
                </Button>
              </Grid>
              <Grid item xs={8} sm={4}>
                Became a new member ?{" "}
                <p
                  style={{
                    color: "blue",
                    display: "inline",
                    marginLeft: "25px"
                  }}
                  onClick={() => {
                    setinOpen(false);
                    SignupOpen();
                  }}
                >
                  Sign up
                </p>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                style={{ backgroundColor: '#cb3f22', color: "white" }}
                fullWidth
                onClick={withGoogle}
              >
                <BounceLoader size={15} color={"white"} loading={btnG} /> Sign in with
                &nbsp;
                <img
                  src="./images/google.png"
                  style={{ width: "18px", height: "18px" }}
                  alt=""
                />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={withFacebook}
                style={{ backgroundColor: "#3b5998", color: "white" }}
                endIcon={<FacebookIcon />}
              >
                <BounceLoader size={15} color={"white"} loading={btnF} />Sign in with
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={SignupClose}
        scroll="body"
        aria-labelledby="customized-dialog-title"
        open={upOpen}
      >
        <DialogTitle disableTypography onClose={SignupClose}>
          <Typography component="span" variant="h5">
            {" "}
            Sign Up{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
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
                  label="Name"
                  fullWidth
                  name="name"
                  {...formik.getFieldProps("name")}
                  helperText={formik.touched.name && formik.errors.name}
                  error={
                    formik.touched.name && formik.errors.name !== undefined
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  name="email"
                  {...formik.getFieldProps("email")}
                  helperText={formik.touched.email && formik.errors.email}
                  error={
                    formik.touched.email && formik.errors.email !== undefined
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  name="password"
                  {...formik.getFieldProps("password")}
                  helperText={formik.touched.password && formik.errors.password}
                  error={
                    formik.touched.password &&
                    formik.errors.password !== undefined
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confrim Password"
                  type="password"
                  fullWidth
                  name="cpassword"
                  {...formik.getFieldProps("cpassword")}
                  helperText={
                    formik.touched.cpassword && formik.errors.cpassword
                  }
                  error={
                    formik.touched.cpassword &&
                    formik.errors.cpassword !== undefined
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Sign Up <BounceLoader size={15} color={"black"} loading={btnUp} />
                </Button>
              </Grid>
              <Grid item xs={8} sm={4}>
                Already has a account ?{" "}
                <p
                  style={{
                    color: "blue",
                    display: "inline",
                    marginLeft: "25px"
                  }}
                  onClick={() => {
                    setupOpen(false);
                    SigninOpen();
                  }}
                >
                  Sign In
                </p>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{ backgroundColor: '#cb3f22', color: "white" }}
                onClick={withGoogle}
              >
                <BounceLoader size={15} color={"white"} loading={btnG} /> Sign Up with
                &nbsp;
                <img
                  src="./images/google.png"
                  style={{ width: "18px", height: "18px" }}
                  alt=""
                />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={withFacebook}
                style={{ backgroundColor: "#3b5998", color: "white" }}
                endIcon={<FacebookIcon />}
              >
                <BounceLoader size={15} color={"white"} loading={btnF} /> Sign Up with
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}

