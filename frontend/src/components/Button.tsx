import { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void | Promise<void>;
    loading?: boolean;
    fullWidth?: boolean;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600",
}

const defaultStyles = " px-4 py-2 rounded-md font-light flex items-center gap-2";

export function Button({ variant, text, startIcon, onClick, loading = false, fullWidth = false }: ButtonProps) {
    const fullWidthClass = fullWidth ? "w-full" : "";
    const disabledClass = loading ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button
            onClick={loading ? undefined : onClick}
            disabled={loading}
            className={`${variantClasses[variant]} ${defaultStyles} ${fullWidthClass} ${disabledClass}`}
        >
            {loading ? (
                <span className="animate-pulse">Loading...</span>
            ) : (
                <>
                    {startIcon}
                    {text}
                </>
            )}
        </button>
    );
}


// export interface ButtonProps {
//   loading?: boolean;
//   variant?: "primary" | "secondary";
//   text: string;
//   fullWidth?: boolean;
//   onClick?: () => void | Promise<void>;
// }