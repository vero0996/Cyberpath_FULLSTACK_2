import { Link, useNavigate } from "react-router-dom";
import UnityGame from "../components/UnityGame";
import { useRef, useState, useEffect } from "react";

export default function GamePage() {
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName") || "User";
  const navigate = useNavigate();

  const gameRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFullscreen = () => {
    if (gameRef.current?.requestFullscreen) {
      gameRef.current.requestFullscreen();
    } else if (gameRef.current?.webkitRequestFullscreen) {
      gameRef.current.webkitRequestFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-[#2A2A2A] text-white">

      {/* NAVBAR TRANSPARENTE */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-10 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? "bg-[#111]/80 backdrop-blur-md shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}>

        <div className="flex items-center gap-3">
          <img src="/ROK-331842c1.png" alt="Rockwell Automation" className="h-8 w-auto" />
          <h1 className="text-2xl font-bold">Rockwell Automation</h1>
        </div>

        <div className="flex gap-8 items-center text-lg font-semibold">

          <Link to="/" className="hover:text-[#CD163F] transition">Home</Link>
          <Link to="/game" className="text-[#CD163F]">Game</Link>
          <Link to={`/dashboard/${userRole}`} className="hover:text-[#CD163F] transition">
            Dashboard
          </Link>

          <div className="relative group">

            <div className="flex items-center gap-3 cursor-pointer bg-[#1A1A1A] px-4 py-2 rounded-xl hover:bg-[#222] transition">
              <div className="w-10 h-10 rounded-full bg-[#CD163F] flex items-center justify-center font-bold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left leading-tight">
                <p className="text-sm font-bold">{userName}</p>
                <p className="text-xs text-gray-400 capitalize">{userRole}</p>
              </div>
            </div>

            <div className="absolute right-0 mt-3 w-64 bg-[#1A1A1A] rounded-2xl shadow-2xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#333]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#CD163F] flex items-center justify-center text-2xl font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{userName}</h3>
                  <p className="text-gray-400 text-sm">{localStorage.getItem("userEmail")}</p>
                </div>
              </div>
              <div className="border-t border-[#333] pt-4 flex flex-col gap-3">
                <button
                  onClick={() => navigate("/settings")}
                  className="w-full bg-[#222] hover:bg-[#333] transition py-2 rounded-xl font-bold"
                >
                  Settings
                </button>
                <button
                  onClick={() => { localStorage.clear(); navigate("/"); }}
                  className="w-full bg-[#CD163F] hover:bg-[#a80f32] transition py-2 rounded-xl font-bold"
                >
                  Logout
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-[#1A1A1A]">

        <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-4">
          OT Security Simulation
        </p>

        <h1 className="text-6xl font-bold max-w-4xl leading-tight mb-6">
          CyberPath: Tower
          <span className="text-[#CD163F]"> & </span>
          Defense
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-10">
          An immersive industrial cybersecurity simulation where you detect,
          respond, and neutralize real-world OT threats in real time.
        </p>

        <div className="flex gap-4 mb-16">
          <a
            href="#game"
            className="bg-[#CD163F] px-8 py-4 rounded-xl font-bold hover:opacity-80 transition text-lg"
          >
            Play Now
          </a>
          <a
            href="#info"
            className="bg-[#2A2A2A] border border-[#444] px-8 py-4 rounded-xl font-bold hover:border-[#CD163F] transition text-lg"
          >
            Learn More
          </a>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-16 text-center">
          {[
            { value: "3",        label: "Difficulty Levels" },
            { value: "Real-Time", label: "Threat Simulation" },
            { value: "OT",       label: "Industrial Focus" },
          ].map((s) => (
            <div key={s.label}>
              <h3 className="text-4xl font-bold text-[#CD163F]">{s.value}</h3>
              <p className="text-gray-400 mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-sm">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>

      </section>

      {/* GAME INFO */}
      <section id="info" className="px-14 py-24 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1">
          <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">
            Mission Brief
          </p>
          <h2 className="text-3xl font-bold mb-6">Game Information</h2>
          <p className="text-gray-400 leading-7">
            Step into a simulated industrial control environment under cyber attack.
            Your mission is to identify threats, protect critical infrastructure,
            and prevent operational shutdown.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          {[
            { label: "Difficulty",   value: "Beginner",           icon: "🎯" },
            { label: "Environment",  value: "Industrial Plant",    icon: "🏭" },
            { label: "Threat Type",  value: "Network Intrusion",   icon: "⚠️" },
            { label: "Mode",         value: "Single Player",       icon: "🎮" },
          ].map((item) => (
            <div key={item.label} className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333] hover:border-[#CD163F] transition">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-gray-400 text-sm mt-3">{item.label}</p>
              <h3 className="text-xl font-bold mt-1">{item.value}</h3>
            </div>
          ))}
        </div>

      </section>

      {/* OBJECTIVES */}
      <section className="px-14 py-16 bg-[#1A1A1A]">

        <div className="text-center mb-12">
          <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">
            Objectives
          </p>
          <h2 className="text-3xl font-bold">Mission Objectives</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { num: "01", text: "Detect malicious activity" },
            { num: "02", text: "Protect industrial systems" },
            { num: "03", text: "Prevent operational shutdown" },
            { num: "04", text: "Respond to cyber threats" },
          ].map((o) => (
            <div key={o.num} className="bg-[#2A2A2A] rounded-2xl p-6 border border-[#333] text-center hover:border-[#CD163F] transition">
              <p className="text-[#CD163F] text-3xl font-bold mb-3">{o.num}</p>
              <p className="text-gray-300 leading-6">{o.text}</p>
            </div>
          ))}
        </div>

      </section>

      {/* GAME SECTION */}
      <section id="game" className="px-14 py-24">

        <div className="text-center mb-10">
          <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">
            Play Now
          </p>
          <h2 className="text-3xl font-bold">Game Preview — Unity WebGL</h2>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#333]">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">CyberPath: Tower & Defense</h3>
              <p className="text-gray-400 text-sm mt-1">Real-Time OT Security Simulation</p>
            </div>
            <button
              onClick={handleFullscreen}
              className="flex items-center gap-2 bg-[#2A2A2A] border border-[#444] hover:border-[#CD163F] px-4 py-2 rounded-xl font-bold transition text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
              Fullscreen
            </button>
          </div>

          <div ref={gameRef} className="w-full" style={{ background: "#000", borderRadius: "12px" }}>
            <UnityGame />
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] px-14 py-8 flex justify-between items-center text-gray-500 text-sm border-t border-[#222]">
        <div className="flex items-center gap-2">
          <img src="/ROK-331842c1.png" alt="Rockwell" className="h-5 w-auto opacity-60" />
          <span>© 2026 Rockwell Automation</span>
        </div>
        <span>CyberPath OT Security Simulation</span>
      </footer>

    </div>
  );
}