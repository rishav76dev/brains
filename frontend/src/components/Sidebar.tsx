import { AllIcon } from "../icons/AllIcon";
import DocumentIcon from "../icons/DocumentIcon";
import { Logo } from "../icons/Logo";
import Logout from "../icons/Logout";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { logout } from "../utils/utils";
import { Button } from "./Button";
import { SidebarItem } from "./SidebarItem";

export function Sidebar({
  onSelectType,
}: {
  onSelectType: (type: string | null) => void;
}) {
  return (
    <div
  className="
    hidden sm:fixed sm:top-0 sm:left-0 sm:h-screen
    sm:border-r sm:pl-6 sm:pr-4 sm:py-6
    sm:flex sm:flex-col sm:w-56 lg:w-64
    bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200
     border-r-8 border-purple-300
  "
>

      <div className="flex items-center space-x-2 text-purple-600 mb-8">
        <Logo />
        <span className="text-xl font-semibold text-gray-800">Brainly</span>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {/* Top menu items */}
        <div className="space-y-4">
          <SidebarItem
            text="All"
            icon={<AllIcon />}
            onClick={() => onSelectType(null)}
          />
          <SidebarItem
            text="Twitter"
            icon={<TwitterIcon />}
            onClick={() => onSelectType("twitter")}
          />
          <SidebarItem
            text="YouTube"
            icon={<YoutubeIcon />}
            onClick={() => onSelectType("youtube")}
          />
          <SidebarItem
            text="Docs"
            icon={<DocumentIcon />}
            onClick={() => onSelectType("document")}
          />
        </div>

        {/* Bottom logout button */}
        <div className="pt-8 w-45 h-20">
          <Button
            onClick={() =>
              logout((path: string) => {
                window.location.href = path;
              })
            }
            variant="primary"
            text="Logout"
            startIcon={<Logout />}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
