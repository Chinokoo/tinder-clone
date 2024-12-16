import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";

export const useMatchStore = create((set) => ({
  matches: [],
  userProfiles: [],
  loading: false,
  loadingProfiles: false,
  swipeFeedback: null,
  getMatches: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get("/matches");
      set({ matches: response.data.matches });
    } catch (error) {
      set({ matches: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  getUserProfiles: async () => {
    try {
      set({ loadingProfiles: true });
      const response = await axiosInstance.get("/matches/user-profiles");
      set({ userProfiles: response.data.users });
    } catch (error) {
      set({ userProfiles: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loadingProfiles: false });
    }
  },

  swipeLeft: async (user) => {
    try {
      set({ swipeFeedback: "passed" });
      await axiosInstance.post("/matches/swipe-left/" + user.id);
    } catch (error) {
      console.log(error);
      toast.error("failed to swipe left");
    } finally {
      setTimeout(() => {
        set({ swipeFeedback: null });
      }, 5000);
    }
  },
  swipeRight: async (user) => {
    try {
      const id = user._id;
      set({ swipeFeedback: "liked" });
      await axiosInstance.post("/matches/swipe-right/" + id);
    } catch (error) {
      console.log(error);
      toast.error("failed to swipe right");
    } finally {
      setTimeout(() => {
        set({ swipeFeedback: null });
      }, 5000);
    }
  },
  subscribeToNewMatches: () => {
    try {
      const socket = getSocket();
      socket.on("newMatch", (newMatch) => {
        set((state) => ({
          matches: [...state.matches, newMatch],
        }));
        toast.success("you got a new match!");
      });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  },
  unsubscribeFromNewMatches: () => {
    try {
      const socket = getSocket();
      socket.off("newMatch");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  },
}));
