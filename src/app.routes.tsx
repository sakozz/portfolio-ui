import { createBrowserRouter } from "react-router-dom";
import About from "./about/about.tsx";
import BlogsList from "./blogs/blogs-list.tsx";
import Blogs from "./blogs/blogs.tsx";
import ErrorPage from "./components/Error.tsx";
import { blogDetailsLoader, blogsListLoader } from "./dao/blogs.dao.ts";
import Resume from "./resume/resume.tsx";
import RootLayout from "./Root.tsx";

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
    ],
  },
]);

export default router;
