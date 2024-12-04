import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { usePostStore } from "../store/usePostStore";
import { Image, Trash } from "lucide-react";
import VisitedLocation from "../components/VisitedLocation";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [visitedLocation, setVisitedLocation] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    image: "",
    description: "",
    location: [],
  });
  const [previewImage, setPreviewImage] = useState(null);

  const { createPost, creatingPosts } = usePostStore();

  const fileInputRef = useRef(null);
  const Navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64Image = reader.result;
        setPreviewImage(base64Image);
        setPostData((prevData) => ({ ...prevData, image: base64Image }));
      };
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setPostData((prevData) => ({ ...prevData, image: "" }));
    setPreviewImage(null);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    // Validation
    if (!postData.title) return toast.error("Title is required");
    if (!postData.image) return toast.error("Image is required");
    if (!postData.description) return toast.error("Description is required");

    if (!visitedLocation || visitedLocation.lenth === 0)
      return toast.error("Location required");
    // Add visited locations to postData before submission
    const postWithLocation = { ...postData, location: visitedLocation };

    try {
      await createPost(postWithLocation); // Assuming this sends the post data to the backend
      resetForm();
      Navigate("/");
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  const resetForm = () => {
    setPostData({
      title: "",
      image: "",
      description: "",
      location: [],
    });
    setVisitedLocation([]);
    setPreviewImage(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-6 mt-7">
      <div className="shadow-lg rounded-xl p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create Your Post</h1>
          <p className="mt-2">
            Share your wonderful moments and unforgettable places.
          </p>
          <form onSubmit={handleCreatePost}>
            <div>
              <div className="mt-10 text-start">
                <label className="text-xl">TITLE</label>
              </div>
              <input
                type="text"
                className="input input-success w-full mt-2 p-2 bg-gray-300/30"
                value={postData.title}
                onChange={(e) =>
                  setPostData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
              />
            </div>

            {/* Image Upload Section */}
            <div className="p-5">
              {!postData.image && !previewImage ? (
                <div className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50">
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full border border-green-600 cursor-pointer"
                  >
                    <Image className="w-5 h-5 text-green-600" />
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleChangeImage}
                    />
                  </button>
                  <p className="text-sm text-slate-500">
                    Browse image files to upload
                  </p>
                </div>
              ) : (
                <div className="w-full relative">
                  <img
                    src={previewImage || postData.image}
                    alt="Selected"
                    className="w-full h-[300px] object-cover rounded"
                  />
                  <button
                    type="button"
                    className="btn-small btn-delete absolute top-2 right-2 p-1 border border-red-500 text-red-500 bg-gray-300 rounded-full hover:bg-red-500 hover:text-gray-100"
                    onClick={handleRemoveImage}
                  >
                    <Trash className="size-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div>
              <div className="mt-5 text-start">
                <label className="text-xl">DESCRIPTION</label>
              </div>
              <textarea
                className="input input-success w-full mt-2 p-2 bg-gray-300/30"
                value={postData.description}
                onChange={(e) =>
                  setPostData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {/* Location Section */}
            <div>
              <div className="mt-5 text-start flex items-start justify-start">
                <label className="text-xl">LOCATION</label>
              </div>
              <VisitedLocation
                tags={visitedLocation}
                setTags={setVisitedLocation}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-7">
              <button
                type="submit"
                className="w-full border-2 rounded-lg border-green-600 p-3 text-green-600 hover:bg-green-600 hover:text-gray-100"
              >
                {creatingPosts ? (
                  <div className="loading loading-spinner text-gray-50"></div>
                ) : (
                  "Create a Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
