import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Authapi from "../auth/AuthApi";
import Sign from "../auth/SignIn";
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

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

export default function (props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [count, setCount] = useState(1);
  const [enable, setEnable] = useState(false);
  const [load, setLoad] = useState(false);
  const { data, setData } = useContext(Authapi);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDone = () => {
    setLoad(true);
    let prms = new URLSearchParams(
      {
        _id: props.data._id,
        size: value,
        count: count
      }
    );
    axios.post("/user/addCart", prms)
      .then(function (response) {
        setData({ ...data, user: response.data });
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
      });
  };

  function handleClick() {
    if (data.auth) {
      setShow(true);
    }
    else {
      setEnable(true);
    }
  }

  return (<>
    {props.ico ? <IconButton color="primary" onClick={handleClick}>
      <AddShoppingCartTwoToneIcon />
    </IconButton> : <Button onClick={handleClick} variant="outlined" color="primary" size="large" startIcon={<AddShoppingCartTwoToneIcon />}>
        Add to my cart
                </Button>}
    {enable && <Sign setState={setEnable} />}
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
              Add to card{" "}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginBottom: "20px" }}
          label="Count"
          type="number"
          fullWidth
          InputProps={{
            inputProps: {
              max: 10,
              min: 1
            }
          }}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          defaultValue="1"
          onChange={e => setCount(e.target.value)}
        />
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Size</FormLabel>
          <RadioGroup name="sizes" value={value} onChange={handleChange}>
            <Grid container spacing={1}>
              {props.data.size.map((value, ind) => {
                return <Grid item xs={6}>
                  <FormControlLabel key={ind} value={value} control={<Radio />} label={value} />
                </Grid>
              })}
            </Grid>
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
            </Button>
        <Button
          disabled={value === "" || count === "" || count <= "0"}
          variant="outlined"
          color="primary"
          onClick={handleDone}
        >
          Done <BounceLoader size={15} color={"blue"} loading={load} />
        </Button>
      </DialogActions>
    </Dialog>
  </ >
  );
}
