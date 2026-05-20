import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupSignIn from "../pages/PopUpLogin";

export default function Home({ isLoggedIn, setIsLoggedIn }) {

  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole") || "guest";

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleDashboardAccess = () => {
    if (isLoggedIn) {
      navigate(`/dashboard/${userRole}`);
    } else {
      setShowPopup(true);
    }
  };

  const handleGameAccess = () => {
    if (isLoggedIn) {
      navigate("/game");
    } else {
      setShowPopup(true);
    }
  };

  return (
    <div className="bg-[#2A2A2A] min-h-screen text-white">

      {/* NAVBAR */}
      <nav className="bg-[#111] px-10 py-6 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold">
          CyberSec Platform
        </h1>

        <div className="flex gap-10 text-lg font-semibold">

          <p className="text-[#CD163F] cursor-pointer">
            Home
          </p>

          <p
            onClick={handleGameAccess}
            className="hover:text-[#CD163F] cursor-pointer"
          >
            Game
          </p>

          <p
            onClick={handleDashboardAccess}
            className="hover:text-[#CD163F] cursor-pointer"
          >
            Dashboard
          </p>

          {isLoggedIn ? (
            <p
              onClick={handleLogout}
              className="hover:text-[#CD163F] cursor-pointer"
            >
              Log out
            </p>
          ) : (
            <p
              onClick={() => navigate("/login")}
              className="hover:text-[#CD163F] cursor-pointer"
            >
              Sign in
            </p>
          )}

        </div>

      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center mt-20 px-6">

        <h1 className="text-5xl font-bold max-w-3xl">
          Cybersecurity OT Training Platform
        </h1>

        <p className="text-gray-400 text-lg mt-6 max-w-4xl">
          Learn, simulate and analyze cybersecurity scenarios
          in operational environments.
        </p>

      </section>

      {/* MAIN */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-14 mt-20 pb-20">

        {/* LEFT */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 shadow-lg">

          <div className="w-52 h-2 bg-[#CD163F] rounded-full mb-8"></div>

          <h2 className="text-3xl font-bold">
            Industrial Simulation
          </h2>

          <p className="text-gray-400 mt-2">
            Cybersecurity Training Environment
          </p>

          <div className="bg-[#2A2A2A] rounded-xl mt-8 p-4 flex justify-center">

            <img
              src="/Splash12.png"
              alt="Game Preview"
              className="rounded-lg w-full max-w-md"
            />

          </div>

          <div className="flex justify-center mt-8">

            <button
              onClick={handleGameAccess}
              className="bg-[#CD163F] px-8 py-3 rounded-xl font-bold hover:opacity-80 transition"
            >
              Launch Demo
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between">

          <div>

            <h2 className="text-3xl font-bold mb-6">
              About Rockwell Automation
            </h2>

            <p className="text-gray-400 leading-8 text-lg">

              Rockwell Automation is a global leader in industrial
              automation and digital transformation.

              <br /><br />

              The company provides advanced technologies that improve
              productivity, sustainability, and efficiency across industries.

              <br /><br />

              Through its integrated control systems and smart
              manufacturing solutions, Rockwell enables organizations
              to simulate, monitor, and optimize industrial processes
              in real time.

            </p>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-6 mt-10">

            <button
              onClick={handleGameAccess}
              className="bg-[#CD163F] px-8 py-4 rounded-xl font-bold hover:opacity-80 transition"
            >
              Start Simulation
            </button>

            <button
              onClick={handleDashboardAccess}
              className="bg-[#CD163F] px-8 py-4 rounded-xl font-bold hover:opacity-80 transition"
            >
              View Dashboard
            </button>

          </div>

        </div>

      </section>

      {/* POPUP */}
      {showPopup && (
        <PopupSignIn onClose={() => setShowPopup(false)} />
      )}

    </div>
  );
}