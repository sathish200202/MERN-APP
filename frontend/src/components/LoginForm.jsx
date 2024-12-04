import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingin } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();

    login(formData);
  };
  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md">
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="input bg-gray-500/10 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="input bg-gray-500/10 w-full"
        required
      />

      <button
        type="submit"
        className="btn bg-gray-500/50 shadow-lg text-white w-full"
      >
        {isLoggingin ? <Loader className="size-5 animate-spin" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
