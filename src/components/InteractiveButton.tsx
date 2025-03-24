"use client"; // required if using in a Next.js app with Framer Motion in App Router

import { motion } from "framer-motion";

export default function InteractiveButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0.1 }}
      whileTap={{ scale: 0.95, rotate: -0.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
