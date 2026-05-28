import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn({ setIsLoggedIn }) {

  const navigate = useNavigate();

  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:3000/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),

      });

      const data = await response.json();

      // ERROR
      if (!response.ok) {

        alert(data.error);
        return;

      }

      // GUARDAR NOMBRE
      localStorage.setItem(
        "userName",
        data.user.username
      );

      // CONVERTIR ROL
      let role = "guest";

      if (data.user.role === 1) role = "admin";
      if (data.user.role === 2) role = "employee";
      if (data.user.role === 3) role = "client";
      if (data.user.role === 4) role = "guest";

      // GUARDAR ROL
      localStorage.setItem(
        "userRole",
        role
      );

      // LOGIN ACTIVO
      setIsLoggedIn(true);

      // REDIRECT
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

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-6"
        >

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-[#CD163F] hover:opacity-80 transition text-white font-bold py-3 rounded-lg mt-4"
          >
            Sign In
          </button>

        </form>

        {/* SIGN UP */}
        <div className="mt-8 text-center">

          <p className="text-gray-400">
            Don't have an account?
          </p>

          <Link
            to="/signup"
            className="text-[#CD163F] font-bold hover:underline"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </div>

  );
}