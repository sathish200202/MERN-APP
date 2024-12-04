import React, { useState } from "react";
import { usePostStore } from "../store/usePostStore";
import { ArrowLeftCircle, Pencil, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ViewPost from "../components/ViewPost";
import EditPost from "../components/EditPost";

const ViewAndEditPage = () => {
  const { singlePost, gettingSinglePost, deletePost, deletingPosts } =
    usePostStore();

  const Navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
    Navigate("/");
  };

  return (
    <div className="relative min-h-screen mt-24 gap-10">
      <Link to={"/"}>
        <ArrowLeftCircle className="inline-flex ml-4 w-7 h-7 text-green-500" />
      </Link>
      {gettingSinglePost ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="loading loading-spinner size-10 text-green-600"></div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg relative">
          <div className=" p-5">
            {!isEdit && (
              <>
                <button
                  onClick={() => setIsEdit(true)}
                  type="button"
                  className="absolute  top-0 right-40 m-3 mr-5 text-green-500 btn btn-sm border-green-500 hover:bg-green-500 hover:text-gray-200"
                >
                  <Pencil />
                  Edit Post
                </button>
                <button
                  onClick={() => handleDeletePost(singlePost._id)}
                  className="absolute  top-0 right-2 m-3 mr-5 text-red-500 btn btn-sm border-red-500 hover:bg-red-500 hover:text-gray-200"
                >
                  {deletingPosts ? (
                    <>
                      <div className="loading loading-spinner "></div>
                      Deleting
                    </>
                  ) : (
                    <>
                      <Trash />
                      Delete Post
                    </>
                  )}
                </button>
              </>
            )}
          </div>
          {isEdit ? <EditPost /> : <ViewPost />}
        </div>
      )}
    </div>
  );
};

export default ViewAndEditPage;

//  <div className="mt-10">
//             <label className="text-xl text-gray-500 ml-3">TITLE</label>

//             <div className="m-2 p-2 rounded-lg bg-gray-100">
//               <h2 className="text-lg">{postData.title}</h2>
//             </div>
//           </div>
//           {/*Image */}
//           <div className="mt-5 ">
//             <label className="text-xl text-gray-500 ml-3">IMAGE</label>
//             <div className="w-full relative">
//               <img
//                 src={postData.image}
//                 alt="Selected"
//                 className="w-full h-[400px] p-2 object-cover rounded"
//               />
//             </div>
//           </div>

//           <div className="mt-5 w-auto">
//             <label className="text-xl text-gray-500 ml-3">DESCRIPTION</label>

//             <div className="m-2 p-2 rounded-lg bg-gray-100">
//               <h2 className="text-lg">{postData.description}</h2>
//             </div>
//           </div>

//           <div className="mt-5">
//             <label className="text-xl text-gray-500 ml-3 block">
//               VISITED LOCATION
//             </label>

//             <div className="m-2 flex items-center">
//               <div className="bg-gray-200 p-1.5 text-green-500 rounded-lg inline-flex items-center mb-5">
//                 <MapIcon className="mr-2 text-sm" />
//                 <p className="text-sm">{postData.location}</p>
//               </div>
//             </div>
//             <div className="flex items-center justify-center ">
//               <p className="text-sm text-gray-400">
//                 If you want to edit your post, click the edit button on the
//                 top...
//               </p>
//             </div>
//           </div>
//         </div>
