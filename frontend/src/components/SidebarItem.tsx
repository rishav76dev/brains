import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center text-slate-300 py-3 px-4 cursor-pointer hover:bg-white/10 hover:text-white rounded-md transition-all duration-200"
      onClick={onClick}
    >
      <div className="mr-3 text-[#00835C] group-hover:text-white">{icon}</div>
      <div className="font-medium text-sm">{text}</div>
    </div>
  );
}
