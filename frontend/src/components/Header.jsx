import React from "react";
import "../animations/Header.css";

const Header = () => {
  return (
    <div className="inline animate-slide-in-left p-2">
      <h1 className="text-4xl text-center mt-4 text-green-500/50 text-slate-500 animate-bounce-in">
        Create Your Posts and Memories...
      </h1>

      <div></div>
    </div>
  );
};

export default Header;
