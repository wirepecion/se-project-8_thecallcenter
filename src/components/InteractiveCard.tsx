"use client";

import { motion } from "framer-motion";

export default function InteractiveCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}
