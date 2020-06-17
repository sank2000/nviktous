import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" align="center" style={{
      backgroundColor: "#212529", color: "white", padding: '15px 0'
    }}>
      {'Copyright © '}
      < Link color="inherit" href="#" >
        NVIKTOUS
      </Link> {' '}
      {new Date().getFullYear()}
      {'.'}
    </ Typography>
  );
}
