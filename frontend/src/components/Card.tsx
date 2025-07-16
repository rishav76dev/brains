import { useEffect, useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId: string;
}

function getYoutubeEmbedLink(link: string) {
  try {
    const url = new URL(link);

    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1);
      const cleanId = id.split("?")[0];
      return `https://www.youtube.com/embed/${cleanId}`;
    }

    if (
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtube.com" ||
      url.hostname === "m.youtube.com"
    ) {
      const videoId = url.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return link;
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
    return link;
  }
}

async function deleteContent(contentId: string) {
  try {
    // console.log("Attempting to delete content with id:", contentId);
    const response = await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
      data: { Id: contentId },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    // console.log("Delete successful", response.data); add this
    return response.data;
  } catch (error) {
    console.error("Error deleting the content", error);
    throw error;
  }
}

export function Card({ title, link, type, contentId }: CardProps) {
  const [iframeError, setIframeError] = useState(false);
  const embedUrl = getYoutubeEmbedLink(link);

  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type, link]);

  return (
    <div>
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ShareIcon />
              </a>
            </div>

            <div className="text-gray-500">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("deletebutton is clicked") // prevent scroll
                  deleteContent(contentId);
                }}
              >
                <DeleteIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <div>
              <iframe
                className="w-full aspect-video rounded-lg border-0"
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onError={(e) => {
                  console.error("YouTube iframe error:", e);
                  setIframeError(true);
                }}
              />

              {/* Fallback if iframe fails */}
              {iframeError && (
                <div className="mt-2 p-2 bg-red-50 text-red-700 rounded text-sm">
                  Failed to load video.
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline ml-1"
                  >
                    Open in YouTube
                  </a>
                </div>
              )}
            </div>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
