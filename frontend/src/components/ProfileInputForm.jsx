import { useState } from "react";
import { Info, Mail, User, PencilIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const ProfileInputForm = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [formdata, setFormData] = useState({
    fullName: authUser.fullName || "",
    email: authUser.email || "",
    about: authUser.about || "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const changeTheButton = () => {
    setIsUpdate(true);
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    updateProfile(formdata);
  };
  return (
    <form onSubmit={handleEditProfile} className="h-screen pt-20 ">
      <div className="max-w-2xl mx-auto p-4 py-6">
        <div className="bg-gray-100 shadow-lg rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          <div className="">
            <label className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-400" />
              <span>Full Name</span>
            </label>
            {isUpdate ? (
              <input
                type="text"
                className="w-full mt-2 input bg-gray-500/10"
                value={formdata.fullName}
                onChange={(e) =>
                  setFormData({ ...formdata, fullName: e.target.value })
                }
              />
            ) : (
              <div className="w-full mt-2 pt-3 input text-gray-500 bg-gray-500/10">
                {formdata.fullName}
              </div>
            )}
          </div>
          <div className="">
            <label className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>Email</span>
              <p className="text-xs text-slate-400">
                (You cannot update your Email)
              </p>
            </label>
            <div className="w-full mt-2 pt-3 input text-gray-500 bg-gray-500/10">
              {formdata.email}
            </div>
          </div>
          <div className="">
            <label className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-400" />
              <span>About</span>
            </label>
            {isUpdate ? (
              <textarea
                type="text"
                className="w-full mt-2 textarea bg-gray-500/10"
                placeholder={!formdata.about && "Write about you..."}
                value={formdata.about}
                onChange={(e) =>
                  setFormData({ ...formdata, about: e.target.value })
                }
              />
            ) : (
              <div className="w-full h-auto p-5 mt-2  pt-3 input text-gray-500 bg-gray-500/10">
                {formdata.about}
              </div>
            )}
          </div>

          {isUpdate ? (
            <button type="submit" className="w-full p-2 btn">
              {isUpdatingProfile ? (
                <div className="loading loading-spinner"></div>
              ) : (
                "Update Profile"
              )}
            </button>
          ) : (
            <div onClick={changeTheButton} className="w-full p-2 btn">
              <PencilIcon size={18} />
              Edit Profile
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileInputForm;
