import React from 'react';
import { Typography } from '@material-ui/core';
import FlexContainer from '../containers/FlexContainer';

export default function () {
  return (
    <FlexContainer withAppBar>
      <img src='../images/404.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='kfjngdf' />
      <Typography variant="h6">OOPS ! page you are looking for is not found !</Typography>
    </FlexContainer>
  );
}