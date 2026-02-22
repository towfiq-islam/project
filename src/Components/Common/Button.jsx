import React from "react";
import { cn } from "@/lib/utils";

const Button = ({ text, className, ...props }) => {
  return (
    <button
      className={cn(
        "bg-primary-blue transition-transform hover:scale-105 duration-300 cursor-pointer text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg uppercase",
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
