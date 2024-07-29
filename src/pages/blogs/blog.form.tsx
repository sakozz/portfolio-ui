import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { z } from "zod";
import FormField from "../../components/form-field/form-field.tsx";
import { saveBlog } from "../../dao/blogs.dao.ts";
import { descriptionValidator, titleValidator } from "../../lib/validators.ts";

const blogFormSchema = z.object({
  title: z.literal("").or(titleValidator),
  body: descriptionValidator,
  excerpt: descriptionValidator,
});

type BlogFormFields = z.infer<typeof blogFormSchema>;

export default function BlogForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormFields>({
    defaultValues: {},
    resolver: zodResolver(blogFormSchema),
  });

  const onSubmit: SubmitHandler<BlogFormFields> = async (data) => {
    console.log(errors);
    try {
      await saveBlog(data)
      redirect('blogs')
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
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
