import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TrendingPosts from "./pages/TrendingPosts";
import Feed from "./pages/Feed";
import TopUsers from "./pages/TopUsersList";

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-bold">My App</div>
            <div className="space-x-4">
              <Link
                to="/top-users"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Top Users
              </Link>
              <Link
                to="/trending"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Trending Posts
              </Link>
              <Link
                to="/feed"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Live Feed
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/trending" element={<TrendingPosts />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
