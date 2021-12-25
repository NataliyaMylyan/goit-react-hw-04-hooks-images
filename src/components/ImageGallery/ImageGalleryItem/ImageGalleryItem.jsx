import React from "react";
import PropTypes from "prop-types";
import s from "./imageGalleryItem.module.css";

function ImageGalleryItem({
  image: { id, webformatURL, largeImageURL, tags },
  onClick,
}) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img
        className={s.ImageGalleryItemImage}
        id={id}
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
