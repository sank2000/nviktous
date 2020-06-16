import React, { useEffect, useState } from 'react';
import Footer from '../nav/Footer';
import ItemCard from '../cards/ItemCard';
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import FilterListIcon from "@material-ui/icons/FilterList";


import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";


import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FlexContainer from '../containers/FlexContainer';
import Typography from '@material-ui/core/Typography';
import SyncLoader from "react-spinners/SyncLoader";





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







const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

function Loading() {
  const theme = useTheme();
  return (
    <FlexContainer withAppBar>
      <SyncLoader
        size={25}
        margin={10}
        color={theme.palette.primary.main}
        loading={true}
      />
    </FlexContainer>
  );
}

function Empty() {
  return (
    <FlexContainer withAppBar>
      <img src='../images/emptyCart.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='kfjngdf' />
      <Typography variant="h2">No Items found !</Typography>
    </FlexContainer>
  );
}

export default ({ match }) => {

  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [ran, setRan] = useState({
    start: 500,
    end: 1000
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  function handleClick() {
    setOpen(old => !old);
  }

  function handleRange(e) {
    const { name, value } = e.target;
    setRan(old => {
      return {
        ...old,
        [name]: value
      };
    });
  }

  function handleApply() {
    setloading(true);
    if (value === "none") {
      handleClose();
      let prms = new URLSearchParams({ category: match.params.product });
      axios.post("/posts/full", prms)
        .then(function (response) {
          if (response.data.length !== 0) {
            setProduct(response.data);
          }
          else {
            setEmpty(true);
          }
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if (value === "range") {
      handleClose();
      let prms = new URLSearchParams({ category: match.params.product, start: ran.start, end: ran.end });
      axios.post("/posts/filter2", prms)
        .then(function (response) {
          if (response.data.length !== 0) {
            setProduct(response.data);
          }
          else {
            setEmpty(true);
          }
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      handleClose();
      let prms = new URLSearchParams({ category: match.params.product, order: value });
      axios.post("/posts/filter1", prms)
        .then(function (response) {
          if (response.data.length !== 0) {
            setProduct(response.data);
          }
          else {
            setEmpty(true);
          }
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }



  useEffect(() => {
    let prms = new URLSearchParams({ category: match.params.product });
    axios.post("/posts/full", prms)
      .then(function (response) {
        if (response.data.length !== 0) {
          setProduct(response.data);
        }
        else {
          setEmpty(true);
        }
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [match.params.product])



  return (
    <React.Fragment>
      {loading ? <Loading /> : empty ? <Empty /> :
        <>
          <Typography variant="h5" style={{ color: "#FF7315", display: "inline-block", marginTop: "30px", marginLeft: "20px" }} >{match.params.product.toUpperCase()}</Typography>
          <Fab color="primary" onClick={handleClick} style={{ position: "fixed", right: 0, marginTop: "10px", marginRight: "10px", zIndex: "20000" }}>
            <FilterListIcon />
          </Fab>
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {product.map((item) => (
                <Grid item key={item._id} xs={6} sm={4} md={3} lg={3}>
                  <ItemCard key={item._id} item={item} />
                </Grid>
              ))}
            </Grid>
          </Container>
          <Footer route={true} />
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              disableTypography
              id="customized-dialog-title"
              onClose={handleClose}
            >
              <Typography component="span" variant="h5">
                {" "}
            Filter{" "}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <FormControl variant="outlined" style={{ minWidth: 220 }}>
                <InputLabel>Price</InputLabel>
                <Select value={value} onChange={handleChange} label="Price">
                  <MenuItem value="none">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"asc"}>Low to High</MenuItem>
                  <MenuItem value={"desc"}>High to Low</MenuItem>
                  <MenuItem value={"range"}>Range</MenuItem>
                </Select>
              </FormControl>
              <br />
              {value === "range" && (
                <>
                  <TextField
                    name="start"
                    label="start"
                    variant="outlined"
                    type="number"
                    onChange={handleRange}
                    value={ran.start}
                    style={{ marginTop: "20px" }}
                  />
                  <br />
                  <TextField
                    name="end"
                    label="end"
                    variant="outlined"
                    type="number"
                    onChange={handleRange}
                    value={ran.end}
                    style={{ marginTop: "20px" }}
                  />
                  <br />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color='inherit' onClick={handleClose}>
                Cancel
              </Button>
              <Button
                disabled={
                  ran.end === ran.start || ran.end < ran.start || ran.start <= 0
                }
                variant="outlined"
                color="primary"
                onClick={handleApply}
              >
                Apply
          </Button>
            </DialogActions>
          </Dialog>
        </>}
    </React.Fragment>
  );
}