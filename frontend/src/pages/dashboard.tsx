import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/userContent";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
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
    : contents;

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  return (
    <div>
      <Sidebar onSelectType={setSelectedType} />
      <div className="p-4 lg:ml-64 sm:ml-56 min-h-screen bg-gradient-to-br from-white via-indigo-100 to-purple-200  border-1-4 border-black">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-semibold text-purple-700 pl-9 px-5">
            All Notes
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

        <div className="flex flex-wrap gap-6">
          {filteredContents.length > 0 ? (
            filteredContents.map((item) => (
              <div
                key={item._id}
                className="flex-grow sm:flex-grow-0 basis-[250px] max-w-[300px]"
              >
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
