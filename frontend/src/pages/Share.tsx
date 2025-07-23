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
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/share/${shareLink}`);
        setUsername(response.data.username);
        setContents(response.data.content);
      } catch (err) {
        console.error(err);
        setError("Invalid or expired share link.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {username}'s Shared Brain
        </h1>

        <div className="flex flex-wrap justify-center gap-4">
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
