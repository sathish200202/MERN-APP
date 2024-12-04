import React, { useEffect, useRef, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import { Image, Trash } from "lucide-react";
import VisitedLocation from "./VisitedLocation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditPost = () => {
  const Navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { singlePost, isUpdatingPosts, updatePost } = usePostStore();

  const [visitedLocation, setVisitedLocation] = useState(
    singlePost.location || []
  );

  const [previewImage, setPreviewImage] = useState(null);

  const [postData, setPostData] = useState({
    title: singlePost?.title || "",
    image: singlePost?.image || null,
    description: singlePost?.description || "",
    location: singlePost?.visitedLocation || [],
  });

  const postId = singlePost._id;

  //handle update the post
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    // Validation
    if (!postData.title) return toast.error("Title is required");
    if (!postData.image) return toast.error("Image is required");
    if (!postData.description) return toast.error("Description is required");
    if (!visitedLocation) return toast.error("Location is required");

    const PostData = { ...postData, visitedLocation };

    try {
      if (visitedLocation.length > 0) {
        await updatePost(postId, PostData);
        Navigate("/");
      } else {
        toast.error("Location is required");
      }
    } catch (error) {
      toast.error("Something is wrong");
    }
  };

  //handle Remove the image
  const handleRemoveImage = (e) => {
    e.preventDefault();
    console.log("funct called");
    setPostData((postData) => ({ ...postData, image: "" }));
    setPreviewImage(null);
  };

  //open the local storage window
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  //handle change image
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

  useEffect(() => {
    setPostData((prevData) => ({
      ...prevData,
      location: visitedLocation, // Update location inside postData when visitedLocation changes
    }));
  }, [visitedLocation]);

  return (
    <div>
      <h1 className="text-3xl flex items-center justify-center bg-gray-200 p-1 rounded-md text-green-500">
        Edit Post
      </h1>

      <form onSubmit={handleUpdatePost}>
        <div>
          <div className="mt-5 text-start">
            <label className="text-xl text-gray-500 ml-3">TITLE</label>
          </div>
          <input
            type="text"
            className="input w-[98%] m-2 p-2 rounded-lg bg-gray-100"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </div>
        <div className="p-2">
          {!postData.image ? (
            <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50">
              <button
                onClick={handleButtonClick}
                type="button"
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
                src={postData.image || previewImage}
                alt="Selected"
                className="w-full h-[300px] object-cover rounded"
              />
              <button
                onClick={handleRemoveImage}
                type="button"
                className="btn-small btn-delete absolute top-2 right-2 p-1 border border-red-500 text-red-500 bg-gray-300 rounded-full hover:bg-red-500 hover:text-gray-100"
              >
                <Trash className="size-5" />
              </button>
            </div>
          )}
        </div>
        <div className="mt-5 w-auto p-2">
          <label className="text-xl text-gray-500 ml-3">DESCRIPTION</label>

          <textarea
            className="textarea size-48 w-full mt-2 p-4 bg-gray-300/30 rounded-md textarea-md"
            value={postData.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
        </div>

        <div className="ml-2">
          <VisitedLocation
            tags={visitedLocation}
            setTags={setVisitedLocation}
          />
        </div>

        <div className=" mt-6 p-2">
          <button
            type="submit"
            className="btn mb-4 w-full border border-green-400 text-green-500 hover:bg-green-500 hover:text-gray-100"
          >
            {isUpdatingPosts ? (
              <div className="loading loading-spinner"></div>
            ) : (
              " Save Changes"
            )}
          </button>
        </div>
      </form>
      <p className="flex justify-center text-sm text-gray-400">
        If you want to go to the home page, click the arrow on the top left...
      </p>
    </div>
  );
};
export default EditPost;
