/** @format */

import * as React from "react";
import { PostCard } from "../../common/PostCard";
import { DummyPosts } from "../../../constants";
import { PostType } from "../../../types";
import { FaPaperPlane, FaRegSmile } from "react-icons/fa";
import { useProfile } from "../../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { AuthPopup } from "../../popups/AuthPopup";

export const Home = () => {
  const { isAuthenticated, userName } = useProfile();
  const navigate = useNavigate();

  const [posts, setPosts] = React.useState<PostType[]>(DummyPosts);
  const [postText, setPostText] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [showAuth, setShowAuth] = React.useState(false);

  const handlePost = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    if (!postText.trim()) {
      setError("Post content can't be empty.");
      return;
    }

    const newPost: PostType = {
      userDetails: {
        username: userName || "Anonymous",
        userImg: "https://randomuser.me/api/portraits/lego/1.jpg",
      },
      body: postText.trim(),
      emoji: "✍️",
      createdAt: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setError("");
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      setShowAuth(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full  gap-4 bg-white">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 ">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
            foo-rum
          </h1>
          <button
            className="text-sm text-gray-700 hover:text-blue-600 flex items-center gap-2 transition-colors duration-200"
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/auth");
              }
            }}
          >
            {isAuthenticated ? (
              <span className="text-lg">{userName}</span>
            ) : (
              <div>
                Login <span className="text-lg">🔓</span>
              </div>
            )}
          </button>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 border border-gray-100 max-w-[700px] mx-auto mt-6 flex flex-col">
          <textarea
            placeholder={
              isAuthenticated
                ? `${userName}, How are you feeling today?`
                : "How are you feeling today?"
            }
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full h-10 resize-none border-none focus:outline-none text-sm text-gray-700"
          ></textarea>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-3 text-gray-500 items-center">
              <FaRegSmile />
              <span>+</span>
              <span>🧠</span>
            </div>
            <button className="text-blue-500 text-xl" onClick={handlePost}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-4 pb-6">
        <div className="w-full max-w-[700px] mx-auto mt-2 flex flex-col gap-4">
          {posts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </div>

      <AuthPopup show={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};
