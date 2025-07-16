
import DocumentIcon from "../icons/DocumentIcon";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";


export function Sidebar() {
  return (
    <div
      className="
        hidden sm:fixed sm:top-0 sm:left-0 sm:h-screen
         sm:border-r sm:pl-6 sm:pr-4 sm:py-6
        sm:flex sm:flex-col sm:w-56 lg:w-72
      "
    >
      <div className="flex items-center space-x-2 text-purple-600 mb-8">
        <Logo />
        <span className="text-xl font-semibold text-gray-800">Brainly</span>
      </div>

      <div className="space-y-4">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
        <SidebarItem text="Docs" icon={<DocumentIcon />} />
      </div>
    </div>
  );
}


