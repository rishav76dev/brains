import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonLProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

const variantClasses = {
  default: "text-primary-foreground bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-primary/90",
  outline: "border-[0.2px] border-black bg-transparent hover:bg-black hover:text-white transition-colors",

  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
};

export const ButtonL = forwardRef<HTMLButtonElement, ButtonLProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-md transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
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
