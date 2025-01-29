// src/App.jsx
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./root/RootLayout";
import SignupForm from "./auth/forms/SignupForm";
import LoginForm from "./auth/forms/LoginForm";
import Home from "./root/pages/Home";
import { ToastContainer } from "react-toastify";
import Saved from "./root/pages/Saved";
import AllUsers from "./root/pages/AllUsers";
import CreatePost from "./root/pages/CreatePost";
import EditPost from "./root/pages/EditPost";
import PostDetails from "./root/pages/PostDetails";
import DashBoard from "./root/pages/DashBoard";
import UpdateDashBoard from "./root/pages/UpdateDashBoard";

const App = () => {
  return (
    <main className="flex min-h-screen bg-black">
      <ToastContainer />
      <Routes>
        {/* AuthLayout Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* RootLayout Routes - private routes*/}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/dashboard:id/*" element={<DashBoard />} />
          <Route path="/update-dashboard/:id" element={<UpdateDashBoard />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
