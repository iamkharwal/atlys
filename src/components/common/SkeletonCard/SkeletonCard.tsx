import React from "react";
import "./SkeletonCard.css";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="cardSkeleton">
      {/* Header */}
      <div className="skeletonHeader">
        <div className="skeletonAvatar shimmer"></div>
        <div className="skeletonLines">
          <div className="skeletonLine shimmer short"></div>
          <div className="skeletonLine shimmer tiny"></div>
        </div>
      </div>

      {/* Body */}
      <div className="skeletonBody">
        <div className="skeletonThumb shimmer"></div>
        <div className="skeletonText">
          <div className="skeletonLine shimmer"></div>
          <div className="skeletonLine shimmer"></div>
          <div className="skeletonLine shimmer short"></div>
        </div>
      </div>

      {/* Footer icons */}
      <div className="skeletonFooter">
        <div className="skeletonIcon shimmer"></div>
        <div className="skeletonIcon shimmer"></div>
        <div className="skeletonIcon shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
