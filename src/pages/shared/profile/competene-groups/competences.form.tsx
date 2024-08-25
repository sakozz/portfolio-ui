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
import { CompetenceGroup, saveCompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import SelectInput, { SelectOption } from '../../../../components/select-input.tsx';
import { MultiValue } from 'react-select';
import { asSelectOptions, Competence, fetchCompetences } from '../../../../dao/competence.dao.ts';
import { ArrayPayloadJSON, QueryParams } from '../../../../types/payload.interface.ts';
import { useCompetencesGroupContext } from '../../../../lib/hooks.ts';
import { GroupCompetence } from '../../../../dao/group-competence.dao.ts';

const formSchema = z.object({
  name: nameValidator,
  competences: z.array(z.unknown()).min(1, 'Please select at least 1 competences'),
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
  const { showAssessmentView } = useCompetencesGroupContext();

  const preSelectedOptions: SelectOption[] = asSelectOptions(
    competenceGroup?.competences?.map((item) => item?.competence),
  );
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: competenceGroup?.name,
      competences: competenceGroup?.competences,
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
      showAssessmentView(result as CompetenceGroup);
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
    const record = Object.assign(competenceGroup, data) as CompetenceGroup;
    mutate({
      profileId: user.id,
      data: record,
    });
  };

  const setCompetences = (result: MultiValue<SelectOption>) => {
    const competences = result.map((item) => {
      const groupCompetence = item.value as GroupCompetence;
      groupCompetence.level =
        competenceGroup?.competences?.find(
          (item) => item.competenceId == groupCompetence.competenceId,
        )?.level || 0;
      return groupCompetence;
    });
    setValue('competences', competences, { shouldValidate: true });
  };

  const searchCompetences = async (searchTerm: string) => {
    const params: QueryParams = new QueryParams({ filters: [{ attr: 'name', value: searchTerm }] });

    const result = await fetchCompetences(params);
    if (result instanceof AxiosError) return [];
    const payload = result.data as ArrayPayloadJSON<Competence>;
    return asSelectOptions(payload.items);
  };

  return (
    <form className="form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormField label={'Name'} error={errors?.name?.message}>
        <input {...register('name')} type="text" className="form-control" placeholder="Name" />
      </FormField>
      <FormField label={'Competences'} error={errors?.competences?.message}>
        <SelectInput
          selectedOptions={preSelectedOptions}
          onChange={(result) => setCompetences(result)}
          optionsPromise={(searchTerm) => searchCompetences(searchTerm)}
        />
      </FormField>

      <div className="flex flex-row gap-2 justify-between">
        <button
          type="button"
          className={'btn btn-primary-outline btn-rounded'}
          onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-primary btn-rounded" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Loading...' : 'Next'}
        </button>
      </div>
    </form>
  );
}
