import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4">
      <img
        src={`https://picsum.photos/50?random=${user.id}`}
        alt={`Profile picture of ${user.name}`}
        className="w-12 h-12 rounded-full object-cover"
        onError={(e) => (e.target.src = "/fallback-avatar.png")} // Fallback image
      />
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.postCount} Posts</p>
      </div>
    </div>
  );
};

export default UserCard;
