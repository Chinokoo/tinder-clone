import { useMatchStore } from "../store/useMatchStore";

const SwipeFeedBack = () => {
  const { swipeFeedback } = useMatchStore();
  console.log(swipeFeedback);

  const getFeedBackStyle = (swipeFeedback) => {
    if (swipeFeedback === "liked") return "text-green-500";
    if (swipeFeedback === "passed") return "text-red-500";
    if (swipeFeedback === "matched") return "text-pink-500";
    return "";
  };

  // absolute top-10 left-0 right-0
  return (
    <div
      className={` text-center text-2xl font-bold ${getFeedBackStyle(
        swipeFeedback
      )} `}
    >
      {swipeFeedback}
    </div>
  );
};

export default SwipeFeedBack;
