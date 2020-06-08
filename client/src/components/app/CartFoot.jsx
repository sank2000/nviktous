import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';

function CartFoot(props) {
  const theme = useTheme();
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
    <Container maxWidth="md" className={classes.root}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h4">Grand Total</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h4">$500</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartFoot;
