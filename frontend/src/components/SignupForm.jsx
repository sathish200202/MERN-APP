import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success) signup(formData);
  };
  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        className="w-full mt-2 input bg-gray-500/10"
        required
      />

      <input
        type="Email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full mt-2 input bg-gray-500/10"
        required
      />

      <input
        type="password"
        placeholder="Password (6+ characters)"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full mt-2 input bg-gray-500/10"
        required
      />
      <button
        type="submit"
        disabled={isSigningup}
        className="btn w-full bg-gray-500/50 shadow-lg text-white"
      >
        {isSigningup ? <Loader className="size-5 animate-spin" /> : "Sign up"}
      </button>
    </form>
  );
};

export default SignupForm;
