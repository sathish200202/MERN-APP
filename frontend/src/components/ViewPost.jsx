import { useEffect } from "react";
import { usePostStore } from "../store/usePostStore";
import { MapIcon } from "lucide-react";

const ViewPost = () => {
  const { singlePost } = usePostStore();

  if (!singlePost) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="loading loading-spinner size-10 text-green-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10">
        <label className="text-xl text-gray-500 ml-3">TITLE</label>

        <div className="m-2 p-2 rounded-lg bg-gray-100">
          <h2 className="text-lg">{singlePost.title}</h2>
        </div>
      </div>
      {/*Image */}
      <div className="mt-5 ">
        <label className="text-xl text-gray-500 ml-3">IMAGE</label>
        <div className="w-full relative">
          <img
            src={singlePost.image}
            alt="Selected"
            className="w-full h-[400px] p-2 object-cover rounded"
          />
        </div>
      </div>

      <div className="mt-5 w-auto">
        <label className="text-xl text-gray-500 ml-3">DESCRIPTION</label>

        <div className="m-2 p-2 rounded-lg bg-gray-100">
          <h2 className="text-lg">{singlePost.description}</h2>
        </div>
      </div>

      <div className="mt-5">
        <label className="text-xl text-gray-500 ml-3 block">
          VISITED LOCATION
        </label>

        <div className="m-2 flex items-center">
          <div className="bg-gray-200 p-1.5 text-green-500 rounded-lg inline-flex items-center mb-5">
            <MapIcon className="mr-2 text-sm" />
            <p className="text-sm">{singlePost.location}</p>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <p className="text-sm text-gray-400">
            If you want to edit your post, click the edit button on the top...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
