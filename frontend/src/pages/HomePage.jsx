import { useEffect } from "react";
import SideBar from "../components/SideBar";
import { useMatchStore } from "../store/useMatchStore";
import Header from "../components/Header";
import { Frown } from "lucide-react";
//import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { loadingProfiles, userProfiles, getUserProfiles } = useMatchStore();

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
      <SideBar />
      <div className="flex flex-glow flex-col overflow-hidden w-full">
        <Header />
        <main className="flex flex-glow flex-col gap-10 justify-center items-center p-4 relative overflow-hidden ">
          {userProfiles.length > 0 && !loadingProfiles && <>Users found</>}

          {userProfiles.length === 0 && !loadingProfiles && <NoMoreProfiles />}

          {loadingProfiles && <LoadingProfiles />}
        </main>
      </div>
    </div>
  );
};

export default HomePage;

const NoMoreProfiles = () => {
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <Frown size={80} className="text-pink-400 mb-6" />
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      Woah there, take you time
    </h2>
    <p className="text-xl text-gray-600 mb-6">
      Time to chill and touch some grass
    </p>
  </div>;
};

//skeleton UI
const LoadingProfiles = () => {
  return (
    // whole container
    <div className="relative w-full max-w-sm h-[28rem">
      {/* container with white background */}
      <div className="card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        {/* first big gray container */}
        <div className="px-4 py-4 h-3/4">
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        </div>
        <div className="card-body bg-gradient-to-b from-white to-purple-50 p-4">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};
