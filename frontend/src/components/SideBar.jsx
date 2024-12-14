import { Heart, X, Loader, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useMatchStore } from "../store/useMatchStore";
const SideBar = () => {
  //opening the sidebar
  const [isOpen, setIsOpen] = useState(false);

  //closing the side bar
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { matches, loading, getMatches } = useMatchStore();

  useEffect(() => {
    getMatches();
  }, [getMatches]);

  return (
    <>
      {/* side bar container */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-1/4`}
      >
        {/* header in the sidebar */}
        <div className="flex flex-col h-full">
          <div className="p-4 pb-[27px] border-pink-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-pink-600">Matches</h2>
            <button
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 z-10 relative">
            {loading ? (
              <LoadingState />
            ) : matches.length === 0 ? (
              <NoMatchesFound />
            ) : (
              "hey"
            )}
          </div>
        </div>
      </div>
      <button
        className="lg:hidden fixed top-4 left-4 p-2 bg-pink-500 text-white rounded-md z-0"
        onClick={toggleSidebar}
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
};

export default SideBar;

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Heart className="text-pink-500 mb-4" size={50} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No Matches Found Yet
    </h3>
    <p className="text-gray-500 max-w-xs">
      Don&apos;t worry! your perfect match is just around the corner. keep
      Swiping
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-pink-500 mb-4 animate-spin" size={50} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading matches
    </h3>
    <p className="text-gray-500 max-w-xs">
      We are finding your perfect matches. This might take a moment...
    </p>
  </div>
);
