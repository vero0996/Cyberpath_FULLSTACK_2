import { Link } from "react-router-dom";
import UnityGame from "../components/UnityGame";

export default function GamePage() {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-[#2A2A2A] text-white font-barlow">

      {/* NAVBAR */}
      <header className="bg-[#111] h-20 flex items-center justify-between px-10 shadow-md">

        <h1 className="text-2xl font-bold">
          CyberSec: Rockwell Automation
        </h1>

        <nav className="flex gap-10 text-lg font-bold">

          <Link
            to="/"
            className="hover:text-[#CD163F]"
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
            to={`/dashboard/${role}`}
            className="hover:text-[#CD163F]"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="hover:text-[#CD163F]"
          >
            Logout
          </Link>

        </nav>
      </header>

      {/* CONTENT */}
      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-[320px] bg-[#1A1A1A] min-h-[calc(100vh-80px)] p-6">

          <h2 className="text-2xl font-bold text-center mb-8">
            Select Scenario
          </h2>

          <div className="flex flex-col gap-6">

            <ScenarioCard
              title="Industrial Plant"
              active
            />

            <ScenarioCard
              title="Corporate Network"
            />

            <ScenarioCard
              title="In the Wild"
            />

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