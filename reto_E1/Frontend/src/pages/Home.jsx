import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupSignIn from "../pages/PopUpLogin";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-[#1A1A1A] rounded-2xl border transition-all duration-300 ${
        open ? "border-[#CD163F]" : "border-[#333]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left"
      >
        <span className="font-bold text-lg">{question}</span>
        <span className={`text-[#CD163F] text-2xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>

      {open && (
        <div className="px-6 pb-5 text-gray-400 leading-7 border-t border-[#333] pt-4">
          {answer}
        </div>
      )}

    </div>
  );
}

export default function Home({ isLoggedIn, setIsLoggedIn }) {

  const [showPopup, setShowPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole") || "guest";
  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleDashboardAccess = () => {
    if (isLoggedIn) navigate(`/dashboard/${userRole}`);
    else setShowPopup(true);
  };

  const handleGameAccess = () => {
    if (isLoggedIn) navigate("/game");
    else setShowPopup(true);
  };

  return (
    <div className="bg-[#2A2A2A] min-h-screen text-white">

      {/* NAVBAR FIJO TRANSPARENTE */}
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

          <button className="text-[#CD163F]">Home</button>

          <button onClick={handleGameAccess} className="hover:text-[#CD163F] transition">
            Game
          </button>

          <button onClick={handleDashboardAccess} className="hover:text-[#CD163F] transition">
            Dashboard
          </button>

          {isLoggedIn ? (
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
                    onClick={handleLogout}
                    className="w-full bg-[#CD163F] hover:bg-[#a80f32] transition py-2 rounded-xl font-bold"
                  >
                    Logout
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="hover:text-[#CD163F] transition">
              Sign In
            </button>
          )}

        </div>
      </nav>

      {/* HERO — full screen */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">

        <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-4">
          Industrial Cybersecurity
        </p>

        <h1 className="text-6xl font-bold max-w-4xl leading-tight">
          Cybersecurity OT Training
          <span className="text-[#CD163F]"> & </span>
          Simulation Environment
        </h1>

        <p className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed">
          Learn, simulate and analyze cybersecurity scenarios
          in operational technology environments.
        </p>

        <div className="flex gap-4 mt-10">
          <button
            onClick={handleGameAccess}
            className="bg-[#CD163F] px-8 py-4 rounded-xl font-bold hover:opacity-80 transition text-lg"
          >
            Start Simulation
          </button>
          <button
            onClick={handleDashboardAccess}
            className="bg-[#1A1A1A] border border-[#444] px-8 py-4 rounded-xl font-bold hover:border-[#CD163F] transition text-lg"
          >
            View Dashboard
          </button>
        </div>

        {/* scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-sm">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>

      </section>

      {/* DEMO SECTION */}
      <section className="px-14 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* VIDEO */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-1.5 bg-[#CD163F] rounded-full mb-6"></div>
          <h2 className="text-3xl font-bold">CyberPath: Tower & Defense</h2>
          <p className="text-gray-400 mt-2 mb-6">Cybersecurity Training & Simulation</p>

          <div className="bg-[#2A2A2A] rounded-xl p-3">
            <video width="100%" height="auto" autoPlay muted loop playsInline className="rounded-lg">
              <source src="/Grabación de pantalla 2026-05-27 194945.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleGameAccess}
              className="bg-[#CD163F] px-8 py-3 rounded-xl font-bold hover:opacity-80 transition"
            >
              Launch Demo
            </button>
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">
            About Us
          </p>
          <h2 className="text-4xl font-bold mb-6">About Rockwell Automation</h2>
          <p className="text-gray-400 leading-8 text-lg">
            Rockwell Automation is a global leader in industrial automation
            and digital transformation.
          </p>
          <p className="text-gray-400 leading-8 text-lg mt-4">
            The company provides advanced technologies that improve
            productivity, sustainability, and efficiency across industries.
          </p>
          <p className="text-gray-400 leading-8 text-lg mt-4">
            Through its integrated control systems and smart manufacturing
            solutions, Rockwell enables organizations to simulate, monitor,
            and optimize industrial processes in real time.
          </p>
        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="px-14 py-24 bg-[#1A1A1A]">

        <div className="text-center mb-14">
          <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h2 className="text-4xl font-bold">Platform Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {[
            {
              icon: "🎮",
              title: "Interactive Simulation",
              desc: "Real-time OT threat simulation in industrial environments with hands-on training scenarios."
            },
            {
              icon: "📊",
              title: "Analytics Dashboard",
              desc: "Track KPIs, performance metrics, and security scores across your team in real time."
            },
            {
              icon: "🛡️",
              title: "Threat Detection",
              desc: "Learn to identify and respond to network intrusions, phishing, and OT device attacks."
            },
          ].map((f) => (
            <div key={f.title} className="bg-[#2A2A2A] rounded-2xl p-8 border border-[#333] hover:border-[#CD163F] transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-7">{f.desc}</p>
            </div>
          ))}

        </div>

      </section>

      {/* STATS SECTION */}
      <section className="px-14 py-24">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "1,200+", label: "Active Users" },
            { value: "98%",    label: "Threat Detection Rate" },
            { value: "50+",    label: "Training Modules" },
            { value: "24/7",   label: "Simulation Access" },
          ].map((s) => (
            <div key={s.label}>
              <h3 className="text-5xl font-bold text-[#CD163F]">{s.value}</h3>
              <p className="text-gray-400 mt-3">{s.label}</p>
            </div>
          ))}
        </div>

      </section>

      {/* CTA SECTION */}
      <section className="px-14 py-24 bg-[#1A1A1A] text-center">

        <h2 className="text-4xl font-bold mb-4">
          Ready to start your training?
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of professionals securing industrial environments.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#CD163F] px-10 py-4 rounded-xl font-bold hover:opacity-80 transition text-lg"
          >
            Get Started
          </button>
          <button
            onClick={handleGameAccess}
            className="bg-[#2A2A2A] border border-[#444] px-10 py-4 rounded-xl font-bold hover:border-[#CD163F] transition text-lg"
          >
            Try Demo
          </button>
        </div>

      </section>

      {/* FAQ SECTION */}
      <section className="px-14 py-24 bg-[#2A2A2A]">

        <div className="text-center mb-14">
          <p className="text-[#CD163F] text-sm font-semibold tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {[
            {
              q: "What is CyberPath?",
              a: "CyberPath is a cybersecurity training and simulation platform focused on operational technology (OT) environments. It allows users to practice threat detection and incident response in realistic industrial scenarios."
            },
            {
              q: "Who is this platform for?",
              a: "The platform is designed for employees, clients, and security professionals who want to improve their OT cybersecurity skills through hands-on simulation."
            },
            {
              q: "Do I need prior cybersecurity experience?",
              a: "No. The platform is designed for all experience levels, from beginners exploring the guest demo to advanced users running full simulations."
            },
            {
              q: "How do I access the dashboard?",
              a: "You need to create an account and log in. Once logged in, your dashboard will reflect your role — employee, client, or admin."
            },
            {
              q: "Is my data secure?",
              a: "Yes. All user data is stored securely and passwords are encrypted. We follow industry best practices for data protection."
            },
          ].map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
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

      {/* POPUP */}
      {showPopup && <PopupSignIn onClose={() => setShowPopup(false)} />}

    </div>
  );
}