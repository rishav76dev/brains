import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/userContent";
import { BACKEND_URL } from "../config";
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
  // console.log("Contents:", contents);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  return (
    <div>
      <Sidebar onSelectType={setSelectedType} />
      <div className="p-4 lg:ml-64 sm:ml-56 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-semibold pl-9 px-5">All Notes</h1>

          <div className="flex gap-4">
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add content"
              startIcon={<PlusIcon />}
            />
            <Button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareUrl);
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
            <p className="text-gray-500">No content found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
