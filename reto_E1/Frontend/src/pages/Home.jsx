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

  const userName =
  localStorage.getItem("userName") || "User";

  return (
    <div className="bg-[#2A2A2A] min-h-screen text-white">

      {/* NAVBAR */}
      <nav className="bg-[#111] px-10 py-5 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold">
          CyberSec: Rockwell Automation
        </h1>

        <div className="flex gap-8 items-center text-lg font-semibold">

          <button
            className="text-[#CD163F]"
          >
            Home
          </button>

          <button
            onClick={handleGameAccess}
            className="hover:text-[#CD163F] transition"
          >
            Game
          </button>

          <button
            onClick={handleDashboardAccess}
            className="hover:text-[#CD163F] transition"
          >
            Dashboard
          </button>

          {isLoggedIn ? (

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
                    onClick={handleLogout}
                    className="w-full bg-[#CD163F] hover:bg-[#a80f32] transition py-2 rounded-xl font-bold"
                  >
                    Logout
                  </button>

                </div>

              </div>

            </div>

          ) : (

            <button
              onClick={() => navigate("/login")}
              className="hover:text-[#CD163F] transition"
            >
              Sign In
            </button>

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
            CyberPath: Tower & Defense Simulation
          </h2>

          <p className="text-gray-400 mt-2">
            Cybersecurity Training Environment
          </p>

          <div className="bg-[#2A2A2A] rounded-xl mt-8 p-4 flex justify-center">

            <video width="100%" height="auto" controls>
              <source src="\public\Grabación de pantalla 2026-05-27 194945.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

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