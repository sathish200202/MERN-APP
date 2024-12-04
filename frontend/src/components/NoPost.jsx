import { Plus, PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const NoPost = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="text-center max-w-2xl">
        {/* Placeholder Image */}
        <div className="flex justify-center items-center mb-3">
          <PlusCircle className="w-20 h-20 bg-green-600 text-gray-100 rounded-full" />
        </div>
        {/* Motivating Message */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Oops! Looks like there are no posts yet.
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          It seems like you're ahead of the crowd! Be the first to create a post
          and share your wonderful moments with the world.
        </p>

        {/* Button to Create Post */}
        <Link to="/create-post">
          <button className="bg-gray-100 border-2 border-green-700 text-green-700 py-2 px-6 rounded-lg hover:bg-green-700 hover:text-gray-100 transition duration-200">
            <PlusCircle className="inline" />
            <p className="inline"> Create Your First Post</p>
          </button>
        </Link>

        {/* Secondary message */}
        <div className="mt-8 text-gray-500">
          <p>
            No posts available? No worries! Start your journey by creating the
            first post and share your stories with others. Don't miss out on the
            fun!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoPost;
