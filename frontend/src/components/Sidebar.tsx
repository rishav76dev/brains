import { useNavigate } from "react-router-dom";
import { AllIcon } from "../icons/AllIcon";
import DocumentIcon from "../icons/DocumentIcon";
import { Logo } from "../icons/Logo";
import Logout from "../icons/Logout";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { logout } from "../utils/utils";
import { Button } from "./Button";
import { SidebarItem } from "./SidebarItem";
import { CrossIcon } from "../icons/CrossIcon";

export function Sidebar({
  onSelectType,
  isOpen = false,
  onClose,
}: {
  onSelectType: (type: string | null) => void;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const navigate = useNavigate();
  const handleItemClick = (type: string | null) => {
    console.log("Sidebar item clicked:", type);
    onSelectType(type);
    onClose?.(); // Close mobile sidebar after selection
  };

  const handleClose = () => {
    console.log("Sidebar close clicked");
    onClose?.();
  };
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 sm:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          h-screen pl-6 pr-4 py-6
          flex flex-col w-64 flex-shrink-0
          bg-[#1C2939] text-white
          border-r border-slate-800
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          fixed top-0 left-0 z-50 sm:static sm:z-auto
          shadow-xl sm:shadow-none
        `}
      >
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-[#00835C]">
            <Logo />
            <span className="text-xl font-bold text-white tracking-tight">
              Brainly
            </span>
          </div>
          <button
            onClick={handleClose}
            className="sm:hidden text-slate-400 hover:text-white transition-colors"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          {/* Top menu items */}
          <div className="space-y-4">
            <SidebarItem
              text="All"
              icon={<AllIcon />}
              onClick={() => handleItemClick(null)}
            />
            <SidebarItem
              text="Twitter"
              icon={<TwitterIcon />}
              onClick={() => handleItemClick("twitter")}
            />
            <SidebarItem
              text="YouTube"
              icon={<YoutubeIcon />}
              onClick={() => handleItemClick("youtube")}
            />
            <SidebarItem
              text="Docs"
              icon={<DocumentIcon />}
              onClick={() => handleItemClick("document")}
            />
          </div>

          {/* Bottom logout button */}
          <div className="pt-8 w-45 h-20">
            <Button
              onClick={() => logout(navigate)}
              variant="primary"
              text="Logout"
              startIcon={<Logout />}
              fullWidth={true}
              className="bg-[#00835C] hover:bg-[#006e4d] text-white border-none shadow-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
}
