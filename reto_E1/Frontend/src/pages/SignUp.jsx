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
          headers: { "Content-Type": "application/json" },
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

      localStorage.setItem("userId",    data.user?.id || "");
      localStorage.setItem("userName",  formData.name);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userRole",  formData.role);

      setIsLoggedIn(true);
      navigate(`/dashboard/${formData.role}`);

    } catch (err) {
      console.log(err);
      alert("Error del servidor");
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex justify-center items-center px-6 py-10">

      <div className="bg-[#2A2A2A] w-full max-w-[480px] rounded-2xl p-10 shadow-2xl border border-[#333]">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center gap-3">
              <img
                src="/ROK-331842c1.png"
                alt="Rockwell Automation logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
              Rockwell Automation
            </span>
          </div>

          <h1 className="text-white text-3xl font-bold mb-1">
            Create account
          </h1>

          <p className="text-gray-500 text-sm">
            OT Security Training & Simulation
          </p>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* NAME + COMPANY */}
          <div className="grid grid-cols-2 gap-3">

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-semibold">
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="bg-[#111] text-white text-sm rounded-xl px-4 py-2.5 outline-none border border-[#444] focus:border-[#CD163F] transition placeholder-gray-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-semibold">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="bg-[#111] text-white text-sm rounded-xl px-4 py-2.5 outline-none border border-[#444] focus:border-[#CD163F] transition placeholder-gray-600"
              />
            </div>

          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-semibold">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                ✉
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@company.com"
                className="w-full bg-[#111] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none border border-[#444] focus:border-[#CD163F] transition placeholder-gray-600"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-semibold">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                🔒
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className="w-full bg-[#111] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none border border-[#444] focus:border-[#CD163F] transition placeholder-gray-600"
              />
            </div>
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold">
              Select role
            </label>
            <div className="flex gap-2">
              {["employee", "client", "guest"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r })}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition
                    ${formData.role === r
                      ? "bg-[#CD163F] text-white"
                      : "bg-[#111] border border-[#444] text-gray-400 hover:border-[#CD163F]"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-[#CD163F] hover:opacity-80 transition text-white font-bold py-3 rounded-xl mt-2 text-sm"
          >
            Create account
          </button>

        </form>

        {/* SIGN IN */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#CD163F] font-bold hover:underline"
          >
            Sign in
          </button>
        </p>

      </div>

    </div>
  );
}