import { BsThreeDotsVertical } from "react-icons/bs";

const VideoCard = ({ video }) => {
  if (!video) return null;

  return (
    <div className="cursor-pointer">

      <div className="relative">
        <img
          src={`http://localhost:5000/${video.thumbnailUrl}`}
          alt={video.title}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>

      

      <div className="flex gap-3 mt-3">
        <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold">
          {video.title?.[0]?.toUpperCase()}
        </div>
       

        <div>
          <h3 className="text-sm font-semibold line-clamp-2">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400">
            {video.createdAt
              ? new Date(video.createdAt).toDateString()
              : ""}
          </p>
        </div>
      </div>

    </div>
  );
};

export default VideoCard;
