import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityGame() {
  const { unityProvider, isLoaded, loadingProgression } =
    useUnityContext({
      loaderUrl: "/Unity/Build/CyberPrueba.loader.js",
      dataUrl: "/Unity/Build/CyberPrueba.data.br",
      frameworkUrl: "/Unity/Build/CyberPrueba.framework.js.br",
      codeUrl: "/Unity/Build/CyberPrueba.wasm.br",
    });

  return (
    <div className="flex flex-col items-center">
      {!isLoaded && (
        <p>Loading... {Math.round(loadingProgression * 100)}%</p>
      )}

      <Unity
        unityProvider={unityProvider}
        style={{
          width: "1000px",
          height: "600px",
          border: "2px solid white",
        }}
      />
    </div>
  );
}