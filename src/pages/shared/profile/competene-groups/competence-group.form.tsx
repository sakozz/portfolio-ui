import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
import { useModalContext } from "../../../../components/modal/modal-context.tsx";
import { AxiosError } from "axios";
import { setValidationErrors } from "../../../../dao/restApi.ts";
import { AppQueryClient } from "../../../../app.routes.tsx";
import {
  CompetenceGroup,
  saveCompetenceGroup,
} from "../../../../dao/competence-group.dao.ts";

const formSchema = z.object({
  name: nameValidator,
  description: descriptionValidator,
});
type FormFieldsType = typeof formSchema;
type FormFields = z.infer<FormFieldsType>;

export default function CompetenceGroupForm({
  competenceGroup,
  user,
}: {
  competenceGroup: CompetenceGroup;
  user: User;
}) {
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      ...competenceGroup,
    },
    resolver: zodResolver(formSchema),
  });
  console.log(competenceGroup);
  const { mutate } = useMutation({
    mutationFn: (payload: { profileId: number; data: CompetenceGroup }) =>
      saveCompetenceGroup(payload.profileId, payload.data),
    onMutate: () => {
      // Any modifications before api call
    },
    onSuccess: () => {
      closeModal();
      AppQueryClient.invalidateQueries({
        queryKey: ["profiles", user?.id, "competenceGroups"],
      });

      dispatch(
        uiActions.addToast({
          toast: new Toast(
            "Saved successfully",
            "Saved the Competence group record.",
            "success",
          ),
        }),
      );
    },
    onError: (error: AxiosError) => {
      setValidationErrors<FormFields>(setError, error);
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const record = Object.assign(competenceGroup, data);
    mutate({
      profileId: user.id,
      data: record,
    });
  };

  return (
    <form
      className="form flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className={"text-2xl mt-0"}>
        {competenceGroup.id ? "Update Competences" : "Add Competences"}
      </h3>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      <hr />
      <FormField label={"Name"} error={errors?.name?.message}>
        <input
          {...register("name")}
          type="text"
          className="form-control"
          placeholder="Name"
        />
      </FormField>
      <FormField label={"Description"} error={errors?.description?.message}>
        <textarea
          {...register("description")}
          className="form-control"
          placeholder="Short Description"
          rows={4}
        ></textarea>
      </FormField>

      <div className="flex flex-row gap-2 justify-end">
        <button
          type="button"
          className={"btn btn-outline-light btn-rounded"}
          onClick={closeModal}
        >
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
