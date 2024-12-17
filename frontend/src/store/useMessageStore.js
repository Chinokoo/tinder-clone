import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set) => ({
  messages: [],
  loading: false,
  sendMessage: async (receiverId, content) => {
    try {
      //mock up a message, show it in the chat immediately
      set((state) => ({
        messages: [
          ...state.messages,
          {
            _id: Date.now(),
            sender: useAuthStore.getState().authUser._id,
            content,
          },
        ],
      }));

      const res = await axiosInstance.post("/messages/send", {
        receiverId,
        content,
      });

      console.log("message sent", res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when sending a message");
    }
  },
  //get messages function
  getMessages: async (userId) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/messages/conversation/" + userId);
      set({ messages: res.data.messages });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong when getting messages");
    } finally {
      set({ loading: false });
    }
  },
  //listening to messages using socket.io
  subscribeToMessages: () => {
    const socket = getSocket();
    socket.on("newMessage", ({ message }) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });
  },
  //stop listening to the socket.
  unsubscribeFromMessages: () => {
    const socket = getSocket();
    socket.off("newMessage");
  },
}));
