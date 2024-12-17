import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set) => ({
  loading: false,
  updateUser: async (data) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.put("/users/update", data);
      useAuthStore.getState().setAuthUser(res.data.user);
      toast.success("Profile has been updated");
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
