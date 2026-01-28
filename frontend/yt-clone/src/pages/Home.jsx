import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/videos`)
      .then((res) => res.json())
      .then(setVideos)
      .catch(console.error);
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
      {videos.map((video) => (
        <div
          key={video._id}
          onClick={() => navigate(`/watch/${video._id}`)}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};

export default Home;
