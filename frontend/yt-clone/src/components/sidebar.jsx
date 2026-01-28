import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import {
  MdHistory,
  MdPlaylistPlay,
  MdWatchLater,
  MdThumbUp,
  MdVideoLibrary,
  MdDownload,
  MdShoppingBag,
  MdMusicNote,
  MdMovie
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import subscriptions from "../data/subscription";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    closeSidebar();
  };

  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      
      <aside
        className={`
          fixed left-0 top-14 z-50 w-60
          h-[calc(100vh-56px)]
          bg-black border-r border-gray-800
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full overflow-y-auto p-3 text-sm">

          
          <Section>
            <Item icon={<AiFillHome size={20} />} label="Home" onClick={goHome} />
            <Item icon={<SiYoutubeshorts size={20} />} label="Shorts" />
          </Section>

          
          <Section title="Subscriptions">
            {subscriptions.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs font-semibold">
                  {c.channelName[0]}
                </div>
                <span className="truncate">{c.channelName}</span>
              </div>
            ))}
          </Section>

          
          <Section title="You">
            <Item icon={<MdHistory />} label="History" />
            <Item icon={<MdPlaylistPlay />} label="Playlists" />
            <Item icon={<MdWatchLater />} label="Watch later" />
            <Item icon={<MdThumbUp />} label="Liked videos" />
            <Item icon={<MdVideoLibrary />} label="Your videos" />
            <Item icon={<MdDownload />} label="Downloads" />
          </Section>

         
          <Section title="Explore">
            <Item icon={<MdShoppingBag />} label="Shopping" />
            <Item icon={<MdMusicNote />} label="Music" />
            <Item icon={<MdMovie />} label="Films" />
          </Section>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;



const Section = ({ title, children }) => (
  <div className="mb-3 border-b border-gray-800 pb-3">
    {title && (
      <p className="text-xs uppercase text-gray-400 px-3 mb-2">
        {title}
      </p>
    )}
    {children}
  </div>
);

const Item = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
  >
    {icon}
    <span className="truncate">{label}</span>
  </div>
);
