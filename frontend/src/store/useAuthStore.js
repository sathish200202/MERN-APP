import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
//import Cookies from "js-cookie"; // For reading/writing cookies

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingin: false,
  isLoggingout: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  //function for check auth
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/profile");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in check auth ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //fucntion for Signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  //function for login
  login: async (data) => {
    set({ isLoggingin: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });

      toast.success("Login Successfully");
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingin: false });
    }
  },

  //function for update profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  //function for logout
  logout: async () => {
    set({ isLoggingout: true });

    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
