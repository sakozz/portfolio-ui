import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { nameValidator } from '../../../../lib/validators.ts';
import { useMutation } from '@tanstack/react-query';
import { uiActions } from '../../../../store/ui.store.ts';
import { Toast } from '../../../../components/toast-messages/toast-messages.tsx';
import { useDispatch } from 'react-redux';
import Profile from '../../../../dao/users.dao.ts';
import FormField from '../../../../components/form-field/form-field.tsx';
import { useModalContext } from '../../../../components/modal/modal-context.tsx';
import SwitchInput from '../../../../components/switch.tsx';
import { AxiosError } from 'axios';
import { setValidationErrors } from '../../../../dao/restApi.ts';
import { AppQueryClient } from '../../../../app.routes.tsx';
import { Education, saveEducation } from '../../../../dao/education.ts';

const educationFormSchema = z.object({
  degreeProgram: nameValidator,
  university: nameValidator,
  startDate: z.string(),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
  link: z.string().optional(),
});
type FormFieldsType = typeof educationFormSchema;
type FormFields = z.infer<FormFieldsType>;

export default function EducationForm({
  education,
  profile,
}: {
  education: Education;
  profile: Profile;
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
      ...education,
    },
    resolver: zodResolver(educationFormSchema),
  });

  console.log(errors);
  const { mutate } = useMutation({
    mutationFn: (payload: { profileId: number; data: Education }) =>
      saveEducation(payload.profileId, payload.data),
    onMutate: () => {
      // Any modifications before api call
    },
    onSuccess: () => {
      closeModal();
      AppQueryClient.invalidateQueries({
        queryKey: ['profiles', profile?.id, 'educations'],
      });

      dispatch(
        uiActions.addToast({
          toast: new Toast('Saved successfully', 'Saved the education record.', 'success'),
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
    const record = Object.assign(education, data);
    mutate({
      profileId: profile.id,
      data: record,
    });
  };

  return (
    <form className="form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className={'text-2xl mt-0'}>
        {education.id ? 'Update Experience' : 'Create Experience'}
      </h3>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      <hr />
      <FormField label={'Degree Program'} error={errors?.degreeProgram?.message}>
        <input
          {...register('degreeProgram')}
          type="text"
          className="form-control"
          placeholder="Degree Program Name"
        />
      </FormField>

      <FormField label={'University Name'} error={errors?.university?.message}>
        <input
          {...register('university')}
          className="form-control"
          placeholder="Name of the University"
        />
      </FormField>
      <FormField label={'Link'} error={errors?.link?.message}>
        <input {...register('link')} className="form-control" placeholder="Company website" />
      </FormField>

      <FormField label={'Start Date'} hint={'2022/02/30'} error={errors?.startDate?.message}>
        <input {...register('startDate')} className="form-control" placeholder="Start" />
      </FormField>

      <FormField label={'End Date'} error={errors?.endDate?.message}>
        <input {...register('endDate')} className="form-control" placeholder="End" />
      </FormField>

      <SwitchInput register={register('isCurrent')} error={errors.isCurrent?.message}>
        <p>Is Current</p>
      </SwitchInput>

      <div className="flex flex-row gap-2 justify-end">
        <button
          type="button"
          className={'btn btn-primary-outline btn-rounded'}
          onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-primary btn-rounded" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
