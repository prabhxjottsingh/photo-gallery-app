import { useState } from "react";
import Shimmer from "../components/ImageShimmer"; // Ensure you have the Shimmer component imported

const Wallipi = (props) => {
  const { wallipi, onClick } = props;
  const [loading, setLoading] = useState(true); // Local state to track loading status

  return (
    <div className="card" onClick={onClick}>
      {loading && <Shimmer />} {/* Show shimmer effect while loading */}
      <img
        src={wallipi.webformatURL}
        alt="img"
        style={{
          objectFit: "cover",
          height: "100%",
          width: "100%",
          display: loading ? "none" : "block", // Hide the image while loading
        }}
        onLoad={() => setLoading(false)} // Set loading to false when the image has loaded
        onError={() => setLoading(false)} // Ensure loading state is false if the image fails to load
      />
    </div>
  );
};

export default Wallipi;
