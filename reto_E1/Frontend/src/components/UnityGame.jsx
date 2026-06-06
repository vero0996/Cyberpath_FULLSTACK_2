import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useEffect } from "react";

export default function UnityGame() {
 const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage
  } = useUnityContext({
    loaderUrl: "/Unity/Build/CyberP.loader.js",
    dataUrl: "/Unity/Build/CyberP.data",
    frameworkUrl: "/Unity/Build/CyberP.framework.js",
    codeUrl: "/Unity/Build/CyberP.wasm",
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