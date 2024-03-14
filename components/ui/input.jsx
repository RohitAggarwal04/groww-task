import * as React from "react";

import { cn } from "@/lib/utils";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";

const Input = React.forwardRef(({ className, icon, type, ...props }, ref) => {
  return (
    <div
      className={`flex  items-center rounded-md justify-start px-4 border border-slate-200  dark:bg-[#0F1117] ${className} `}
    >
      {icon === "none" ? (
        ""
      ) : icon === "IoLocationOutline" ? (
        <IoLocationOutline size={20} />
      ) : (
        <IoCallOutline size={20} />
      )}
      <input
        type={type}
        className={cn(
          "flex h-10 border-none bg-transparent px-3 py-2 text-sm  placeholder:text-slate-500 focus-visible:outline-none     dark:placeholder:text-slate-400 "
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
