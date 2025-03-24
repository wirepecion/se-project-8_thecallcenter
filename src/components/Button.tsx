interface ButtonProps {
    variant?: "primary" | "white-outline" | "black-outline" | "black-outline-light";
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }
  
  export default function Button({
    variant = "primary",
    children,
    onClick,
    className = "",
  }: ButtonProps) {
    const baseStyles = "rounded-md py-2 px-6 font-semibold transition-all duration-200 w-[200px] h-[50px] text-lg text-roboto";
  
    const variants = {
      primary: "bg-[#F2814D] text-white hover:opacity-90",
      "white-outline": "bg-white text-black hover:bg-gray-100",
      "black-outline": "bg-transitive text-white border border-white hover:bg-white hover:text-black",
      "black-outline-light": "bg-white text-black border border-black hover:bg-gray-100",
    };
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }
  