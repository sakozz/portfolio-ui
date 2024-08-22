import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { nameValidator } from '../../../../lib/validators.ts';
import { useMutation } from '@tanstack/react-query';
import { uiActions } from '../../../../store/ui.store.ts';
import { Toast } from '../../../../components/toast-messages/toast-messages.tsx';
import { useDispatch } from 'react-redux';
import User from '../../../../dao/users.dao.ts';
import FormField from '../../../../components/form-field/form-field.tsx';
import { useModalContext } from '../../../../components/modal/modal-context.tsx';
import { AxiosError } from 'axios';
import { setValidationErrors } from '../../../../dao/restApi.ts';
import { AppQueryClient } from '../../../../app.routes.tsx';
import { CompetenceGroup, saveCompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import SelectInput, { SelectOption } from '../../../../components/select-input.tsx';
import { MultiValue } from 'react-select';
import { asSelectOptions, Competence, fetchCompetences } from '../../../../dao/competence.dao.ts';

const formSchema = z.object({
  name: nameValidator,
  competences: z.array(z.unknown()).min(4, 'Please select at least 4 competences'),
});
type FormFieldsType = typeof formSchema;
type FormFields = z.infer<FormFieldsType>;

export default function CompetencesForm({
  competenceGroup,
  user,
}: {
  competenceGroup: CompetenceGroup;
  user: User;
}) {
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();
  //const { showAssessmentView } = useCompetencesGroupContext();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: competenceGroup?.name,
    },
    resolver: zodResolver(formSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (payload: { profileId: number; data: CompetenceGroup }) =>
      saveCompetenceGroup(payload.profileId, payload.data),
    onMutate: () => {
      // Any modifications before api call
    },
    onSuccess: (result) => {
      closeModal();
      AppQueryClient.invalidateQueries({
        queryKey: ['profiles', user?.id, 'competenceGroups'],
      });
      console.log(result);
      //showAssessmentView(result as AxiosResponse);
      dispatch(
        uiActions.addToast({
          toast: new Toast('Saved successfully', 'Saved the Competence group record.', 'success'),
        }),
      );
    },
    onError: (error: AxiosError) => {
      setValidationErrors<FormFields>(setError, error);
      dispatch(
        uiActions.addToast({
          toast: new Toast(
            'Failed to log out',
            'Sorry, Failed to log you out from the system.',
            'error',
          ),
        }),
      );
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const record = Object.assign(competenceGroup, data);
    mutate({
      profileId: user.id,
      data: record,
    });
  };

  const updateCompetences = (result: MultiValue<SelectOption>) => {
    const competences = result.map((item) => item.value);
    setValue('competences', competences, { shouldValidate: true });
  };

  const searchCompetences = async (searchTerm: string) => {
    const result = await fetchCompetences({ term: searchTerm });
    if (result instanceof AxiosError) return [];
    return asSelectOptions(result.data as Competence[]);
  };

  return (
    <form className="form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormField label={'Name'} error={errors?.name?.message}>
        <input {...register('name')} type="text" className="form-control" placeholder="Name" />
      </FormField>
      <FormField label={'Competences'} error={errors?.competences?.message}>
        <SelectInput
          onChange={(result) => updateCompetences(result)}
          optionsPromise={(searchTerm) => searchCompetences(searchTerm)}
        />
      </FormField>

      <div className="flex flex-row gap-2 justify-between">
        <button type="button" className={'btn btn-outline-light btn-rounded'} onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-default btn-rounded" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Loading...' : 'Next'}
        </button>
      </div>
    </form>
  );
}
