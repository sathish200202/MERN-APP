import { MapIcon } from "lucide-react";
import React from "react";
import { usePostStore } from "../store/usePostStore";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Posts = () => {
  const { allPosts, getSinglePost, updateFavourite } = usePostStore();

  const handleLikePost = async (postId, isfavourite) => {
    updateFavourite(postId, isfavourite);
  };

  const handleSinglePost = (postId) => {
    getSinglePost(postId);
  };

  //console.log("singlePost: ", singlePost);

  return (
    <div className="mt-4 ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Render posts dynamically */}

      {allPosts.map((post, index) => (
        <div
          key={index} // Provide a unique key for each post item
          className="bg-white p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-3xl cursor-pointer"
        >
          <div className="relative">
            {/* Heart and Trash Icons */}

            <FaHeart
              onClick={() => handleLikePost(post._id, post.isfavourite)}
              className={`absolute top-2 right-4 w-6 h-6 mt-0.5 text-gray-200 cursor-pointer ${
                post.isfavourite ? "text-red-500" : ""
              }`}
            />

            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
          <Link to={"/viewandedit-post"}>
            <div onClick={() => handleSinglePost(post._id)}>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h3>
                {/* <p className="text-gray-600 mt-2">{post.description}</p> */}
              </div>
              <div>
                <p className="text-xs text-slate-600 mt-2">
                  {post.description?.slice(0, 60)}...
                </p>
                <div className="inline-flex items-center gap-2 text-[13px] text-blue-800 bg-cyan-200/40 rounded mt-3 px-2 py-1">
                  <MapIcon className="yext-sm" />
                  {post.location?.join(", ")}{" "}
                  {/* Join locations with a comma */}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
