import { useQuery } from "@tanstack/react-query";
import { fetchTrendingPosts } from "../services/api";
import PostCard from "../components/PostCard";

const TrendingPosts = () => {
  const { data: trendingPosts, isLoading } = useQuery({
    queryKey: ["trendingPosts"],
    queryFn: fetchTrendingPosts,
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Trending Posts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingPosts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;
