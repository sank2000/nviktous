import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';

function CartFoot(props) {
  const theme = useTheme();

  const [detail, setDetail] = useState(props.detail);


  const useStyles = makeStyles({
    root: {
      position: 'fixed',
      left: '0',
      bottom: '0',
      width: '100%',
      backgroundColor: theme.palette.grey[200],
      padding: theme.spacing(2),
      textAlign: 'right'
    }
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h4">Grand Total</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4">{detail.price}</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CartFoot;
