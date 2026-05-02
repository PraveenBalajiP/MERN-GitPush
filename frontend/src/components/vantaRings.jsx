import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import RINGS from "vanta/dist/vanta.rings.min";

export default function VantaBackground({ theme }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
  if (vantaEffect) {
    vantaEffect.destroy();
  }
  const effect = RINGS({
    el: vantaRef.current,
    THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 0.8,
    backgroundAlpha: 1.0,

    color: theme === "dark" ? 0x58a6ff : 0x0969da,
    backgroundColor: theme === "dark" ? 0x010409 : 0xf6f8fa,
  });

  setVantaEffect(effect);
  return () => {
    if (effect) effect.destroy();
  };
  }, [theme]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}