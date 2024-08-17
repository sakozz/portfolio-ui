import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Experience, saveExperience } from "../../../../dao/experiences.dao.ts";
import {
  descriptionValidator,
  nameValidator,
} from "../../../../lib/validators.ts";
import { useMutation } from "@tanstack/react-query";
import { uiActions } from "../../../../store/ui.store.ts";
import { Toast } from "../../../../components/toast-messages/toast-messages.tsx";
import { useDispatch } from "react-redux";
import User from "../../../../dao/users.dao.ts";
import FormField from "../../../../components/form-field/form-field.tsx";

const experienceFormSchema = z.object({
  jobTitle: nameValidator,
  responsibilities: descriptionValidator,
  companyName: nameValidator,
  startDate: z.string(),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
  link: z.string().optional(),
});
type FormFieldsType = typeof experienceFormSchema;
type ExperienceFormFields = z.infer<FormFieldsType>;

export default function ExperienceForm({
  experience,
  user,
}: {
  experience: Experience;
  user: User;
}) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormFields>({
    defaultValues: {
      jobTitle: experience.jobTitle,
      responsibilities: experience.responsibilities,
      companyName: experience.companyName,
    },
    resolver: zodResolver(experienceFormSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (payload: { profileId: number; data: unknown }) =>
      saveExperience(payload.profileId, payload.data),
    onMutate: () => {
      // Any modifications before api call
    },
    onSuccess: () => {
      dispatch(
        uiActions.addToast({
          toast: new Toast("Logged Out", "Successfully logged out.", "success"),
        }),
      );
    },
    onError: () => {
      dispatch(
        uiActions.addToast({
          toast: new Toast(
            "Failed to log out",
            "Sorry, Failed to log you out from the system.",
            "error",
          ),
        }),
      );
    },
  });

  const onSubmit: SubmitHandler<ExperienceFormFields> = async (data) => {
    mutate({
      profileId: user.id,
      data: data,
    });
  };

  return (
    <form
      className="form flex flex-col gap-4 my-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}

      <FormField label={"Title"} error={errors?.jobTitle?.message}>
        <input
          {...register("jobTitle")}
          type="text"
          className="form-control"
          placeholder="Job Title"
        />
      </FormField>
      <FormField label={"Excerpt"} error={errors?.responsibilities?.message}>
        <textarea
          {...register("responsibilities")}
          className="form-control"
          placeholder="Responsibilities"
          rows={4}
        ></textarea>
      </FormField>
      <FormField label={"Body"} error={errors?.companyName?.message}>
        <input
          {...register("companyName")}
          className="form-control"
          placeholder="Name of Company"
        />
      </FormField>
      <FormField label={"Body"} error={errors?.link?.message}>
        <input
          {...register("link")}
          className="form-control"
          placeholder="Company website"
        />
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
