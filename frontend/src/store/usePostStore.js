import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePostStore = create((set, get) => ({
  allPosts: [],
  singlePost: null,
  isFavourite: false,
  creatingPosts: false,
  deletingPosts: false,
  gettingPosts: false,
  isUpdatingPosts: false,
  gettingSinglePost: false,

  //create a new post functionality
  createPost: async (data) => {
    set({ creatingPosts: true });

    try {
      const res = await axiosInstance.post("/posts/create", data);
      set({ allPosts: [...get().allPosts, res.data] });
      toast.success("Post created successflly");
    } catch (error) {
      console.log("Error in createPost: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ creatingPosts: false });
    }
  },

  //get all posts
  getAllPosts: async () => {
    set({ gettingPosts: true });

    try {
      const res = await axiosInstance.get("/posts");
      set({ allPosts: res.data });
    } catch (error) {
    } finally {
      set({ gettingPosts: false });
    }
  },

  //get single post
  getSinglePost: async (postId) => {
    set({ gettingSinglePost: true });

    try {
      const res = await axiosInstance.get(`/posts/${postId}`);
      set({ singlePost: res.data });
    } catch (error) {
      console.log("Error in singlepost ", error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ gettingSinglePost: false });
    }
  },

  //update is Favourite
  updateFavourite: async (postId, isFavourite) => {
    try {
      const res = await axiosInstance.put(`/posts/update-fav/${postId}`, {
        isFavourite: !isFavourite,
      });
      get().getAllPosts();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  //update the post
  updatePost: async (postId, data) => {
    set({ isUpdatingPosts: true });
    try {
      const res = await axiosInstance.put(`/posts/${postId}`, data);
      set({ allPosts: [...get().allPosts, res.data] });
      toast.success("Post updated successfully");
    } catch (error) {
      console.log("Error in update ", error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingPosts: false });
    }
  },

  //delete Post
  deletePost: async (postId) => {
    set({ deletingPosts: true });
    try {
      const res = await axiosInstance.delete(`/posts/delete/${postId}`);
      toast.success("Post deleted successfully");
      get().getAllPosts();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ deletingPosts: false });
    }
  },
}));
