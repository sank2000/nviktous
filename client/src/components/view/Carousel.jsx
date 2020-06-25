import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselImage from "./CarouselImage";

import "./Carousel.css";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/nviktous.appspot.com/o/images%2Fimg1.jpg?alt=media&token=ec7d0071-a35d-4989-8a24-c1dee13dc8570",
  "https://firebasestorage.googleapis.com/v0/b/nviktous.appspot.com/o/images%2Fimg2.jpg?alt=media&token=58bbc449-3cf1-443b-b77f-87f40533ace9",
  "https://firebasestorage.googleapis.com/v0/b/nviktous.appspot.com/o/images%2Fimg%203.jpg?alt=media&token=c0f5a978-b4e1-4aa8-9d2d-6094e7f813c8"
];

export default () => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    autoplay: true,
    swipeToSlide: true,
    adaptiveHeight: true
  };
  return (
    <div style={{ marginTop: "3px" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <CarouselImage src={image} key={index} />
        ))}
      </Slider>
    </div>
  );
};
