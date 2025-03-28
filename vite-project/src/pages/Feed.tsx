import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";

// Configuration
const SOCKET_URL = "http://localhost:5000"; // Replace with actual backend URL

// Post Component
const PostCard = React.memo(({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 transition-all duration-300">
      <div className="flex items-between mb-2">
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gray-800">
            {post.username || "Anonymous"}
          </h3>
          <p className="text-gray-600 mt-1">{post.content}</p>
        </div>
      </div>

      {/* Post Metadata */}
      <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
        <div>
          <span>💬 {post.commentCount || 0} Comments</span>
        </div>
        <span>{new Date(post.timestamp).toLocaleString()}</span>
      </div>

      {/* Comments Preview */}
      {post.comments && post.comments.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <h4 className="text-sm font-semibold mb-2">Comments:</h4>
          {post.comments.slice(0, 2).map((comment, index) => (
            <div
              key={comment.id || index}
              className="text-sm text-gray-700 mb-1 pl-2 border-l-2 border-gray-200"
            >
              {comment.content}
            </div>
          ))}
          {post.comments.length > 2 && (
            <p className="text-xs text-gray-500 mt-1">
              + {post.comments.length - 2} more comments
            </p>
          )}
        </div>
      )}
    </div>
  );
});

// Real-Time Feed Component
const RealTimeFeed = () => {
  // State management
  const [posts, setPosts] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [visiblePosts, setVisiblePosts] = useState(10);

  // Socket Connection Effect
  useEffect(() => {
    // Create socket connection
    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection established
    newSocket.on("connect", () => {
      setConnectionStatus("Connected");
      console.log("WebSocket connected");
    });

    // Disconnect handling
    newSocket.on("disconnect", () => {
      setConnectionStatus("Disconnected");
      console.log("WebSocket disconnected");
    });

    // Listen for posts updates
    newSocket.on("posts_update", (updatedPosts) => {
      setPosts((prevPosts) => {
        // Avoid duplicates and maintain order
        const uniquePosts = updatedPosts.filter(
          (newPost) =>
            !prevPosts.some((existingPost) => existingPost.id === newPost.id)
        );

        // Combine and sort
        const combinedPosts = [...uniquePosts, ...prevPosts]
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 50); // Limit to 50 most recent posts

        // Track new posts count
        setNewPostsCount(uniquePosts.length);

        return combinedPosts;
      });
    });

    // Error handling
    newSocket.on("posts_error", (error) => {
      console.error("Posts fetch error:", error);
      setConnectionStatus("Error");
    });

    // Store socket instance
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Load more posts handler
  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 10);
    setNewPostsCount(0);
  };

  // Render
  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Connection Status */}
      <div
        className={`
          mb-4 p-2 rounded text-center 
          ${
            connectionStatus === "Connected"
              ? "bg-green-100 text-green-800"
              : connectionStatus === "Disconnected"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }
        `}
      >
        {connectionStatus}
      </div>

      {/* New Posts Notification */}
      {newPostsCount > 0 && (
        <div
          onClick={loadMorePosts}
          className="
            sticky top-4 z-10 
            bg-blue-500 text-white 
            text-center p-2 
            rounded-full 
            cursor-pointer 
            hover:bg-blue-600 
            transition-all
            mb-4
          "
        >
          {newPostsCount} New Posts
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.slice(0, visiblePosts).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More Button */}
      {visiblePosts < posts.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMorePosts}
            className="
              bg-blue-500 text-white 
              px-4 py-2 rounded 
              hover:bg-blue-600 
              transition-all
            "
          >
            Load More Posts
          </button>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center text-gray-500 p-4">No posts available</div>
      )}
    </div>
  );
};

export default RealTimeFeed;
