import { User } from "../models/User.model.js";
import { Post } from "../models/Post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const SignupUser = async (req, res) => {
  try {
    // Get user data from the request body:
    const { fullname, username, email, password } = req.body;

    // Check if all required fields are provided:
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled!" });
    }

    // Check if the user already exists:
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return res.status(409).json({ message: "User already exists!" }); // Conflict status
    }

    // Create a new user entry in the database:
    const newUser = new User({
      fullname,
      username,
      email,
      password,
    });

    // Save the new user to the database:
    await newUser.save();

    // Fetch the newly created user without sensitive fields:
    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({ message: "Error creating user!" });
    }

    // Respond with the created user data:
    return res.status(201).json({
      data: createdUser,
      message: "User created successfully! 🎉",
    });
  } catch (error) {
    // Log the error and return a generic error message:
    console.error("Error creating user:", error.message);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};

const generateAccessToken_RefreshToken = async (userId) => {
  try {
    // Find user by ID:
    const user = await User.findById(userId);

    // Generate access and refresh tokens:
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token to the user:
    user.refreshToken = refreshToken;

    // Save the updated user without validating before save:
    await user.save({ validateBeforeSave: false });

    // Return tokens:
    return { accessToken, refreshToken };
  } catch (error) {
    // Throw an error if something goes wrong:
    throw new Error(
      "Something went wrong while generating access and refresh tokens!"
    );
  }
};

const LoginUser = async (req, res) => {
  try {
    // Get user details from request body:
    const { username, email, password } = req.body;

    // Check if all fields are provided:
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields must be filled!" });
    }

    // Find user in the database by username or email:
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    // Validate the password:
    const checkPassword = await user.isPasswordCorrect(password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    // Generate access and refresh tokens:
    const { accessToken, refreshToken } =
      await generateAccessToken_RefreshToken(user._id);

    // Fetch user data excluding sensitive info:
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // Cookie options for tokens:
    const cookieOptions = {
      httpOnly: true,
      secure: true, // Use true for HTTPS, set false for local dev
    };

    // Send response with user data and tokens:
    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        data: {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        message: "User logged in successfully! 🎉",
      });
  } catch (error) {
    // Handle errors during login:
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const LogoutUser = async (req, res) => {
  try {
    // Clear the refresh token from the database
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const options = {
      httpOnly: true, // Prevents JavaScript from accessing the cookie (security)
      secure: true, // Ensures cookie is sent only over HTTPS
      sameSite: "Strict", // Prevents sending the cookie on cross-site requests
    };

    // Clear cookies and send success response
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "User logged out successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong during logout.",
    });
  }
};

const CreatePostUser = async (req, res) => {
  try {
    const { caption, location, tags } = req.body;
    const userId = req.user._id; // Assuming user is authenticated and user info is in req.user

    // Check if essential fields are provided
    if (!caption || !location || !tags) {
      return res.status(400).json({
        success: false,
        message: "Caption, location, and tags are required!",
      });
    }

    // Handle photo upload
    const photoLocalPath = req.file?.path;
    if (!photoLocalPath) {
      return res.status(400).json({
        success: false,
        message: "Photo file is missing!",
      });
    }

    const photoURL = await uploadOnCloudinary(photoLocalPath);
    if (!photoURL) {
      return res.status(400).json({
        success: false,
        message: "Error uploading photo!",
      });
    }

    // Create new post in the database
    const newPost = new Post({
      caption,
      photo: photoURL.url,
      location,
      tags,
      user: userId,
    });

    // Save post
    await newPost.save();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Post created successfully! 🎉",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the post.",
    });
  }
};

const AllPostUsers = async (req, res) => {
  try {
    // Fetch all posts and sort them by the createdAt field in descending order
    const posts = await Post.find().sort({ createdAt: -1 }); // Assuming you have a createdAt field, or sort by _id

    // If no posts are found, send a response indicating that
    if (!posts.length) {
      return res.status(404).json({
        success: false,
        message: "No posts found.",
      });
    }

    // Send success response with the fetched posts
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching posts.",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch users and their post count using aggregation
    const users = await User.aggregate([
      {
        $lookup: {
          from: "posts", // look into posts collection
          localField: "_id", // join by user _id
          foreignField: "user", // each post has a user field (this links the user with posts)
          as: "posts", // array of posts for each user
        },
      },
      {
        $project: {
          username: 1, // include username
          email: 1,
          fullName: 1,
          postsCount: { $size: "$posts" }, // count how many posts the user has
        },
      },
    ]);

    // Return 404 if no users
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found!! 💀" });
    }

    // return the collection - array
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).jsno({ error: "Server Error" });
  }
};

export {
  SignupUser,
  LoginUser,
  LogoutUser,
  CreatePostUser,
  AllPostUsers,
  getAllUsers,
};
