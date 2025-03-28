import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={`https://picsum.photos/50?random=${post.userId}`}
          alt={`user.name`}
          className="rounded-full mr-4"
        />
        <h2 className="text-lg font-semibold">{post.username}</h2>
      </div>
      <p className="text-gray-700">{post.content}</p>

      <p className="text-gray-500 mt-2">{post.commentCount} Comments</p>
    </div>
  );
};

export default PostCard;
