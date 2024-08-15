import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { z } from "zod";
import FormField from "../../../components/form-field/form-field.tsx";
import { Blog, saveBlog } from "../../../dao/blogs.dao.ts";
import { setValidationErrors } from "../../../dao/restApi.ts";
import {
  descriptionValidator,
  titleValidator,
} from "../../../lib/validators.ts";

const blogFormSchema = z.object({
  title: z.literal("").or(titleValidator),
  body: descriptionValidator,
  excerpt: descriptionValidator,
});
type FormFieldsType = typeof blogFormSchema;
type BlogFormFields = z.infer<FormFieldsType>;

export default function BlogForm() {
  const blog: Blog = useLoaderData() as Blog;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormFields>({
    defaultValues: {
      title: blog.title,
      body: blog.body,
      excerpt: blog.excerpt,
    },
    resolver: zodResolver(blogFormSchema),
  });

  const onSubmit: SubmitHandler<BlogFormFields> = async (data) => {
    const result = await saveBlog(data, blog?.slug);
    if (result instanceof AxiosError) {
      setValidationErrors<BlogFormFields>(setError, result);
    } else {
      navigate("/blogs");
    }
  };

  return (
    <form
      className="form flex flex-col gap-4 my-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}

      <FormField label={"Title"} error={errors?.title?.message}>
        <input
          {...register("title")}
          type="text"
          className="form-control"
          placeholder="Title"
        />
      </FormField>
      <FormField label={"Excerpt"} error={errors?.excerpt?.message}>
        <textarea
          {...register("excerpt")}
          className="form-control"
          placeholder="Excerpt"
          rows={4}
        ></textarea>
      </FormField>
      <FormField label={"Body"} error={errors?.body?.message}>
        <textarea
          {...register("body")}
          className="form-control"
          placeholder="Body"
          rows={10}
        ></textarea>
      </FormField>
      <div className="flex flex-row gap-2 justify-end">
        <button type="button" className={"btn btn-outline-light btn-rounded"}>
          Cancel
        </button>
        <button
          className="btn btn-default btn-rounded"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
