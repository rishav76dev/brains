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
      {/* Changed: bg-gray-50 -> bg-white, softer border */}
      <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 w-full h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          {/* Changed: text-gray-800 -> text-[#1C2939] (Dark Navy) */}
          <div className="flex items-center text-md font-semibold text-[#1C2939] leading-snug">
            {/* Changed: text-gray-600 -> text-[#00835C] (Workable Green) */}
            <div className="pr-3 text-[#00835C]">
              {type === "twitter" && <TwitterIcon />}
              {type === "youtube" && <YoutubeIcon />}
              {type === "document" && <DocumentIcon />}
            </div>
            {title}
          </div>

          {!readOnly && (
            <div className="flex items-center gap-3">
              <div
                className="text-slate-400 hover:text-[#00835C] cursor-pointer transition-colors"
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

              <div className="text-slate-400 hover:text-red-500 cursor-pointer transition-colors">
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

        <div className="flex-1">
          {type === "youtube" && (
            <div>
              <iframe
                className="w-full aspect-video rounded-md border border-slate-100 bg-slate-50"
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
                <div className="mt-2 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-100">
                  Failed to load video.
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline ml-1 font-medium"
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
            // Changed: bg-gray-100 -> bg-slate-50, border-slate-100
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 mt-1">
              <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                {isExpanded ? description : truncateText(description, 150)}
              </div>
              {description.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-[#00835C] hover:text-[#006e4d] text-xs font-semibold uppercase tracking-wide"
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
