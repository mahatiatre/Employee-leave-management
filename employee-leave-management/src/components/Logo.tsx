
import { Circle } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className = "", textClassName = "" }: LogoProps) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 transition-transform hover:scale-105 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <Circle className="w-7 h-7 text-blue-light rotate-45 absolute" />
        <Circle className="w-7 h-7 text-blue opacity-75 rotate-[135deg] absolute" />
      </div>
      <span className={`font-bold text-xl ${textClassName}`}>LeaveManage</span>
    </Link>
  );
};

export default Logo;
