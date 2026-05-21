import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const glowMap = {
  blue: "hover:border-blue-500/40 hover:shadow-blue-500/10",
  blue: "hover:border-blue-500/40 hover:shadow-blue-500/10",
  cyan: "hover:border-cyan-500/40 hover:shadow-cyan-500/10",
};

export default function Card({
  children,
  className = "",
  hover3D = true,
  glowColor = "blue",
}) {
  const ref = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    if (!hover3D || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // rotateX: tilt forward/back based on vertical mouse position
    // rotateY: tilt left/right based on horizontal mouse position
    rotateX.set(((y - centerY) / centerY) * -10);
    rotateY.set(((x - centerX) / centerX) * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        hover3D
          ? {
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformPerspective: 800,
            }
          : {}
      }
      className={`
        bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl
        p-6 overflow-hidden transition-all duration-300
        hover:shadow-xl
        ${glowMap[glowColor] || glowMap.blue}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
