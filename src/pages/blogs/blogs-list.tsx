import { useLoaderData } from "react-router-dom";
import { Blog } from "../../dao/blogs.dao.ts";

export default function BlogsList() {
  const blogs: Blog[] = useLoaderData() as Blog[];

  return (
    <div>
      <h2>Blogs list!</h2>
      {blogs.length > 0 && blogs.map((blog: Blog, index: number) => (
        <div key={index} className="blog-card flex flex-col gap-4">
          <h2 className="text-3xl">{blog.title}</h2>
          <p>{blog.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
