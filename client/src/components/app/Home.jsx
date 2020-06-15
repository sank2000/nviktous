import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTheme } from '@material-ui/core/styles';

import ShowCase from '../view/Carousel';
import Footer from '../nav/Footer';


import FlexContainer from '../containers/FlexContainer';
import SyncLoader from "react-spinners/SyncLoader";


import ShowCase2 from '../view/ProductCarousel';

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


export default function Home() {
  const [load, setLoad] = useState({
    one: false,
    two: false,
    three: false
  });


  return (
    <React.Fragment>
      <CssBaseline />
      <ShowCase />
      <ShowCase2 title="Mens" product='mens apparel' setLoad={setLoad} load='one' link="/category/mens apparel" />
      <ShowCase2 title="Womens" product='womens apparel' setLoad={setLoad} load='two' link="/category/womens apparel" />
      <ShowCase2 title="Kids" product='kids apparel' setLoad={setLoad} load='three' link="/category/kids apparel" />
      {load.one && load.two && load.three ? <Footer /> : <Loading />}
    </React.Fragment>
  );
}
