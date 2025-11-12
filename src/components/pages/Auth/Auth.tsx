/** @format */

import * as React from "react";
import { AuthCard } from "../../common/AuthCard";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";
import { IoArrowBack } from "react-icons/io5";

export function Auth() {
  const navigate = useNavigate();
  const { isAuthenticated } = useProfile();

  React.useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [navigate, isAuthenticated]);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white px-6 py-4 shadow-md border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
            foo-rum
          </h1>
          <button
            className="text-sm text-gray-700 hover:text-blue-600 flex items-center gap-2 transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            <IoArrowBack size={18} />
            <span className="font-medium">Back to posts</span>
          </button>
        </div>
      </div>

      <div className="w-screen h-screen bg-white flex flex-col items-center justify-center gap-[16px]">
        <AuthCard />
      </div>
    </>
  );
}
