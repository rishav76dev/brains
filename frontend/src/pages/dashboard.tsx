import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { MenuIcon } from "../icons/MenuIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/userContent";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  type Content = {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document";
    description: string;
  };

  const { contents, refresh } = useContent() as {
    contents: Content[];
    refresh: () => void;
  };
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const filteredContents = selectedType
    ? contents.filter((c) => c.type === selectedType.toLowerCase())
    : contents.filter((c) => c.type !== "twitter"); // Exclude Twitter from "All" section

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  return (
    <div className="min-h-screen flex h-screen">
      <Sidebar
        onSelectType={setSelectedType}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 p-4 bg-gradient-to-br from-white via-indigo-100 to-purple-200 h-full overflow-auto">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Mobile menu button */}
        {!sidebarOpen && (
          <button
            onClick={() => {
              console.log("Mobile menu button clicked");
              setSidebarOpen(true);
            }}
            className="sm:hidden fixed top-4 left-4 z-50 p-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
          >
            <MenuIcon />
          </button>
        )}

        <div className="flex justify-between items-center mb-10 mt-12 sm:mt-0">
          <h1 className="text-4xl font-semibold text-purple-700 pl-9 px-5">
            All Notes{" "}
            {sidebarOpen && (
              <span className="text-sm text-red-500">(Sidebar Open)</span>
            )}
          </h1>

          <div className="flex gap-4">
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add content"
              startIcon={<PlusIcon />}
            />

            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/brain/share`,
                    { share: true },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );

                  if (response.data && response.data.hash) {
                    const baseUrl = window.location.origin;
                    const shareUrl = `${baseUrl}/share/${response.data.hash}`;
                    await navigator.clipboard.writeText(shareUrl);
                    toast.success("Share link copied to clipboard!");
                  } else {
                    throw new Error("Invalid response from server");
                  }
                } catch (error: unknown) {
                  console.error("Share error:", error);
                  if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    if (status === 401) {
                      toast.error("Please log in again to share your brain.");
                    } else if (status && status >= 500) {
                      toast.error("Server error. Please try again later.");
                    } else {
                      toast.error("Failed to generate share link.");
                    }
                  } else {
                    toast.error("Failed to generate share link.");
                  }
                }
              }}
              variant="secondary"
              text="Share brain"
              startIcon={<ShareIcon />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContents.length > 0 ? (
            filteredContents.map((item) => (
              <div key={item._id} className="w-full">
                <Card
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  contentId={item._id}
                  description={item.description}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600">No content found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
