import { ReactNode } from "react";

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={`rounded-xl p-4 ${className}`}>{children}</div>
  );
  
export const CardContent = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  );
  
  // ui/button.js
export const Button = ({ children, className, }: { children: ReactNode; className?: string }) => (
    <button
      className={`px-4 py-2 rounded-md font-medium shadow-sm ${className}`}
    >
      {children}
    </button>
  );
  