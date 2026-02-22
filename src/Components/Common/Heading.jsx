import React from "react";
import { cn } from "@/lib/utils";

const Heading = ({ text, className, Variant = "h3", ...props }) => {
  const Tag = Variant;
  return (
    <Tag
      className={cn(
        "text-2xl sm:text-5xl text-secondary-black uppercase font-semibold tracking-[0.5px]",
        className,
      )}
      {...props}
    >
      {text}
    </Tag>
  );
};

export default Heading;
