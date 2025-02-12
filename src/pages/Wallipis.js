import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Wallipi from "../components/Wallipi";
import Shimmer from "../components/ImageShimmer";
import Anchor from "../components/Anchor";

const API_KEY = "34718829-4c9919b223922dd46063bdffd";
const ITEMS_PER_PAGE = 20;
const DEFAULT_SEARCH_QUERY = "nature";

const Wallipis = () => {
  const [wallipis, setWallipis] = useState([]);
  const [order, setOrder] = useState("popular");
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const params = useParams();
  const query = params.query || DEFAULT_SEARCH_QUERY;

  const pageNum = (page) => {
    setPage(page);
  };

  let url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=200&editors_choice=true&orientation=all&order=${order}&page=${page}`;

  useEffect(() => {
    const fetchImages = async () => {
      setLoad(true);
      setError(null); // Reset error state before fetching
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await res.json();
        setWallipis(data.hits);
      } catch (error) {
        setError(error.message); // Update error state
      } finally {
        setLoad(false);
      }
    };
    fetchImages();
  }, [query, order, page]);

  // Function to handle image click and open modal
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  // Function to navigate to the next image
  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % wallipis.length);
  };

  // Function to navigate to the previous image
  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? wallipis.length - 1 : prevIndex - 1
    );
  };

  const totalPages = Math.ceil(wallipis.length / ITEMS_PER_PAGE);
  const currentWallipis = wallipis.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <Helmet>
        <title>Wallipi - Wallipis</title>
      </Helmet>
      {wallipis.length > 0 && <Anchor />}
      <div className="wallipi-space h-32"></div>
      <section className="flex items-center justify-center flex-col">
        <div className="wallipi-layout py-8">
          {load &&
            [...Array(ITEMS_PER_PAGE)].map((_, i) => <Shimmer key={i} />)}
          {error && <div className="error-message">{error}</div>}{" "}
          {!load &&
            !error &&
            currentWallipis.map((wallipi, index) => (
              <Wallipi
                key={wallipi.id}
                wallipi={wallipi}
                onClick={() => handleImageClick(index)}
              />
            ))}
        </div>

        <div className="pagination-controls flex justify-center">
          <button
            className="pagination-button"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-button"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </section>
      {wallipis.length === 0 && !load && (
        <div id="noimg">
          <img src="/images/noimage.svg" alt="No images" />
          <h1 className="text-neutral-500 text-2xl">
            No wallipis Available Here!
          </h1>
        </div>
      )}

      {selectedImageIndex !== null && (
        <div style={modalStyles.modal}>
          <button
            style={modalStyles.closeButton}
            onClick={closeModal}
            aria-label="Close modal"
          >
            X
          </button>
          <button
            style={{ ...modalStyles.navButton, ...modalStyles.prevButton }}
            onClick={prevImage}
            aria-label="Previous image"
          >
            Previous
          </button>
          <img
            src={currentWallipis[selectedImageIndex].webformatURL}
            alt="Selected"
            style={modalStyles.modalImage}
          />
          <button
            style={{ ...modalStyles.navButton, ...modalStyles.nextButton }}
            onClick={nextImage}
            aria-label="Next image"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

const modalStyles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "8px",
  },
  closeButton: {
    position: "absolute",
    top: "10%",
    right: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "none",
    padding: "10px",
    fontSize: "18px",
    cursor: "pointer",
    zIndex: 1001,
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "none",
    padding: "10px",
    fontSize: "18px",
    cursor: "pointer",
    zIndex: 1001,
  },
  prevButton: {
    left: "5%",
  },
  nextButton: {
    right: "5%",
  },
};

export default Wallipis;
