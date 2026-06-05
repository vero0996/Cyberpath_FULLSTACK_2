import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth } from "../Context/AuthContext";

export default function DashboardGuest({ onLogout }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userRole = user?.role || "guest";
  const userName = user?.username || "User";
  const [scrolled, setScrolled] = useState(false);

  const [kpis, setKpis] = useState([]);

  const historial = [...kpis].reverse().slice(-5);
  const ultimoKpi = kpis.length > 0 ? kpis[0] : null;

  const rockwellLink =
    userRole === "employee"
      ? "https://www.rockwellautomation.com/en-us/capabilities/industrial-cybersecurity.html"
      : userRole === "client"
      ? "https://www.rockwellautomation.com/en-us/products/software/factorytalk.html"
      : "https://www.rockwellautomation.com/en-us/capabilities.html";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  if (!user?.id) return; 
  const cargarKpis = async () => {
    try {
      const response = await fetch(`http://localhost:3000/kpi/${user.id}`);
      const data = await response.json();
      if (Array.isArray(data)) setKpis(data);
      else setKpis([]);
    } catch (error) {
      console.error(error);
    }
  };
  cargarKpis();
}, [user?.id]); 

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
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="border-t border-[#333] pt-4 flex flex-col gap-3">
                <button onClick={() => navigate("/settings")} className="w-full bg-[#222] hover:bg-[#333] transition py-2 rounded-xl font-bold">Settings</button>
                <button onClick={logout} className="w-full bg-[#CD163F] hover:bg-[#a80f32] transition py-2 rounded-xl font-bold">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 text-center px-10 bg-[#1A1A1A]">
        <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">Guest Panel</p>
        <h2 className="text-5xl font-bold">Guest Analytics Dashboard</h2>
        <p className="text-gray-400 mt-4 text-lg">Explore demo simulations and discover Rockwell's cybersecurity solutions.</p>
      </section>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-10 py-16">

        {[
          {
            value: ultimoKpi
              ? `${ultimoKpi.progreso}%`
              : "0%",
            label: "Demo Completion",
          },

          {
            value: ultimoKpi
              ? `${ultimoKpi.tasa_retencion}%`
              : "0%",
            label: "Security Awareness",
          },

          {
            value: ultimoKpi
              ? ultimoKpi.amenazas_detectadas
              : 0,
            label: "Threats Identified",
          },

          {
            value: ultimoKpi
              ? `${ultimoKpi.tiempo_jugado}s`
              : "0s",
            label: "Demo Time",
          },

        ].map((k) => (

          <div
            key={k.label}
            className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#333] hover:border-[#CD163F] transition"
          >
            <h3 className="text-5xl font-bold text-[#CD163F]">
              {k.value}
            </h3>

            <p className="text-xl mt-4 text-gray-300">
              {k.label}
            </p>
          </div>

        ))}

      </section>

      {/* CHARTS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-10 pb-16">

        {/* CYBERSECURITY AWARENESS */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#333]">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Cybersecurity Awareness
          </h3>

          {kpis.length > 0 ? (
            <>
              {(() => {
                const awareness =
                  Math.round(
                    kpis.reduce(
                      (acc, kpi) => acc + Number(kpi.progreso || 0),
                      0
                    ) / kpis.length
                  );

                return (
                  <div className="flex flex-col items-center justify-center">

                    {/* Círculo */}
                    <div className="relative w-52 h-52 mb-6">

                      <svg
                        className="w-52 h-52 -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#333"
                          strokeWidth="8"
                          fill="none"
                        />

                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#CD163F"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset={
                            251.2 - (251.2 * awareness) / 100
                          }
                          strokeLinecap="round"
                        />
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-[#CD163F]">
                          {awareness}%
                        </span>

                        <span className="text-gray-400 text-sm">
                          Awareness Score
                        </span>
                      </div>
                    </div>

                    {/* Texto */}
                    <div className="text-center max-w-md">
                      <p className="text-gray-300">
                        Based on your historical training progress across all
                        cybersecurity simulations.
                      </p>

                      <p className="mt-4 text-[#CD163F] font-bold">
                        {awareness >= 80
                          ? "Excellent Security Awareness"
                          : awareness >= 60
                          ? "Good Security Awareness"
                          : awareness >= 40
                          ? "Needs Improvement"
                          : "Critical Training Required"}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </>
          ) : (
            <p className="text-center text-gray-500">
              No KPI data available.
            </p>
          )}
        </div>

        {/* CURRENT PERFORMANCE */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#333]">
          <h3 className="text-2xl font-bold mb-10 text-center">
            Current Performance
          </h3>

          {kpis.length > 0 ? (
            <div className="space-y-6">

              <div>
                <div className="flex justify-between mb-2">
                  <span>Threat Detection</span>
                  <span>
                    {Math.min(
                      100,
                      kpis.reduce(
                        (acc, k) => acc + Number(k.amenazas_detectadas || 0),
                        0
                      )
                    )}
                    %
                  </span>
                </div>

                <div className="w-full bg-[#333] rounded-full h-3">
                  <div
                    className="bg-[#CD163F] h-3 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        kpis.reduce(
                          (acc, k) =>
                            acc + Number(k.amenazas_detectadas || 0),
                          0
                        )
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Training Progress</span>
                  <span>
                    {Math.round(
                      kpis.reduce(
                        (acc, k) => acc + Number(k.progreso || 0),
                        0
                      ) / kpis.length
                    )}
                    %
                  </span>
                </div>

                <div className="w-full bg-[#333] rounded-full h-3">
                  <div
                    className="bg-[#790A23] h-3 rounded-full"
                    style={{
                      width: `${Math.round(
                        kpis.reduce(
                          (acc, k) => acc + Number(k.progreso || 0),
                          0
                        ) / kpis.length
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Retention Rate</span>
                  <span>
                    {Math.round(
                      kpis.reduce(
                        (acc, k) =>
                          acc + Number(k.tasa_retencion || 0),
                        0
                      ) / kpis.length
                    )}
                    %
                  </span>
                </div>

                <div className="w-full bg-[#333] rounded-full h-3">
                  <div
                    className="bg-[#4A0515] h-3 rounded-full"
                    style={{
                      width: `${Math.round(
                        kpis.reduce(
                          (acc, k) =>
                            acc + Number(k.tasa_retencion || 0),
                          0
                        ) / kpis.length
                      )}%`,
                    }}
                  />
                </div>
              </div>

            </div>
          ) : (
            <p className="text-center text-gray-500">
              No KPI data available.
            </p>
          )}
        </div>

      </section>

      {/* CTA */}
      <section className="flex justify-center pb-16 px-10">
        <a href={rockwellLink} target="_blank" rel="noopener noreferrer"
          className="bg-[#CD163F] hover:bg-[#a80f32] transition px-10 py-4 rounded-2xl text-xl font-bold">
          Explore Rockwell Solutions
        </a>
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