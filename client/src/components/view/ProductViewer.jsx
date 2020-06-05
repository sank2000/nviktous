import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

function ProductViewer() {
  return (
    <ReactImageMagnify {...{
      smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        width: 240,
        height: 360,
        src: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
      },
      largeImage: {
        src: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80',
        width: 1200,
        height: 1800
      }
    }} />
  )
}

export default ProductViewer;
