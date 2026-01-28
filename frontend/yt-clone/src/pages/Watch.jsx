import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [suggested, setSuggested] = useState([]);

  
  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/${id}`)
      .then(res => res.json())
      .then(setVideo)
      .catch(console.error);
  }, [id]);

  
  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then(res => res.json())
      .then(data => setSuggested(data.filter(v => v._id !== id)))
      .catch(console.error);
  }, [id]);

  if (!video) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-400">Loading video...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">

     
      <div className="flex-1">

       
        <video
          src={`http://localhost:5000/${video.videoUrl}`}
          controls
          className="w-full aspect-video rounded-xl bg-black"
        >
          Your browser does not support video playback.
        </video>

        <div className="px-4 mt-3"> <p className="text-base font-semibold text-gray-800"> {video.channelName || "Unknown Channel"} </p> </div>
       
       <div className="flex justify-between items-center gap-4 px-4 py-2 border-b border-gray-200">
  
  <div className="flex-1">
    <h1 className="text-lg font-semibold mt-2">{video.title}</h1>
    <p className="text-sm text-gray-500 mt-1">
      {video.description || "No description"}
    </p>
  </div>

  
  <div className="flex-shrink-0">
    <button className="px-4 py-1 border border-gray-300 rounded-md bg-white text-black hover:bg-gray-100 transition">
      Subscribe
    </button>
  </div>
</div>

        
      </div>

      
      <div className="w-full lg:w-[360px] space-y-4">
        {suggested.map(v => (
          <div
            key={v._id}
            onClick={() => navigate(`/watch/${v._id}`)}
            className="flex gap-3 cursor-pointer"
          >
            <img
              src={`http://localhost:5000/${v.thumbnailUrl}`}
              alt={v.title}
              className="w-40 h-24 rounded-lg object-cover"
            />

            <div>
              <p className="text-sm font-semibold line-clamp-2">
                {v.title}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Watch;
