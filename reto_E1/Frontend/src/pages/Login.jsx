import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "./Context/AuthContext";

export default function SignIn() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }    

      login({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
      });
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }

  };

  return (
    <div className="bg-[#2A2A2A] min-h-screen flex items-center justify-center px-6">
      <div className="bg-[#1A1A1A] w-full max-w-md rounded-2xl shadow-lg p-10">

        <h1 className="text-white text-4xl font-bold text-center mb-10">
          Sign In
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">

          <div>
            <label className="text-white block mb-2 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2A2A2A] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#CD163F]"
            />
          </div>

          <div>
            <label className="text-white block mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2A2A2A] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#CD163F]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#CD163F] hover:opacity-80 transition text-white font-bold py-3 rounded-lg mt-4"
          >
            Sign In
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">Don't have an account?</p>
          <Link to="/signup" className="text-[#CD163F] font-bold hover:underline">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}