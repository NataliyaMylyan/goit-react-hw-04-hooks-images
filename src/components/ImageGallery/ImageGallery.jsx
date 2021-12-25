import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem.jsx";
import s from "./imageGallery.module.css";

function ImageGallery({ gallery, onClick }) {
  return (
    <ul className={s.ImageGallery}>
      {gallery.map((item) => (
        <ImageGalleryItem key={item.id} image={item} onClick={onClick} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
