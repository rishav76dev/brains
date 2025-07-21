import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-400",
  secondary: "bg-purple-200 text-purple-700 hover:bg-purple-300 focus:ring-purple-300",
};

const defaultStyles =
  "px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const fullWidthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type="button"
      onClick={loading ? undefined : onClick}
      disabled={loading}
      aria-busy={loading}
      className={twMerge(
        `${variantClasses[variant]} ${defaultStyles} ${fullWidthClass}`
      )}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {startIcon}
          <span>{text}</span>
        </>
      )}
    </button>
  );
}

// Minimal spinner using Tailwind
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
