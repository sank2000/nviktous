import React from "react";
import Container from "@material-ui/core/Container";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import RowingIcon from "@material-ui/icons/Rowing";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

import Tooltip from '@material-ui/core/Tooltip';
import DateFormat from 'dateformat';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

function Ava(props) {
  return (
    <div>
      <Avatar style={(props.ind <= props.len) ? { backgroundColor: "green", border: "4px solid white" } : { backgroundColor: "black", border: "4px solid white" }}>
        {props.ico}
      </Avatar>
      <br />
      {props.ind <= props.len ? <Tooltip placement="bottom" title={DateFormat((new Date(props.status[props.ind - 1].date)), "d-mmm-yyyy")}>
        <p style={{
          color: "#fff", display: "inline",
          backgroundColor: "green",
          padding: "3px 5px",
          borderRadius: '150px'
        }}>{props.title}</p>
      </Tooltip> : <p style={{ display: "inline" }}>{props.title}</p>}
    </div>
  );
}

function tab(props, ind) {
  return (
    <StyledTableRow key={ind}>
      <StyledTableCell align="center"> {props.name}</StyledTableCell>
      <StyledTableCell align="center"> {props.size} </StyledTableCell>
      <StyledTableCell align="center"> {props.count} </StyledTableCell>
      <StyledTableCell align="center"> {props.price} </StyledTableCell>
    </StyledTableRow>
  );
}

function Details(props) {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Size</StyledTableCell>
            <StyledTableCell align="center">Count</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.items.map(tab)}
          <StyledTableRow>
            <StyledTableCell rowSpan={3} />
            <StyledTableCell colSpan={2}>Toatl Price</StyledTableCell>
            <StyledTableCell align="right">{props.total}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default (props) => {
  return (
    <Paper elevation={3} style={{ marginBottom: "25px", marginTop: "25px" }}>
      <Grid container spacing={1}>
        <Grid item style={{ marginLeft: "10px" }}>
          <h3>Order no : <span style={{ color: "grey" }}>{props.id} </span> </h3>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: "20px" }}>
          <Typography variant="h6">Status</Typography>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="xl" style={{ position: "relative" }}>
            <hr
              style={{
                border: "0.5px solid #303030",
                position: "absolute",
                width: "80%",
                left: "10%",
                top: "5%"
              }}
            />
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ textAlign: "center" }}
            >
              <Grid item style={{ flexShrink: "3" }}>
                <Ava ico={<DoneOutlineIcon />} title={"Ordered"} ind={1} len={props.status.length} status={props.status} />
              </Grid>
              <Grid item>
                <Ava ico={<LocalMallIcon />} title={"Packed"} ind={2} len={props.status.length} status={props.status} />
              </Grid>
              <Grid item>
                <Ava ico={<RowingIcon />} title={"Shipped"} ind={3} len={props.status.length} status={props.status} />{" "}
              </Grid>
              <Grid item>
                <Ava
                  ico={<LocalShippingIcon />}
                  title={"Delivery"}
                  ind={4}
                  len={props.status.length}
                  status={props.status}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <hr style={{
                  border: "0.3px solid grey"
                }} />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
                <Typography variant="h6">Details</Typography>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
                <Details total={props.price} items={props.items} />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Paper>
  );
};
