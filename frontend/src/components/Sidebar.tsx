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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          h-screen pl-6 pr-4 py-6
          flex flex-col w-64 flex-shrink-0
          bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200
          border-r-8 border-purple-300
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          fixed top-0 left-0 z-50 sm:static sm:z-auto
        `}
      >
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-purple-600">
            <Logo />
            <span className="text-xl font-semibold text-gray-800">Brainly</span>
          </div>
          <button
            onClick={handleClose}
            className="sm:hidden text-gray-600 hover:text-gray-800"
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
            />
          </div>
        </div>
      </div>
    </>
  );
}
