import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    role: "guest",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      "http://localhost:3000/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    /* guardar datos */
    localStorage.setItem(
      "userRole",
      formData.role
    );

    localStorage.setItem(
      "userName",
      formData.name
    );

    setIsLoggedIn(true);

    /* redireccionar */
    navigate(`/dashboard/${formData.role}`);

  } catch (err) {

    console.log(err);

    alert("Error del servidor");
  }
};

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex justify-center items-center px-6">

      <div className="bg-[#2A2A2A] w-full max-w-[500px] rounded-2xl p-10 shadow-2xl">

        {/* TITLE */}
        <h1 className="text-white text-4xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mb-10">
          Access the CyberSec OT Training Platform
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* NAME */}
          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="bg-[#111] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#CD163F]"
            />

          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="bg-[#111] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#CD163F]"
            />

          </div>

          {/* COMPANY */}
          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company / Organization"
              className="bg-[#111] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#CD163F]"
            />

          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="bg-[#111] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#CD163F]"
            />

          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-[#111] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#CD163F]"
            >
              <option value="employee">Employee</option>
              <option value="client">Client</option>
              <option value="guest">Guest</option>
            </select>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-[#CD163F] hover:opacity-80 transition text-white font-bold py-4 rounded-xl mt-4"
          >
            Create Account
          </button>

        </form>

        {/* LOGIN */}
        <div className="text-center mt-8">

          <p className="text-gray-400">
            Already have an account?
          </p>

          <button
            onClick={() => navigate("/login")}
            className="text-[#CD163F] font-bold mt-2 hover:underline"
          >
            Sign In
          </button>

        </div>

      </div>

    </div>
  );
}