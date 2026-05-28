// DashboardGuest.jsx

import { useNavigate } from "react-router-dom";

export default function DashboardGuest({ onLogout }) {

  const navigate = useNavigate();

  const userRole =
    localStorage.getItem("userRole") || "guest";

  const userName =
    localStorage.getItem("userName") || "User";

  // ROCKWELL RECOMMENDATION LOGIC
  const rockwellLink =
    userRole === "employee"
      ? "https://www.rockwellautomation.com/en-us/capabilities/industrial-cybersecurity.html"
      : userRole === "client"
      ? "https://www.rockwellautomation.com/en-us/products/software/factorytalk.html"
      : "https://www.rockwellautomation.com/en-us/capabilities.html";

  return (
    <div className="bg-[#2A2A2A] min-h-screen text-white">

      {/* NAVBAR */}
      <nav className="bg-[#111] px-10 py-6 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold">
          CyberSec: Rockwell Automation
        </h1>

        <div className="flex gap-8 items-center text-lg font-semibold">

          <button
            onClick={() => navigate("/")}
            className="hover:text-[#CD163F] transition"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/game")}
            className="hover:text-[#CD163F] transition"
          >
            Game
          </button>

          <button className="text-[#CD163F]">
            Dashboard
          </button>

          {/* PROFILE */}
          <div className="relative group">

            {/* PROFILE BUTTON */}
            <div className="flex items-center gap-3 cursor-pointer bg-[#1A1A1A] px-4 py-2 rounded-xl hover:bg-[#222] transition">

              {/* AVATAR */}
              <div className="w-10 h-10 rounded-full bg-[#CD163F] flex items-center justify-center font-bold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>

              {/* USER INFO */}
              <div className="text-left leading-tight">

                <p className="text-sm font-bold">
                  {userName}
                </p>

                <p className="text-xs text-gray-400 capitalize">
                  {userRole}
                </p>

              </div>

            </div>

            {/* DROPDOWN */}
            <div className="absolute right-0 mt-3 w-72 bg-[#1A1A1A] rounded-2xl shadow-2xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#333]">

              <div className="flex items-center gap-4 mb-4">

                <div className="w-14 h-14 rounded-full bg-[#CD163F] flex items-center justify-center text-2xl font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {userName}
                  </h3>

                </div>

              </div>

              <div className="border-t border-[#333] pt-4">

                <button
                  onClick={onLogout}
                  className="w-full bg-[#CD163F] hover:bg-[#a80f32] transition py-2 rounded-xl font-bold"
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </nav>

      {/* TITLE */}
      <div className="mt-12 text-center">

        <h2 className="text-4xl font-bold">
          Guest Analytics Dashboard
        </h2>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12 px-10">

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">

          <h3 className="text-5xl font-bold text-[#CD163F]">
            50%
          </h3>

          <p className="text-xl mt-4">
            Demo Completion
          </p>

        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">

          <h3 className="text-3xl font-bold text-[#CD163F]">
            Lv. 1
          </h3>

          <p className="text-xl mt-4">
            Security Awareness
          </p>

        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">

          <h3 className="text-4xl font-bold text-[#CD163F]">
            3
          </h3>

          <p className="text-xl mt-4">
            Featured Simulations
          </p>

        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">

          <h3 className="text-4xl font-bold text-[#CD163F]">
            13
          </h3>

          <p className="text-xl mt-4">
            Available Trainings
          </p>

        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12 px-10">

        {/* Awareness */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 shadow-md">

          <h3 className="text-3xl font-bold mb-8 text-center">
            Cybersecurity Awareness
          </h3>

          <div className="flex items-end justify-center gap-8 h-[250px]">

            <div className="w-20 bg-[#CD163F] h-[200px] rounded-t-lg"></div>

            <div className="w-20 bg-[#790A23] h-[120px] rounded-t-lg"></div>

            <div className="w-20 bg-[#4A0515] h-[60px] rounded-t-lg"></div>

          </div>

        </div>

        {/* Popular Simulations */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 shadow-md">

          <h3 className="text-3xl font-bold mb-10 text-center">
            Popular Simulations
          </h3>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-2">
                <span>Phishing Detection</span>
                <span>40%</span>
              </div>

              <div className="w-full bg-[#333] rounded-full h-4">
                <div className="bg-[#CD163F] h-4 rounded-full w-[40%]"></div>
              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">
                <span>Incident Response</span>
                <span>35%</span>
              </div>

              <div className="w-full bg-[#333] rounded-full h-4">
                <div className="bg-[#790A23] h-4 rounded-full w-[35%]"></div>
              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">
                <span>OT Device Security</span>
                <span>25%</span>
              </div>

              <div className="w-full bg-[#333] rounded-full h-4">
                <div className="bg-[#4A0515] h-4 rounded-full w-[25%]"></div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CTA BUTTON */}
      <div className="flex justify-center mt-12 pb-16">

        <a
          href={rockwellLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#CD163F] hover:bg-[#a80f32] transition px-10 py-4 rounded-2xl text-xl font-bold shadow-lg text-center"
        >
          Explore Rockwell Solutions
        </a>

      </div>

    </div>
  );
}