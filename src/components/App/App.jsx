import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "../Searchbar/Searchbar.jsx";
import api from "../../api/api.js";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import Loader from "../Loader/Loader.jsx";
import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";
import s from "./app.module.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState("");

  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    async function fetchImagesGallery() {
      try {
        const { hits } = await api.fetchImages(searchQuery, currentPage);
        setGallery((prevGallery) => [...prevGallery, ...hits]);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchImagesGallery();
  }, [searchQuery, currentPage]);

  const handleQueryChange = (query) => {
    setGallery([]);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const loadMoreBtnClick = () => {
    setCurrentPage((s) => s + 1);
  };

  const openModal = (event) => {
    if (event.target.nodeName === "IMG") {
      setShowModal(true);
      setLargeImageUrl(event.target.dataset.source);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageUrl();
  };

  return (
    <div className={s.container}>
      <Searchbar onSubmit={handleQueryChange} />
      <ImageGallery gallery={gallery} onClick={openModal} />
      {showModal && (
        <Modal onClose={closeModal} largeImageURL={largeImageUrl}>
          <img src={largeImageUrl} alt={gallery.tags} />
        </Modal>
      )}
      {loading && <Loader />}
      {gallery.length > 0 && !loading && <Button onClick={loadMoreBtnClick} />}
      <ToastContainer />
    </div>
  );
};

export default App;
