// src/auth/AuthLayout.jsx
import { Navigate, Outlet, useLocation, Link } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
            <p className="text-gray-50">
              {isLoginPage ? (
                <>
                  New here? 🚀{" "}
                  <Link
                    to="/sign-up"
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account? 🔑{" "}
                  <Link
                    to="/login"
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Log in
                  </Link>
                </>
              )}
            </p>
          </section>

          <img
            src="https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
