import { createBrowserRouter } from "react-router-dom";
import About from "./pages/about/about.tsx";
import Auth from "./pages/auth/auth.tsx";
import LoginPage from "./pages/auth/login.tsx";
import BlogsList from "./pages/blogs/blogs-list.tsx";
import Blogs from "./pages/blogs/blogs.tsx";
import ErrorPage from "./components/Error.tsx";
import { blogDetailsLoader, blogsListLoader } from "./dao/blogs.dao.ts";
import Contact from "./pages/contact/contact.tsx";
import Resume from "./pages/resume/resume.tsx";
import RootLayout from "./root-layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <About /> },
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
            loader: blogDetailsLoader,
          },
        ],
      },
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
        ],
      },
    ],
  },
]);

export default router;
