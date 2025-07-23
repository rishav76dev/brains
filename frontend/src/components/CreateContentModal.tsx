import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import toast from "react-hot-toast";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
}

// controlled component
interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
  const title = titleRef.current?.value;
  const link = linkRef.current?.value;
  const description = descriptionRef.current?.value;

  try {
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      { link, title, type, description },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success("Content added successfully!");
    onClose();
  } catch (error) {
    console.error(error);
    toast.error("Failed to add content. Please try again.");
  }
}


  return (
    <>
      {open && (
        <div>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
              {/* Header with Title and Close Button */}
              <div className="flex items-center justify-center mb-6">
                <div className="text-4xl font-bold">Add content</div>
                <div
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={onClose}
                >
                  <CrossIcon />
                </div>
              </div>

              {/* Step 1: Select Content Type */}
              <div className="mb-4">
                <h2 className="mb-2 text-center">Select Content Type</h2>
                <div className="flex justify-center gap-2">
                  <Button
                    text="YouTube"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => setType(ContentType.Youtube)}
                  />
                  <Button
                    text="Twitter"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => setType(ContentType.Twitter)}
                  />
                  <Button
                    text="Document"
                    variant={
                      type === ContentType.Document ? "primary" : "secondary"
                    }
                    onClick={() => setType(ContentType.Document)}
                  />
                </div>
              </div>

              {/* Step 2: Title */}
              {type && (
                <div className="mb-4">
                  <Input reference={titleRef} placeholder="Title" />
                </div>
              )}

              {/* Step 3: Dynamic Fields */}
              {type === ContentType.Document && (
                <div className="mb-4">
                  <textarea
                    ref={descriptionRef}
                    placeholder="Write your document here..."
                    className="w-full p-3 border rounded resize-none h-40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              {(type === ContentType.Youtube ||
                type === ContentType.Twitter) && (
                <div className="space-y-4 mb-4">
                  <Input reference={linkRef} placeholder="Link" />
                  {/* <textarea
                    ref={descriptionRef}
                    placeholder="Short description..."
                    className="w-full p-3 border rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  /> */}
                </div>
              )}

              {type && (
                <div className="flex justify-center">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
