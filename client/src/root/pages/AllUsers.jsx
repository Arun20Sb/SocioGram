import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/Button";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users data only once
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/users/all-users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching users");
        setLoading(false);
      }
    };
    console.log(users.length);
    if (users.length === 0) {
      fetchUsers(); // Only fetch if the users array is empty
    }
  }, [users.length]); // Dependency on users length to ensure it doesn't refetch once users are set

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error)
    return (
      <div className="m-10 text-center text-2xl text-red-500">{error} 💀</div>
    );

  return (
    <div className="py-3 px-1 min-h-screen">
      <h2 className="text-3xl font-semibold text-start mb-10 text-gray-50">
        All Users
      </h2>

      {/* User List */}
      <div className="flex flex-wrap gap-5">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            {/* User Info */}
            <div className="py-3 px-7 flex gap-1 flex-col justify-center items-center border-2 border-gray-400 rounded-md">
              {/* Add user image if available */}
              <div className="rounded-full">
                <img
                  src="https://img.icons8.com/?size=64&id=GKa451kLBjuW&format=png"
                  alt=""
                  className="w-14 h-14"
                />
              </div>
              <p className="font-semibold text-lg text-gray-50">
                {user.username}
              </p>
              <p className="text-sm font-semibold text-gray-200">
                Posts:{" "}
                <span className="text-blue-600">{user.postsCount || 0}</span>
              </p>
              <p className="text-sm text-gray-200">{user.email}</p>
              <div className="mt-2">
                <Button title="Follow" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
