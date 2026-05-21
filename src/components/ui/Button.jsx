import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const variantStyles = {
  primary:
    "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/0 hover:shadow-blue-500/25",
  secondary:
    "bg-[#181b2e] border border-white/10 text-white hover:bg-[#232740]",
  outline:
    "border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent",
  ghost:
    "text-gray-400 hover:text-white hover:bg-white/5 bg-transparent",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  loading = false,
  className = "",
  onClick,
  disabled,
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-medium rounded-xl
        transition-all duration-300 cursor-pointer select-none
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <Loader2 className="animate-spin shrink-0" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
      ) : icon ? (
        <span className="shrink-0 flex items-center">{icon}</span>
      ) : null}
      {children && <span>{children}</span>}
    </motion.button>
  );
}
