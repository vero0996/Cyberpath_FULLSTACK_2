import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useEffect } from "react";

export default function UnityGame() {
 const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage
  } = useUnityContext({
    loaderUrl: "/Unity/Build/CyberPath_Demoo.loader.js",
    dataUrl: "/Unity/Build/CyberPath_Demoo.data",
    frameworkUrl: "/Unity/Build/CyberPath_Demoo.framework.js",
    codeUrl: "/Unity/Build/CyberPath_Demoo.wasm",
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const userId = localStorage.getItem("userId");

    if (userId) {
      sendMessage(
        "WebGLBridge",
        "SetUserId",
        userId
      );

      console.log("User enviado a Unity:", userId);
    }

  }, [isLoaded, sendMessage]);

  useEffect(() => {
    if (!isLoaded) return;

    const handleGameOver = (event) => {
      const { userId, tiempo_jugado, amenazas_detectadas, progreso, tasa_retencion } = event.detail;

      fetch("http://localhost:3000/kpi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: userId,
          tiempo_jugado,
          amenazas_detectadas,
          progreso,
          tasa_retencion,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("KPI guardado:", data))
        .catch((err) => console.error("Error guardando KPI:", err));
    };

    window.addEventListener("GameOver", handleGameOver);
    return () => window.removeEventListener("GameOver", handleGameOver);
  }, [isLoaded]);

  useEffect(() => {
    window.ReceiveKPI = (tiempo, amenazas, progreso, retencion) => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      fetch("http://localhost:3000/kpi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: parseInt(userId),
          tiempo_jugado: tiempo,
          amenazas_detectadas: amenazas,
          progreso: progreso,
          tasa_retencion: retencion,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ KPI guardado:", data))
        .catch((err) => console.error("❌ Error KPI:", err));
    };

    return () => { delete window.ReceiveKPI; };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">

      {!isLoaded && (
        <div className="w-full text-center py-6">
          <p className="text-gray-400 mb-3">
            Loading... {Math.round(loadingProgression * 100)}%
          </p>
          <div className="w-full bg-[#333] rounded-full h-2">
            <div
              className="bg-[#CD163F] h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.round(loadingProgression * 100)}%` }}
            />
          </div>
        </div>
      )}

      <Unity
        unityProvider={unityProvider}
        style={{
          width: "100%",
          height: isFullscreen ? "100vh" : "700px",   
          border: "none",
          borderRadius: isFullscreen ? "0" : "12px",  
        }}
      />

    </div>
  );
}