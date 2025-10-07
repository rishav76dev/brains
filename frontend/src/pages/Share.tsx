import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Card } from "../components/Card";

type Content = {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document";
  description: string;
};

export default function Share() {
  const { shareLink } = useParams();
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        if (!shareLink) {
          setError("No share link provided.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/share/${shareLink}`
        );

        if (
          response.data &&
          response.data.username &&
          Array.isArray(response.data.content)
        ) {
          setUsername(response.data.username);
          setContents(response.data.content);
        } else {
          setError("Invalid response from server.");
        }
      } catch (err: unknown) {
        console.error("Error fetching shared content:", err);

        if (axios.isAxiosError(err)) {
          // Server responded with error status
          const status = err.response?.status;
          if (status === 404) {
            setError("Share link not found or has expired.");
          } else if (status && status >= 500) {
            setError("Server error. Please try again later.");
          } else {
            setError("Unable to load shared content.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shared content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-100 to-purple-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-purple-700 mb-2">
            {username}'s Shared Brain
          </h1>
          <p className="text-gray-600">
            Explore this curated collection of content
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {contents.length > 0 ? (
            contents.map((item) => (
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
                  readOnly={true}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-500 text-lg">
                No content has been shared yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
