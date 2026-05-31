import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {

  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "guest";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initialUser = {
    username: localStorage.getItem("userName") || "User",
    email:    localStorage.getItem("userEmail") || "user@email.com",
    role:     localStorage.getItem("userRole")  || "guest",
  };

  const [section, setSection]           = useState("profile");
  const [profile, setProfile]           = useState({ username: initialUser.username, email: initialUser.email });
  const [passwords, setPasswords]       = useState({ current: "", new: "", confirm: "" });
  const [selectedRole, setSelectedRole] = useState(initialUser.role);

  const handleSaveProfile = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: profile.username, email: profile.email })
      });
      const data = await response.json();
      alert(data.message);
      localStorage.setItem("userName",  profile.username);
      localStorage.setItem("userEmail", profile.email);
    } catch (err) { console.error(err); }
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) { alert("Passwords do not match"); return; }
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.new })
      });
      const data = await response.json();
      alert(data.message);
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) { console.error(err); }
  };

  const handleRoleUpdate = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole })
      });
      const data = await response.json();
      alert(data.message);
      localStorage.setItem("userRole", selectedRole);
    } catch (err) { console.error(err); }
  };

  const menuItems = [
    { key: "profile",  label: "Profile" },
    { key: "security", label: "Security" },
    { key: "role",     label: "Account Type" },
    { key: "avatar",   label: "Avatar" },
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
          <button onClick={() => navigate(`/dashboard/${userRole}`)} className="hover:text-[#CD163F] transition">Dashboard</button>
          <button className="text-[#CD163F]">Settings</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-12 px-12 bg-[#1A1A1A]">
        <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">
          My Account
        </p>
        <h1 className="text-5xl font-bold">Account Settings</h1>
        <p className="text-gray-400 mt-3 text-lg">
          Manage your profile, security and account preferences.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row gap-8 p-12">

        {/* SIDEBAR */}
        <div className="w-full lg:w-72 bg-[#1A1A1A] rounded-2xl p-6 border border-[#333] h-fit">

          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-6">
            Navigation
          </h2>

          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className={`text-left px-4 py-3 rounded-xl transition font-semibold ${
                  section === item.key
                    ? "bg-[#CD163F] text-white"
                    : "text-gray-400 hover:bg-[#222] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1 bg-[#1A1A1A] rounded-2xl p-10 border border-[#333]">

          {/* PROFILE */}
          {section === "profile" && (
            <>
              <p className="text-[#CD163F] text-xs font-semibold tracking-widest uppercase mb-2">Profile</p>
              <h2 className="text-3xl font-bold mb-8">Profile Information</h2>

              <div className="space-y-6 max-w-lg">
                <div>
                  <label className="block mb-2 text-gray-400 text-sm font-semibold">Username</label>
                  <input
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="w-full bg-[#2A2A2A] border border-[#333] focus:border-[#CD163F] rounded-xl p-3 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-400 text-sm font-semibold">Email</label>
                  <input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-[#2A2A2A] border border-[#333] focus:border-[#CD163F] rounded-xl p-3 outline-none transition"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="bg-[#CD163F] px-8 py-3 rounded-xl font-bold hover:opacity-80 transition"
                >
                  Save Changes
                </button>
              </div>
            </>
          )}

          {/* SECURITY */}
          {section === "security" && (
            <>
              <p className="text-[#CD163F] text-xs font-semibold tracking-widest uppercase mb-2">Security</p>
              <h2 className="text-3xl font-bold mb-8">Change Password</h2>

              <div className="space-y-5 max-w-lg">
                <div>
                  <label className="block mb-2 text-gray-400 text-sm font-semibold">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full bg-[#2A2A2A] border border-[#333] focus:border-[#CD163F] rounded-xl p-3 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-400 text-sm font-semibold">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="w-full bg-[#2A2A2A] border border-[#333] focus:border-[#CD163F] rounded-xl p-3 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-400 text-sm font-semibold">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="w-full bg-[#2A2A2A] border border-[#333] focus:border-[#CD163F] rounded-xl p-3 outline-none transition"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="bg-[#CD163F] px-8 py-3 rounded-xl font-bold hover:opacity-80 transition"
                >
                  Change Password
                </button>
              </div>
            </>
          )}

          {/* ROLE */}
          {section === "role" && (
            <>
              <p className="text-[#CD163F] text-xs font-semibold tracking-widest uppercase mb-2">Account Type</p>
              <h2 className="text-3xl font-bold mb-3">Select Role</h2>
              <p className="text-gray-400 mb-8">
                Current role: <span className="text-white font-semibold capitalize">{userRole}</span>
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { value: "guest",    label: "Guest",    desc: "Basic access to the platform." },
                  { value: "client",   label: "Client",   desc: "Access dashboards and training resources." },
                  { value: "employee", label: "Employee", desc: "Full simulation and analytics access." },
                ].map((r) => (
                  <div
                    key={r.value}
                    onClick={() => setSelectedRole(r.value)}
                    className={`p-6 rounded-xl border cursor-pointer transition ${
                      selectedRole === r.value
                        ? "bg-[#CD163F] border-[#CD163F]"
                        : "bg-[#222] border-[#333] hover:border-[#CD163F]"
                    }`}
                  >
                    <div className="text-3xl mb-3">{r.icon}</div>
                    <h3 className="font-bold text-xl">{r.label}</h3>
                    <p className="text-gray-300 mt-2 text-sm">{r.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleRoleUpdate}
                className="bg-[#CD163F] px-8 py-3 rounded-xl font-bold hover:opacity-80 transition"
              >
                Update Role
              </button>
            </>
          )}

          {/* AVATAR */}
          {section === "avatar" && (
            <>
              <p className="text-[#CD163F] text-xs font-semibold tracking-widest uppercase mb-2">Avatar</p>
              <h2 className="text-3xl font-bold mb-8">Avatar Settings</h2>

              <div className="flex flex-col items-center max-w-sm mx-auto">
                <div className="w-32 h-32 rounded-full bg-[#CD163F] flex items-center justify-center text-5xl font-bold mb-6 border-4 border-[#333]">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Upload a profile picture. JPG, PNG or GIF accepted.
                </p>
                <input type="file" className="mb-6 text-gray-400 text-sm" />
                <button className="bg-[#CD163F] px-8 py-3 rounded-xl font-bold hover:opacity-80 transition">
                  Upload Avatar
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#111] px-14 py-8 flex justify-between items-center text-gray-500 text-sm border-t border-[#222] mt-8">
        <div className="flex items-center gap-2">
          <img src="/ROK-331842c1.png" alt="Rockwell" className="h-5 w-auto opacity-60" />
          <span>© 2026 Rockwell Automation</span>
        </div>
        <span>CyberPath OT Security Simulation</span>
      </footer>

    </div>
  );
}