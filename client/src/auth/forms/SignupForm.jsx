// src/auth/forms/SignupForm.jsx

import { useState } from "react";
import { signUp } from "../../api/auth/auth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/Button.jsx";

const SignupForm = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password, fullname, username };
      const response = await signUp(credentials);
      toast.success(
        response.message || "Signup successful! You can now log in."
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-fit text-gray-50">
      <div className="p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold flex items-center justify-center mb-6">
          <img
            src="https://img.icons8.com/?size=100&id=43625&format=png&color=000000"
            alt="SocioGram"
            className="w-11 h-11 inline-block mx-3"
          />
          <span>Sign Up</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              required
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50"
            />
          </div>
          <Button type="submit" title="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default SignupForm;


