import React, { useEffect } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Footer from "../components/Footer";
import NoPost from "../components/NoPost";
import { usePostStore } from "../store/usePostStore";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const Navigate = useNavigate();
  const { allPosts, getAllPosts, gettingPosts } = usePostStore();

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return (
    <div className="mt-20 mr-3">
      {allPosts.length > 0 && (
        <div className="flex items-end justify-end ">
          <button
            onClick={() => Navigate("/create-post")}
            type="button"
            className="flex flex-col items-center justify-center"
          >
            <Plus className="bg-gray-100 border border-green-600 w-10 h-10 rounded-full text-green-400" />
            <p className="text-center text-xs text-gray-500 pt-2">
              Add your new memories...
            </p>
          </button>
        </div>
      )}
      <div>
        <Header />
      </div>
      {!gettingPosts ? (
        <div className="">{allPosts.length > 0 ? <Posts /> : <NoPost />}</div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className="loading loading-spinner size-10 text-green-500"></div>
        </div>
      )}

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
