import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

function getYoutubeEmbedLink(link: string) {
    try {
        const url = new URL(link);
        if (url.hostname === "youtu.be") {
            const id = url.pathname.slice(1);
            return `https://www.youtube.com/embed/${id}`;
        }
        if (url.hostname === "www.youtube.com" && url.searchParams.get("v")) {
            return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
        }
        return link;
    } catch {
        return link;
    }
}

export function Card({ title, link, type }: CardProps) {
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
                            <ShareIcon />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full aspect-video rounded-lg border-0"
                            src={getYoutubeEmbedLink(link)}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
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
