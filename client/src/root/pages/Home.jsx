import React from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { format } from "date-fns";
import { Bookmark, FilePenLine, Heart } from "lucide-react";
import AllUsers from "./AllUsers";

// Fetch posts with pagination using axios
const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await axios.get("/api/v1/users", {
    params: { page: pageParam, limit: 4 },
  });
  return response.data;
};

const Home = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery("posts", fetchPosts, {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    });

  if (error) return <div className="text-red-500">Error loading posts</div>;

  return (
    <div className="flex gap-5 py-3">
      <div className="px-6 w-full flex flex-col">
        {/* Display Cards */}
        <div className="flex flex-col gap-7 h-screen w-[50rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Explore Feed Heading */}
          <h2 className="text-3xl font-bold text-gray-100">
            Explore Feed
          </h2>
          {/* Map through posts */}
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-950 rounded-xl w-[28rem] self-center py-2"
                >
                  {/* 1. Top Section - User Info & Edit Icon */}
                  <div className="flex items-center justify-between p-3 border-b border-gray-200">
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
                        <p className="font-semibold text-lg text-gray-800">
                          {post.username}
                        </p>
                        <p className="text-md text-gray-500">
                          {format(new Date(post.createdAt), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-blue-600 cursor-pointer">
                      <FilePenLine />
                    </button>
                  </div>

                  {/* 2. Middle Section - Caption and Tags */}
                  <div className="px-5 py-2 space-y-1">
                    <p className="text-2xl text-gray-800">{post.caption}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-md text-gray-700">
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
                  <div className="flex justify-between p-4 border-gray-200">
                    <button className="hover:text-red-600 cursor-pointer">
                      <Heart />
                    </button>
                    <button className="hover:text-blue-700 cursor-pointer">
                      <Bookmark />
                    </button>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Load More Button */}
        {isFetchingNextPage ? (
          <div className="text-center py-4 text-gray-600">
            Loading more posts...
          </div>
        ) : (
          hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="block mx-auto py-3 px-8 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
            >
              Load More
            </button>
          )
        )}
      </div>
      <div className="px-1 py-5 w-full">
        <AllUsers />
      </div>
    </div>
  );
};

export default Home;
