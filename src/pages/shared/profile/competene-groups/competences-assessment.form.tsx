import { useCompetencesGroupContext } from '../../../../lib/hooks.ts';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import FormField from '../../../../components/form-field/form-field.tsx';
import { useModalContext } from '../../../../components/modal/modal-context.tsx';
import { CompetenceGroup, saveCompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import { useMutation } from '@tanstack/react-query';
import { uiActions } from '../../../../store/ui.store.ts';
import { Toast } from '../../../../components/toast-messages/toast-messages.tsx';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import User from '../../../../dao/users.dao.ts';
import { GroupCompetence } from '../../../../dao/group-competence.dao.ts';
import { Competence } from '../../../../dao/competence.dao.ts';
import { AppQueryClient } from '../../../../app.routes.tsx';

interface FormFields {
  competenceLevel: {
    level: number;
    id: number;
    competenceId: number;
    competence: Competence;
  }[];
}

export default function CompetencesAssessmentForm({ user }: { user: User }) {
  const { competenceGroup, showCompetencesView } = useCompetencesGroupContext();
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, isValid },
  } = useForm<FormFields>();
  const { fields, append } = useFieldArray({
    control,
    name: 'competenceLevel',
  });

  // User this ref to prevent from duplicate fields
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) {
      competenceGroup.competences.forEach((competence) => {
        append({
          level: competence.level,
          id: competence.id,
          competenceId: competence.competenceId,
          competence: competence.competence,
        });
      });
    }
    return () => {
      ref.current = true;
    };
  }, [append, competenceGroup]);

  const { mutate } = useMutation({
    mutationFn: (payload: { profileId: number; data: CompetenceGroup }) =>
      saveCompetenceGroup(payload.profileId, payload.data),
    onMutate: () => {
      // Any modifications before api call
    },
    onSuccess: () => {
      AppQueryClient.invalidateQueries({
        queryKey: ['profiles', user?.id, 'competences'],
      });
      closeModal();
      dispatch(
        uiActions.addToast({
          toast: new Toast('Saved successfully', 'Saved the Competence group record.', 'success'),
        }),
      );
    },
    onError: (error: AxiosError) => {
      console.log(error);
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
    const record = Object.assign(competenceGroup);
    record.competences = data.competenceLevel as GroupCompetence[];
    mutate({
      profileId: user.id,
      data: record,
    });
  };

  return (
    <div>
      <h1>Competences Assessment Form</h1>
      <form className="form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {fields &&
          fields.map((field, index) => (
            <FormField key={field.id} label={competenceGroup.competences[index]?.competence?.name}>
              <input
                {...register(`competenceLevel.${index}.level`)}
                type="number"
                className="form-control"
                placeholder="Level"
              />
            </FormField>
          ))}
        <div className="flex flex-row gap-2 justify-between">
          <button
            type="button"
            className={'btn btn-primary-light btn-rounded'}
            onClick={() => showCompetencesView(competenceGroup)}>
            Previous
          </button>
          <div className="flex flex-row justify-between gap-4">
            <button
              type="button"
              className={'btn btn-outline-light btn-rounded'}
              onClick={closeModal}>
              Cancel
            </button>
            <button
              className="btn btn-primary btn-rounded"
              disabled={isSubmitting || !isValid}
              type="submit">
              {isSubmitting ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
