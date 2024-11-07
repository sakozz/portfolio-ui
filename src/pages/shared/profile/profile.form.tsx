import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { descriptionValidator, nameValidator } from '../../../lib/validators.ts';
import Profile, { saveProfile } from '../../../dao/users.dao.ts';
import { useDispatch } from 'react-redux';
import { useModalContext } from '../../../components/modal/modal-context.tsx';
import { useMutation } from '@tanstack/react-query';
import { AppQueryClient } from '../../../app.routes.tsx';
import { uiActions } from '../../../store/ui.store.ts';
import { Toast } from '../../../components/toast-messages/toast-messages.tsx';
import { AxiosError, AxiosResponse } from 'axios';
import { setValidationErrors } from '../../../dao/restApi.ts';
import FormField from '../../../components/form-field/form-field.tsx';
import { profileActions } from '../../../store/profile.store.ts';
import { profileConfigs } from '../../../profile-configs.ts';
import { sub } from 'date-fns/sub';
import DatePickerInput from '../../../components/date-picker.tsx';
import TipTapEditor from '../../../components/tip-tap-editor.tsx';

const profileFormSchema = z.object({
  firstName: nameValidator,
  lastName: nameValidator,
  jobTitle: z.string(),
  description: descriptionValidator,
  dateOfBirth: z.string().or(z.date()),
  address: z.string(),
  phone: z.string(),
  nationality: z.string(),
  linkedInUrl: z.string().optional(),
  stackoverflowUrl: z.string().optional(),
  githubUrl: z.string().optional(),
});
type FormFieldsType = typeof profileFormSchema;
type FormFields = z.infer<FormFieldsType>;

export default function ProfileForm({ profile }: { profile: Profile }) {
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      ...profile,
    },
    resolver: zodResolver(profileFormSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (payload: { data: Profile }) => saveProfile(payload.data),
    onMutate: () => {
      // Any modifications before api call
    },
    onSuccess: (res) => {
      closeModal();
      AppQueryClient.invalidateQueries({
        queryKey: ['profiles', profile?.username],
      });

      const payload = res as AxiosResponse<Profile>;
      dispatch(profileActions.setProfile({ currentProfile: payload.data as Profile }));

      dispatch(
        uiActions.addToast({
          toast: new Toast('Updated successfully', 'Updated the profile successfully.', 'success'),
        }),
      );
    },
    onError: (error: AxiosError) => {
      setValidationErrors<FormFields>(setError, error);
      dispatch(
        uiActions.addToast({
          toast: new Toast(
            'Failed update profile',
            'Sorry, Failed to update profile information',
            'error',
          ),
        }),
      );
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    mutate({
      data: { ...profile, ...data },
    });
  };

  const getMaxDate = () => {
    return sub(new Date(), { years: profileConfigs.minRequiredAge });
  };

  return (
    <form className="form flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h3 className={'text-2xl mt-0'}>{'Update Profile'}</h3>
      <p className="text-primary-500 text-sm">{profile.email}</p>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <FormField label={'First Name'} error={errors?.firstName?.message}>
          <input
            {...register('firstName')}
            type="text"
            className="form-control"
            placeholder="First Name"
          />
        </FormField>

        <FormField label={'Last Name'} error={errors?.lastName?.message}>
          <input
            {...register('lastName')}
            type="text"
            className="form-control"
            placeholder="Last Name"
          />
        </FormField>

        <FormField label={'Date of Birth'} error={errors?.dateOfBirth?.message}>
          <DatePickerInput
            control={control}
            controlName="dateOfBirth"
            selected={profile.dateOfBirth}
            maxDate={getMaxDate()}
          />
        </FormField>

        <FormField label={'Phone Number'} error={errors?.phone?.message}>
          <input {...register('phone')} className="form-control" placeholder="Phone Number" />
        </FormField>
        <FormField className="col-span-2" label={'Address'} error={errors?.address?.message}>
          <input {...register('address')} className="form-control" placeholder="Address" />
        </FormField>

        <FormField
          className="col-span-2"
          label={'Description'}
          error={errors?.description?.message}>
          <TipTapEditor
            control={control}
            controlName="description"
            value={profile.description}></TipTapEditor>
        </FormField>

        <FormField label={'Nationality'} error={errors?.nationality?.message}>
          <input {...register('nationality')} className="form-control" placeholder="Nationality" />
        </FormField>
        <FormField label={'Current Job Title'} error={errors?.jobTitle?.message}>
          <input
            {...register('jobTitle')}
            className="form-control"
            placeholder="Current Job Title"
          />
        </FormField>
        <FormField
          className="col-span-2"
          label={'LinkedIn Profile'}
          error={errors?.linkedInUrl?.message}>
          <input
            {...register('linkedInUrl')}
            className="form-control"
            placeholder="LinkedIn Profile"
          />
        </FormField>
        <FormField
          className="col-span-2"
          label={'Github Profile'}
          error={errors?.githubUrl?.message}>
          <input {...register('githubUrl')} className="form-control" placeholder="Github Profile" />
        </FormField>
      </div>

      <div className="flex flex-row gap-2 justify-end mt-4">
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
