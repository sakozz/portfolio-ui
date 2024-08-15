import { Link, NavLink, useLoaderData } from "react-router-dom";
import { Blog } from "../../../dao/blogs.dao.ts";

export default function BlogsList() {
  const blogs: Blog[] = useLoaderData() as Blog[];

  return (
    <div className={"flex flex-col gap-4 mt-8"}>
      <div className="blogs flex flex-row justify-between">
        <h2 className="text-3xl">Blogs List </h2>
        <NavLink to="new">
          <button type="button" className="btn btn-rounded btn-default">
            New Blog
          </button>
        </NavLink>
      </div>
      <div className={"mt-8 flex flex-col gap-4"}>
        {blogs.length > 0 &&
          blogs.map((blog: Blog, index: number) => (
            <Link
              to={`/blogs/${blog.slug}`}
              key={index}
              className="blog-card bg-white p-6 flex flex-col rounded-xl shadow-lvl-3-bottom"
            >
              <h2 className="text-2xl text-blue-50">{blog.title}</h2>
              <p>{blog.excerpt}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
