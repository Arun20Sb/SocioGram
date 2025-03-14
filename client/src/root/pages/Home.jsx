import { useQuery } from "react-query";
import axios from "axios";
import { format } from "date-fns";
import { Bookmark, FilePenLine, Heart } from "lucide-react";
import AllUsers from "./AllUsers";

// Fetch posts using axios
const fetchPosts = async () => {
  const response = await axios.get("/api/v1/users", {
    params: { page: 1, limit: 4 },
  });
  return response.data;
};

const Home = () => {
  const { data, error, isLoading } = useQuery("posts", fetchPosts);

  if (error) return <div className="text-red-500">Error loading posts</div>;
  if (isLoading)
    return <div className="text-gray-600 text-center">Loading posts...</div>;

  return (
    <div className="flex gap-5 py-3 w-full pl-15 mt-5">
      <div className="w-full flex flex-col">
        {/* Display Cards */}
        <div className="flex flex-col gap-7 h-screen lg:max-w-[50rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Explore Feed Heading */}
          <h2 className="text-3xl font-bold text-gray-50 text-start px-10">
            Explore Feed
          </h2>
          {/* Map through posts */}
          <div className="my-20 w-full self-center px-6 flex flex-col gap-7">
            {data?.posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-950 rounded-xl py-2 border border-gray-500"
              >
                {/* 1. Top Section - User Info & Edit Icon */}
                <div className="flex items-center justify-between p-3 border-b border-gray-500">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        post.userImage ||
                        "https://img.icons8.com/?size=64&id=GKa451kLBjuW&format=png"
                      }
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-lg text-gray-200">
                        {post.username}
                      </p>
                      <p className="text-md text-gray-400">
                        {format(new Date(post.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 cursor-pointer">
                    <FilePenLine />
                  </button>
                </div>

                {/* 2. Middle Section - Caption and Tags */}
                <div className="px-5 py-2 space-y-1">
                  <p className="text-2xl text-gray-200">{post.caption}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-md text-gray-300">
                        #{tag} {/* Display tags with # */}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Image Section */}
                <div className="px-5">
                  <img
                    src={post.photo}
                    alt="Post"
                    className="w-full h-80 object-cover rounded-t-xl"
                  />
                </div>

                {/* 4. Bottom Section - Links & Save Button */}
                <div className="flex justify-between p-4 border-gray-500">
                  <button className="hover:text-red-600 cursor-pointer">
                    <Heart />
                  </button>
                  <button className="hover:text-blue-700 cursor-pointer">
                    <Bookmark />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-1 py-5 w-full hidden lg:flex">
        <AllUsers />
      </div>
    </div>
  );
};

export default Home;
