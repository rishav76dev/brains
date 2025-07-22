import { useEffect, useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

import { getYoutubeEmbedLink,deleteContent } from "../utils/utils";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document";
  contentId: string;
  description?: string;
}



export function Card({ title, link, type, contentId, description}: CardProps) {
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div>
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-64 border min-h-48 min-w-64">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              {type === "twitter" && <TwitterIcon />}
              {type === "youtube" && <YoutubeIcon />}
              {type === "document" && <DocumentIcon />}
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

          {type === "document" && description && (
            <div className="bg-gray-50 rounded-lg p-3 border">
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {isExpanded ? description : truncateText(description, 150)}
              </div>
              {description.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-blue-500 hover:text-blue-700 text-xs font-medium"
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
