import React from "react";
import { Link } from "react-router-dom";
import { LogOut, User, UserPlus } from "lucide-react";
import { GiWorld } from "react-icons/gi";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { logout } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 shadow-lg fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to={"/"}>
              <GiWorld className=" w-12 h-12 text-green-700 " />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl text-gray-100 bg-green-400 rounded-full p-2 shadow-lg">
              World Posts
            </h1>
          </div>
          {authUser ? (
            <div className="flex items-center gap-4">
              <Link
                to={"/profile"}
                className={`btn btn-sm gap-2 transition-colors`}
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="btn btn-sm gap-2 transition-colors"
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to={"/signup"}
                className="btn btn-sm bg-gray-100 gap-2 transition-colors"
              >
                <UserPlus className="size-5" />
                <span className="hidden sm:inline">Sign up</span>
              </Link>
              <Link
                to={"/login"}
                className="btn bg-gray-100 btn-sm gap-2 transition-colors"
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
