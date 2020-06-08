import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

function FlexContainer(props) {
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary
    },
  });

  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        minHeight: props.height || (props.withAppBar && 'calc(100vh - 4.2rem - 5px)') || '100vh',
        maxHeight: props.maxHeight || '100%',
        padding: '10px',
        overflow: 'hidden',
      }}
      {...props.outer}
    >
      <div
        className="inner-flex-container"
        style={{
          display: "block",
          alignItems: "center",
          textAlign: "center"
        }}
        {...props.inner}
      >
        {props.children}
      </div>
    </div >
  );
}

export default FlexContainer;
