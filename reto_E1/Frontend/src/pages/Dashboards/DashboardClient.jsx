// DashboardClient.jsx

import { useNavigate } from "react-router-dom";

export default function DashboardClient({ onLogout }) {

  const navigate = useNavigate();

  const userRole =
    localStorage.getItem("userRole") || "guest";

  const userName =
    localStorage.getItem("userName") || "User";

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
            <div className="absolute right-0 mt-3 w-64 bg-[#1A1A1A] rounded-2xl shadow-2xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#333]">

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
          Client Dashboard
        </h2>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12 px-8">

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">

          <h3 className="text-5xl font-bold text-[#CD163F]">
            78%
          </h3>

          <p className="text-xl mt-4">
            Training Progress
          </p>

        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">

          <h3 className="text-4xl font-bold text-[#CD163F]">
            2.5
          </h3>

          <p className="text-xl mt-4">
            Security Score
          </p>

        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">

          <h3 className="text-4xl font-bold text-[#CD163F]">
            1000
          </h3>

          <p className="text-xl mt-4">
            Threats Identified
          </p>

        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">

          <h3 className="text-4xl font-bold text-[#CD163F]">
            13
          </h3>

          <p className="text-xl mt-4">
            Recommended Solutions
          </p>

        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12 px-8">

        {/* CHART 1 */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 shadow-md">

          <h3 className="text-3xl font-bold mb-8 text-center">
            Learning Progress
          </h3>

          <div className="flex items-end justify-center gap-8 h-[250px]">

            <div className="w-20 bg-[#CD163F] h-[200px] rounded-t-lg"></div>

            <div className="w-20 bg-[#790A23] h-[120px] rounded-t-lg"></div>

            <div className="w-20 bg-[#4A0515] h-[60px] rounded-t-lg"></div>

          </div>

        </div>

        {/* CHART 2 */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 shadow-md">

          <h3 className="text-3xl font-bold mb-10 text-center">
            Risk Awareness
          </h3>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-2">
                <span>High</span>
                <span>40%</span>
              </div>

              <div className="w-full bg-[#333] rounded-full h-4">

                <div className="bg-[#CD163F] h-4 rounded-full w-[40%]"></div>

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">
                <span>Medium</span>
                <span>35%</span>
              </div>

              <div className="w-full bg-[#333] rounded-full h-4">

                <div className="bg-[#790A23] h-4 rounded-full w-[35%]"></div>

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">
                <span>Low</span>
                <span>25%</span>
              </div>

              <div className="w-full bg-[#333] rounded-full h-4">

                <div className="bg-[#4A0515] h-4 rounded-full w-[25%]"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

        {/* ROCKWELL BUTTONS */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 pb-10">

          {/* ROCKWELL MAIN PAGE */}
          <a
            href="https://www.rockwellautomation.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-[#CD163F]
              hover:bg-[#a80f32]
              transition
              px-10
              py-4
              rounded-2xl
              text-xl
              font-bold
              shadow-lg
            "
          >
            Explore Rockwell
          </a>

          {/* CONTACT / CONSULTATION */}
          <a
            href="https://www.rockwellautomation.com/en-us/company/about-us/contact-us.html"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-[#CD163F]
              hover:bg-[#a80f32]
              transition
              px-10
              py-4
              rounded-2xl
              text-xl
              font-bold
              shadow-lg
            "
          >
            Request Consultation
          </a>

          {/* PRODUCTS */}
          <a
            href="https://www.rockwellautomation.com/en-us/products.html"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-[#CD163F]
              hover:bg-[#a80f32]
              transition
              px-10
              py-4
              rounded-2xl
              text-xl
              font-bold
              shadow-lg
            "
          >
            Product Recommendations
          </a>

        </div>

    </div>
  );
}