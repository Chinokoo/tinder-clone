import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

//managing the global state of the authentication store
export const useAuthStore = create((set) => ({
  //global user object
  authUser: null,
  //checking if the user is authenticated or not
  checkingAuth: true,
  //loading state for the authentication process
  loading: false,

  //function to check if the user is authenticated or not
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ authUser: response.data.user });
      //connecting to the socket
      initializeSocket(response.data.user._id);
    } catch (error) {
      set({ authUser: null });
      disconnectSocket();
      console.log(error.message);
    } finally {
      set({ checkingAuth: false });
    }
  },
  //function to signup the user
  signup: async (signupData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post("/auth/signup", signupData);
      //setting the user object in the global state
      set({ authUser: response.data.user });
      //connecting to the socket
      initializeSocket(response.data.user._id);

      toast.success("Account created successfully");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error("something went wrong when creating an account.");
    } finally {
      set({ loading: false });
    }
  },
  //login function
  login: async (loginData) => {
    try {
      set({ loading: true });

      const response = await axiosInstance.post("/auth/login", loginData);

      //setting the user object in the global state
      set({ authUser: response.data.user });
      //connecting to the socket
      initializeSocket(response.data.user._id);
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when logging in");
    } finally {
      set({ loading: false });
    }
  },
  //function to logout the user
  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) set({ authUser: null });
      disconnectSocket();
    } catch (error) {
      console.log(error.response.data.message);
      toast.error("something went wrong when logging out");
    }
  },
  setAuthUser: (user) => set({ authUser: user }),
}));
