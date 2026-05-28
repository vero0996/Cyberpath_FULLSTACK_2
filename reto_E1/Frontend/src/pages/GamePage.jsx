import { Link } from "react-router-dom";
import UnityGame from "../components/UnityGame";

export default function GamePage() {
   const userRole =
    localStorage.getItem("userRole");

   const userName = localStorage.getItem("userName") || "User";

  return (
    <div className="min-h-screen bg-[#2A2A2A] text-white font-barlow">

      {/* NAVBAR */}
     <header className="bg-[#111] px-10 py-5 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold">
          CyberSec: Rockwell Automation
        </h1>

        <nav className="flex gap-8 items-center text-lg font-semibold">

          <Link
            to="/"
            className="hover:text-[#CD163F] transition"
          >
            Home
          </Link>

          <Link
            to="/game"
            className="text-[#CD163F]"
          >
            Game
          </Link>

          <Link
            to={`/dashboard/${userRole}`}
            className="hover:text-[#CD163F] transition"
          >
            Dashboard
          </Link>

          <div className="relative group">

            {/* PROFILE */}
            <div className="flex items-center gap-3 cursor-pointer bg-[#1A1A1A] px-4 py-2 rounded-xl hover:bg-[#222] transition">

              <div className="w-10 h-10 rounded-full bg-[#CD163F] flex items-center justify-center font-bold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>

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
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="w-full bg-[#CD163F] hover:bg-[#a80f32] transition py-2 rounded-xl font-bold"
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        </nav>

      </header>

      {/* CONTENT */}
      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-[320px] bg-[#1A1A1A] min-h-[calc(100vh-80px)] p-6 flex flex-col">

          {/* TITLE */}
          <div className="mb-10">

            <h2 className="text-3xl font-bold">
              Cyber Defense
            </h2>

            <p className="text-gray-400 mt-2">
              Real-Time OT Security Simulation
            </p>

          </div>

          {/* GAME INFO */}
          <div className="bg-[#2A2A2A] rounded-2xl p-5 space-y-5">

            <div>
              <p className="text-gray-400 text-sm">
                Difficulty
              </p>

              <h3 className="text-xl font-bold">
                Advanced
              </h3>
            </div>

            <div>
              <p className="text-gray-400 text-sm">
                Environment
              </p>

              <h3 className="text-xl font-bold">
                Industrial Plant
              </h3>
            </div>

            <div>
              <p className="text-gray-400 text-sm">
                Threat Type
              </p>

              <h3 className="text-xl font-bold">
                Network Intrusion
              </h3>
            </div>

          </div>

          {/* OBJECTIVES */}
          <div className="mt-8 bg-[#2A2A2A] rounded-2xl p-5">

            <h3 className="text-xl font-bold mb-4">
              Mission Objectives
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                • Detect malicious activity
              </li>

              <li>
                • Protect industrial systems
              </li>

              <li>
                • Prevent operational shutdown
              </li>

              <li>
                • Respond to cyber threats
              </li>

            </ul>

          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 p-8">

          <div className="bg-[#212121] rounded-2xl p-8 min-h-[850px]">

            <h2 className="text-3xl font-bold text-center mb-8">
              Game Preview (Unity WebGL)
            </h2>

            <UnityGame />

          </div>
        </main>
      </div>
    </div>
  );
}

function ScenarioCard({ title, active = false }) {
  return (
    <div
      className={`rounded-xl p-5 flex items-center justify-between shadow-md ${
        active
          ? "bg-[#C0B3B3]"
          : "bg-[#2A2A2A]"
      }`}
    >
      <p className="text-lg font-bold">
        {title}
      </p>

      <button className="bg-[#CD163F] px-5 py-1 rounded-lg font-bold">
        Select
      </button>
    </div>
  );
}