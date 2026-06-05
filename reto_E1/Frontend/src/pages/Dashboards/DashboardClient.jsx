import { useAuth } from "../Context/AuthContext";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardClient({ onLogout }) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const userRole = user?.role || "guest";
  const userName = user?.username || "User";

  const userId = user?.id;

  const [scrolled, setScrolled] = useState(false);

  const [kpis, setKpis] = useState([]);

  const chartData = Array.isArray(kpis) ? [...kpis].reverse().map((kpi) => ({
    fecha: `${new Date(kpi.fecha_registro).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} (${kpi.id_kpi})`,
    progreso: Number(kpi.progreso),
    retencion: Number(kpi.tasa_retencion),
  })) : [];

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  useEffect(() => {
  if (!user?.id) return;

  fetch(`http://localhost:3000/kpi/${user.id}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) setKpis(data);
      else setKpis([]); 
    })
    .catch((err) => console.error(err));
}, [user?.id]); 

  const ultimoKpi =
  kpis.length > 0 ? kpis[0] : null;

  const learningProgress = [
    {
      label: "Progress",
      value: Number(ultimoKpi?.progreso || 0),
      color: "bg-[#CD163F]",
    },
    {
      label: "Retention",
      value: Number(ultimoKpi?.tasa_retencion || 0),
      color: "bg-[#790A23]",
    },
    {
      label: "Threats",
      value: Math.min(
        Number(ultimoKpi?.amenazas_detectadas || 0) * 5,
        100
      ),
      color: "bg-[#4A0515]",
    },
  ];

  const riskAwareness = [
    {
      label: "High",
      value: Number(ultimoKpi?.amenazas_detectadas || 0),
      color: "bg-[#CD163F]",
    },
    {
      label: "Medium",
      value: Number(ultimoKpi?.progreso || 0),
      color: "bg-[#790A23]",
    },
    {
      label: "Low",
      value: Number(ultimoKpi?.tasa_retencion || 0),
      color: "bg-[#4A0515]",
    },
  ];

  const historialProgreso = [...kpis]
  .reverse()
  .map((kpi) => ({
    fecha: new Date(kpi.fecha_registro)
      .toLocaleDateString(),
    progreso: Number(kpi.progreso),
  }));

  const historialAmenazas = [...kpis]
  .reverse()
  .map((kpi) => ({
    fecha: new Date(kpi.fecha_registro)
      .toLocaleDateString(),
    amenazas: Number(kpi.amenazas_detectadas),
  }));

  const awareness =
  kpis.length > 0
    ? Math.round(
        (
          kpis.reduce(
            (acc, k) => acc + Number(k.progreso || 0),
            0
          ) /
            kpis.length +
          kpis.reduce(
            (acc, k) =>
              acc + Number(k.tasa_retencion || 0),
            0
          ) /
            kpis.length
        ) / 2
      )
    : 0;

  const awarenessData = [
    {
      name: "Awareness",
      value: awareness,
      fill: "#CD163F",
    },
  ];

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
        <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">Client Panel</p>
        <h2 className="text-5xl font-bold">Client Dashboard</h2>
        <p className="text-gray-400 mt-4 text-lg">Monitor your training progress, risk awareness, and security metrics.</p>
      </section>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-10 py-16">
        {[
          {
            value: ultimoKpi
              ? `${ultimoKpi.progreso}%`
              : "0%",
            label: "Training Progress",
          },
          {
            value: ultimoKpi
              ? `${ultimoKpi.tasa_retencion}%`
              : "0%",
            label: "Retention Rate",
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
            label: "Time Played",
          },
        ].map((k) => (
          <div key={k.label} className="bg-[#1A1A1A] rounded-2xl p-6 text-center border border-[#333] hover:border-[#CD163F] transition">
            <h3 className="text-5xl font-bold text-[#CD163F]">{k.value}</h3>
            <p className="text-xl mt-4 text-gray-300">{k.label}</p>
          </div>
        ))}
      </section>

      {/* CHARTS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-10 pb-16">

        {/* HISTORICAL PROGRESS */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#333]">
          <h3 className="text-2xl font-bold mb-6">
            Historical Progress
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CD163F" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#CD163F" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#333" strokeDasharray="3 3" />

              <XAxis
                dataKey="fecha"
                stroke="#999"
              />

              <YAxis
                stroke="#999"
                domain={[0, 100]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #333",
                  borderRadius: "12px",
                }}
              />

              <Area
                type="monotone"
                dataKey="progreso"
                stroke="#CD163F"
                fillOpacity={1}
                fill="url(#performanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* RISK AWARENESS */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#333]">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Risk Awareness
          </h3>

          <div className="text-center mb-8">
            <h2 className="text-7xl font-bold text-[#CD163F]">
              {awareness}%
            </h2>

            <p className="text-gray-400 mt-2">
              Security Awareness Score
            </p>
          </div>

          <div className="w-full bg-[#333] rounded-full h-5 overflow-hidden">
            <div
              className="bg-[#CD163F] h-5 rounded-full transition-all duration-1000"
              style={{ width: `${awareness}%` }}
            />
          </div>

          <div className="mt-6 text-center">
            <span className="px-4 py-2 rounded-xl bg-[#CD163F]/20 text-[#CD163F] font-bold">
              {awareness >= 80
                ? "Excellent"
                : awareness >= 60
                ? "Good"
                : awareness >= 40
                ? "Fair"
                : "Critical"}
            </span>
          </div>
        </div>

      </section>

      {/* ROCKWELL BUTTONS */}
      <section className="flex flex-wrap justify-center gap-6 pb-16 px-10">
        <a href="https://www.rockwellautomation.com/" target="_blank" rel="noopener noreferrer"
          className="bg-[#CD163F] hover:bg-[#a80f32] transition px-10 py-4 rounded-2xl text-xl font-bold">
          Explore Rockwell
        </a>
        <a href="https://www.rockwellautomation.com/en-us/company/about-us/contact-us.html" target="_blank" rel="noopener noreferrer"
          className="bg-[#1A1A1A] border border-[#444] hover:border-[#CD163F] transition px-10 py-4 rounded-2xl text-xl font-bold">
          Request Consultation
        </a>
        <a href="https://www.rockwellautomation.com/en-us/products.html" target="_blank" rel="noopener noreferrer"
          className="bg-[#1A1A1A] border border-[#444] hover:border-[#CD163F] transition px-10 py-4 rounded-2xl text-xl font-bold">
          Product Recommendations
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