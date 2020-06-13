import React, { Fragment } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from 'react-slick';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import '../../assets/styles/Slick.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductViewer(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
    arrowButton: {
      padding: theme.spacing(1),
      borderRadius: '100%',
      backgroundColor: theme.palette.primary.main,
      color: '#fff'
    }
  }));

  const classes = useStyles();

  const images = props.images;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Fragment>
      <Container className={classes.root} maxWidth="lg">
        <ReactSlick style={{ textAlign: 'center' }}
          {...settings}
        >
          {
            images.map((image, index) => {
              return (
                <ReactImageMagnify imageStyle={{ display: 'inline-block' }} shouldUsePositiveSpaceLens={true} enlargedImagePosition={'over'} key={index} {...{
                  smallImage: {
                    alt: index.toString(),
                    width: 360,
                    height: 360,
                    src: image.small,
                  },
                  largeImage: {
                    src: image.large,
                    width: 1200,
                    height: 1200
                  }
                }} />
              );
            })
          }
        </ReactSlick>
      </Container>
    </Fragment>
  )
}

export default ProductViewer;
