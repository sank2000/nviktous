import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ItemCard from '../cards/ItemCard';
import axios from "axios";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import "./Carousel.css";


export default (props) => {
  const [post, setPost] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let prms = new URLSearchParams({ category: props.product });
    axios.post("/posts/main", prms)
      .then(function (response) {
        setPost([...response.data]);
        setLoad(true);
        props.setLoad(old => ({
          ...old,
          [props.load]: true
        }))
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.product]);


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1
        }
      }
    ]

  };
  return (
    <div style={{ marginTop: "25px" }}>
      {load &&
        <>
          <Box display="flex" p={1}>
            <Box p={1} flexGrow={1}>
              <Typography variant="h5">{props.title}</Typography>
            </Box>
            <Box p={1}>
              <Button href={props.link} size="small" variant="contained" color="primary">
                Show more..
              </Button>
            </Box>
          </Box>
          <Slider {...settings}>
            {post.map((item) => {
              return <div key={item._id} >
                <ItemCard key={item._id} item={item} style={{
                  margin: "10px"
                }} />
              </div>
            })}
          </Slider>
        </>
      }
    </div>
  );
};
