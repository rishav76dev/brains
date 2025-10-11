import { useEffect, useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { getYoutubeEmbedLink, deleteContent } from "../utils/utils";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";
import toast from "react-hot-toast";
import { useContent } from "../hooks/userContent";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document";
  contentId: string;
  description?: string;
  readOnly?: boolean;
}

export function Card({
  title,
  link,
  type,
  contentId,
  description,
  readOnly = false,
}: CardProps) {
  const [iframeError, setIframeError] = useState(false);
  const embedUrl = getYoutubeEmbedLink(link);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const { refresh } = useContent();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="w-full h-full">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-sm w-full h-full flex flex-col">
        <div className="flex justify-between items-start">
          <div className="flex items-center text-md font-medium text-gray-800">
            <div className="pr-2 text-gray-600">
              {type === "twitter" && <TwitterIcon />}
              {type === "youtube" && <YoutubeIcon />}
              {type === "document" && <DocumentIcon />}
            </div>
            {title}
          </div>
          {!readOnly && (
            <div className="flex items-center gap-2">
              <div
                className="text-gray-600 cursor-pointer"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(link);
                    toast.success("Link copied to clipboard!");
                  } catch (error) {
                    console.error(error);
                    toast.error("Failed to copy link.");
                  }
                }}
              >
                {(type === "twitter" || type === "youtube") && <ShareIcon />}
              </div>

              <div className="text-gray-600 cursor-pointer">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    (async () => {
                      await deleteContent(contentId);
                      refresh();
                    })();
                  }}
                >
                  <DeleteIcon />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 flex-1">
          {type === "youtube" && (
            <div>
              <iframe
                className="w-full aspect-video rounded-md border border-gray-300"
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onError={(e) => {
                  console.error("YouTube iframe error:", e);
                  setIframeError(true);
                }}
              />
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

          {type === "document" && description && (
            <div className="bg-gray-100 rounded-lg p-3 border border-gray-300">
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {isExpanded ? description : truncateText(description, 150)}
              </div>
              {description.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-gray-600 hover:text-gray-800 text-xs font-medium"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
