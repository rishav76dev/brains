import axios from "axios";
import { BACKEND_URL } from "../config";

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

export async function signup(username: string, password: string, navigate: (path: string) => void) {
    await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password
    });
    navigate("/signin");
    alert("You have signed up!");
}

export async function signin(username: string, password: string, navigate: (path: string) => void) {
    const response = await axios.post(BACKEND_URL + "/api/v1/user/signin", {
        username,
        password
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
}


export { deleteContent, getYoutubeEmbedLink,  };
