import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import { SsoLoginLoader } from "./dao/session.dao.ts";
import Auth from "./pages/public/auth/auth.tsx";
import LoginPage from "./pages/public/auth/login.tsx";
import SSOCallback from "./pages/public/auth/sso-callback.tsx";

import ErrorPage from "./components/Error.tsx";
import { blogDetailsLoader, blogsListLoader } from "./dao/blogs.dao.ts";
import RootLayout from "./root-layout.tsx";
import Internal from "./pages/int/internal.tsx";
import Overview from "./pages/int/overview/overview.tsx";
import Profiles from "./pages/int/profiles/profiles.tsx";
import ProfilesCollection from "./pages/int/profiles/profiles-collection.tsx";
import Profile from "./pages/int/profiles/profile.tsx";
import PublicPages from "./pages/public/public.tsx";
import About from "./pages/public/about/about.tsx";
import Resume from "./pages/public/resume/resume.tsx";
import Contact from "./pages/public/contact/contact.tsx";
import Blogs from "./pages/public/blogs/blogs.tsx";
import BlogsList from "./pages/public/blogs/blogs-list.tsx";
import BlogPage from "./pages/public/blogs/blog.tsx";

export const AppQueryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PublicPages />,
        children: [
          { index: true, element: <About /> },
          {
            path: "resume",
            element: <Resume />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "auth",
            element: <Auth />,
            children: [
              {
                index: true,
                element: <LoginPage />,
              },
              {
                path: "google/sso-callback",
                element: <SSOCallback />,
                loader: SsoLoginLoader,
              },
            ],
          },
        ],
      },
      {
        path: "int",
        element: <Internal />,
        children: [
          { index: true, element: <Overview /> },
          {
            path: "profiles",
            element: <Profiles />,
            children: [
              { index: true, element: <ProfilesCollection /> },
              { path: ":id", element: <Profile /> },
            ],
          },
        ],
      },
      {
        path: "blogs",
        element: <Blogs />,
        children: [
          {
            index: true,
            element: <BlogsList />,
            loader: blogsListLoader,
          },
          {
            path: ":id",
            id: "blog-detail",
            element: <BlogPage />,
            loader: blogDetailsLoader,
          },
        ],
      },
    ],
  },
]);

export default router;
