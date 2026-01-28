import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const Upload = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !video || !thumbnail) {
      toast.error("Title, video and thumbnail are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/auth");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/videos/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      toast.success("Video uploaded successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="w-full max-w-xl bg-black border border-gray-800 rounded-xl p-6">

        <h1 className="text-xl font-semibold mb-1">Upload video</h1>
        <p className="text-sm text-gray-400 mb-6">
          Share your content with the world
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-sm outline-none focus:border-blue-500"
          />

          {/* DESCRIPTION */}
          <textarea
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-sm outline-none resize-none focus:border-blue-500"
          />

          {/* THUMBNAIL */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full text-sm text-gray-400"
            />
          </div>

          {/* VIDEO */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Video file
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full text-sm text-gray-400"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Upload;
