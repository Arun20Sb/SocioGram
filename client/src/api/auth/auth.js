// src/api/auth/authService.js
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const login = async (credentials) => {
  try {
    const response = await axios.post("/api/v1/users/login", credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "An error occurred during login"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const signUp = async (credentials) => {
  try {
    const response = await axios.post("/api/v1/users/sign-up", credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "An error occurred during sign-up"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const logOut = async () => {
  try {
    const response = await axios.post(
      "/api/v1/users/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    // If token is expired, catch it and log out the user
    if (error.response?.data?.message === "Token expired") {
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict";
      toast.error("Session expired. Please log in again. 😢");
      Navigate("/login"); // Navigate to login page
    } else {
      toast.error(error.message || "Something went wrong during logout.");
    }
  }
};

export { login, signUp, logOut };
