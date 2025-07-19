export function AllIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 6.75h3v-3h-3v3zm6 0h3v-3h-3v3zm6 0h3v-3h-3v3zM4.5 12.75h3v-3h-3v3zm6 0h3v-3h-3v3zm6 0h3v-3h-3v3zM4.5 18.75h3v-3h-3v3zm6 0h3v-3h-3v3zm6 0h3v-3h-3v3z"
      />
    </svg>
  );
}
