import { useMatchStore } from "../store/useMatchStore";
import TinderCard from "react-tinder-card";

const SwipeArea = () => {
  const { userProfiles, swipeLeft, swipeRight } = useMatchStore();

  const handleSwipe = (direction, user) => {
    if (direction === "right") swipeRight(user);
    else if (direction === "left") swipeLeft(user);
  };

  return (
    <div className="relative w-full max-w-sm h-[28rem]">
      {userProfiles.map((user) => (
        <TinderCard
          className="absolute shadow-none"
          key={user._id}
          onSwipe={(direction) => handleSwipe(direction, user)}
          swipeRequirementType="position"
          swipeThreshold={100}
          preventSwipe={["up", "down"]}
        >
          <div className="card bg-white w-80 h-[28rem] select-none  rounded-lg overflow-hidden border-gray-200">
            <figure className="px-4 py-4 pt-4 h-3/4">
              <img
                src={user.image || "/user.png"}
                alt={user.name}
                className="rounded-lg object-cover h-full pointer-events-none"
              />
            </figure>
            <div className="card-body bg-gradient-to-b from-white to-pink-50">
              <h2 className="card-title text-2xl text-gray-800">
                {user.name}, {user.age}
              </h2>
              <p className="text-gray-600">{user.bio}</p>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeArea;