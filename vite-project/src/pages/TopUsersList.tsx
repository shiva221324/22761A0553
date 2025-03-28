import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopUsers } from "../store/usersSlice";
import UserCard from "../components/UserCard";

const TopUsers = () => {
  const dispatch = useDispatch();
  const { topUsers, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getTopUsers());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Top 5 Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsers;
