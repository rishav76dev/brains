import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonLProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-sm", // Adjusted height slightly for better touch target
  lg: "h-12 px-8 text-base",
};

const variantClasses = {
  // Workable Green Solid
  default: "text-white bg-[#00835C] hover:bg-[#006e4d] shadow-sm",

  // Clean Gray Outline -> Hover Green
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:border-[#00835C] hover:text-[#00835C] hover:bg-slate-50 transition-all",

  // Secondary Gray
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
};

export const ButtonL = forwardRef<HTMLButtonElement, ButtonLProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-md transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00835C] focus-visible:ring-offset-2 ring-offset-white",
          "disabled:opacity-50 disabled:pointer-events-none",
          "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

ButtonL.displayName = "ButtonL";
