// DashboardClient.jsx

import { useNavigate } from "react-router-dom";

export default function DashboardClient({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#2A2A2A] min-h-screen w-full text-white px-8 py-6">
      {/* Navbar */}
      <div className="bg-[#111] rounded-2xl px-8 py-5 flex items-center justify-between shadow-lg">
        <h1 className="text-2xl font-bold">CyberSec Platform</h1>

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

          <button
            onClick={onLogout}
            className="hover:text-[#CD163F] transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="mt-12 text-center">
        <h2 className="text-4xl font-bold">
          Client Dashboard
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">
          <h3 className="text-5xl font-bold text-[#CD163F]">78%</h3>
          <p className="text-xl mt-4">Training Progress</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">
          <h3 className="text-4xl font-bold text-[#CD163F]">2.5</h3>
          <p className="text-xl mt-4">Security Score</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">
          <h3 className="text-4xl font-bold text-[#CD163F]">1000</h3>
          <p className="text-xl mt-4">Threats Identified</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center shadow-md">
          <h3 className="text-4xl font-bold text-[#CD163F]">13</h3>
          <p className="text-xl mt-4">Recommended Solutions</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
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

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 pb-10">
        <button className="bg-[#CD163F] hover:bg-[#a80f32] transition px-10 py-4 rounded-2xl text-xl font-bold shadow-lg">
          View Rockwell Solutions
        </button>

        <button className="bg-[#CD163F] hover:bg-[#a80f32] transition px-10 py-4 rounded-2xl text-xl font-bold shadow-lg">
          Request Consultation
        </button>

        <button className="bg-[#CD163F] hover:bg-[#a80f32] transition px-10 py-4 rounded-2xl text-xl font-bold shadow-lg">
          Product Recommendation
        </button>
      </div>
    </div>
  );
}