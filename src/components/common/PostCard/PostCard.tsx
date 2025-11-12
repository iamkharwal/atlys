/** @format */

import * as React from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoComment, GoHeart, GoShareAndroid } from "react-icons/go";
import { PostType } from "../../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useProfile } from "../../../hooks/useProfile";
import { AuthPopup } from "../../popups/AuthPopup";
import { toast } from "react-toastify";

dayjs.extend(relativeTime);

type PostCardProps = {
  post: PostType;
};

export function PostCard({ post }: PostCardProps) {
  const [showAuth, setShowAuth] = React.useState(false);

  const { isAuthenticated } = useProfile();
  const handleClick = () => {
    if (isAuthenticated) {
      toast.info("Function not implemented");
      return;
    }
    setShowAuth(true);
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      setShowAuth(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="bg-[#f3f4f6] rounded-2xl px-2 pt-2 pb-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.userDetails.userImg}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={handleClick}
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {post.userDetails.username}
              </span>
              <span className="text-xs text-gray-500">
                {dayjs(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition"
          >
            <BsThreeDots size={18} />
          </button>
        </div>

        {/* Post Content */}
        <div className="flex items-center gap-3">
          <div className=" bg-[#f3f4f6] w-8 h-8 flex items-center justify-center text-xl bg-white rounded-full border border-gray-200 shadow-sm">
            {post.emoji || "💬"}
          </div>
          <p className="text-sm text-gray-800">{post.body}</p>
        </div>
      </div>

      {/* Footer - Comment Button */}
      <button
        onClick={handleClick}
        className="mt-3 ml-2 flex items-center gap-5 text-sm text-gray-500 hover:text-gray-700 transition"
      >
        <GoHeart size={16} />
        <GoComment size={16} />
        <GoShareAndroid size={16} />
      </button>

      <AuthPopup show={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}
