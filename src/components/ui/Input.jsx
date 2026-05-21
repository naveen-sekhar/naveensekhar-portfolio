import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  required = false,
  textarea = false,
  className = "",
  hideLabel = false,
}) {
  const [focused, setFocused] = useState(false);
  const id = useId();

  const isActive = focused || (value && value.length > 0);

  const shakeAnimation = error
    ? { x: [0, -6, 6, -4, 4, -2, 2, 0] }
    : { x: 0 };

  const baseInputClasses = `
    w-full bg-white/5 border rounded-xl px-4 py-3 text-white
    placeholder-transparent outline-none transition-all duration-300
    ${
      error
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        : "border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    }
  `;

  const InputTag = textarea ? "textarea" : "input";

  return (
    <motion.div
      animate={shakeAnimation}
      transition={{ duration: 0.4 }}
      className={`relative ${className}`}
    >
      <InputTag
        id={id}
        type={textarea ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={hideLabel ? label : " "}
        className={`
          ${baseInputClasses}
          ${textarea ? "min-h-[120px] resize-y pt-5" : "pt-5"}
        `}
      />

        {!hideLabel && (
          <label
            htmlFor={id}
            className={`
              absolute left-4 transition-all duration-200 pointer-events-none select-none
              ${
                isActive
                  ? "top-1.5 text-xs " + (error ? "text-red-400" : "text-blue-400")
                  : "top-3.5 text-base text-gray-400"
              }
            `}
          >
            {label}
            {required && <span className="text-red-400 ml-0.5">*</span>}
          </label>
        )}

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-sm text-red-400 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
