import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(6, 0, 6),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroButtons: {
    margin: theme.spacing(4),
  }
}));

function Product(props) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
              Item Name
            </Typography>
            <Typography variant="h5" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <div className={classes.heroButtons}>
              <Grid container direction={theme.breakpoints.up('sm') ? 'row' : 'column'} spacing={2} justify="center">
                <Grid item md={12} xs={6}>
                  <Button variant="outlined" color="primary" size="large" fullWidth startIcon={<AddShoppingCartTwoToneIcon />}>
                    Add to my cart
                  </Button>
                </Grid>
                <Grid item md={12} xs={6}>
                  <Button variant="outlined" color="secondary" size="large" fullWidth startIcon={<FavoriteTwoToneIcon />}>
                    Add to Favorites
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Product;
