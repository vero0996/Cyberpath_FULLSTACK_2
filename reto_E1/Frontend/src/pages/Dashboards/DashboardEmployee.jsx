import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DashboardEmployee({ onLogout }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "guest";
  const userName = localStorage.getItem("userName") || "User";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#2A2A2A] min-h-screen text-white">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-10 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-[#111]/80 backdrop-blur-md shadow-lg border-b border-white/5" : "bg-[#111]"
      }`}>
        <div className="flex items-center gap-3">
          <img src="/ROK-331842c1.png" alt="Rockwell Automation" className="h-8 w-auto" />
          <h1 className="text-2xl font-bold">Rockwell Automation</h1>
        </div>
        <div className="flex gap-8 items-center text-lg font-semibold">
          <button onClick={() => navigate("/")} className="hover:text-[#CD163F] transition">Home</button>
          <button onClick={() => navigate("/game")} className="hover:text-[#CD163F] transition">Game</button>
          <button className="text-[#CD163F]">Dashboard</button>
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
                <button onClick={() => navigate("/settings")} className="w-full bg-[#222] hover:bg-[#333] transition py-2 rounded-xl font-bold">Settings</button>
                <button onClick={onLogout} className="w-full bg-[#CD163F] hover:bg-[#a80f32] transition py-2 rounded-xl font-bold">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 text-center px-10 bg-[#1A1A1A]">
        <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">Employee Panel</p>
        <h2 className="text-5xl font-bold">Employee Dashboard</h2>
        <p className="text-gray-400 mt-4 text-lg">Track your training progress, threat response, and security performance.</p>
      </section>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-10 py-16">
        {[
          { value: "2",     label: "Modules Completed" },
          { value: "2.5s",  label: "Avg Response Time" },
          { value: "1,000", label: "Threats Solved" },
          { value: "13%",   label: "Security Accuracy" },
        ].map((k) => (
          <div key={k.label} className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#333] hover:border-[#CD163F] transition">
            <h3 className="text-5xl font-bold text-[#CD163F]">{k.value}</h3>
            <p className="text-xl mt-4 text-gray-300">{k.label}</p>
          </div>
        ))}
      </section>

      {/* CHARTS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-10 pb-16">
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#333]">
          <h3 className="text-2xl font-bold mb-8 text-center">Team Performance</h3>
          <div className="flex items-end justify-center gap-8 h-[250px]">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 bg-[#CD163F] h-[200px] rounded-t-lg"></div>
              <span className="text-gray-400 text-sm">Week 1</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 bg-[#790A23] h-[120px] rounded-t-lg"></div>
              <span className="text-gray-400 text-sm">Week 2</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 bg-[#4A0515] h-[60px] rounded-t-lg"></div>
              <span className="text-gray-400 text-sm">Week 3</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#333]">
          <h3 className="text-2xl font-bold mb-10 text-center">Weakness Areas</h3>
          <div className="space-y-6">
            {[
              { label: "Phishing Detection", pct: "40%", color: "bg-[#CD163F]", w: "w-[40%]" },
              { label: "Incident Response",  pct: "35%", color: "bg-[#790A23]", w: "w-[35%]" },
              { label: "OT Device Security", pct: "25%", color: "bg-[#4A0515]", w: "w-[25%]" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between mb-2">
                  <span>{b.label}</span><span>{b.pct}</span>
                </div>
                <div className="w-full bg-[#333] rounded-full h-3">
                  <div className={`${b.color} ${b.w} h-3 rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUTTONS */}
      <section className="flex flex-wrap justify-center gap-6 pb-16 px-10">
        <button className="bg-[#CD163F] hover:bg-[#a80f32] transition px-10 py-4 rounded-2xl text-xl font-bold">Continue Training</button>
        <button className="bg-[#1A1A1A] border border-[#444] hover:border-[#CD163F] transition px-10 py-4 rounded-2xl text-xl font-bold">View Report</button>
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