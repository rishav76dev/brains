
import { AllIcon } from "../icons/AllIcon";
import DocumentIcon from "../icons/DocumentIcon";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";


export function Sidebar({ onSelectType }: { onSelectType: (type: string | null) => void }) {
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
        <SidebarItem text="All" icon={<AllIcon />} onClick={() => onSelectType(null)} />
        <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => onSelectType("twitter")} />
        <SidebarItem text="YouTube" icon={<YoutubeIcon />} onClick={() => onSelectType("youtube")} />
        <SidebarItem text="Docs" icon={<DocumentIcon />} onClick={() => onSelectType("document")} />
      </div>
    </div>
  );
}


