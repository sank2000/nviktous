import React from 'react';
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
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Container className={classes.root} maxWidth="lg">
      <ReactSlick
        {...settings}
      >
        {
          images.map((image, index) => {
            return (
              <ReactImageMagnify isHintEnabled={true} shouldHideHintAfterFirstActivation={true} shouldUsePositiveSpaceLens={true} enlargedImagePosition={'over'} key={index} {...{
                smallImage: {
                  alt: index,
                  width: 240,
                  height: 360,
                  src: image.small,
                },
                largeImage: {
                  src: image.large,
                  width: 1200,
                  height: 1800
                }
              }} />
            );
          })
        }
      </ReactSlick>
    </Container>
  )
}

export default ProductViewer;
