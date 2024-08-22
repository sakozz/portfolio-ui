import { CompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import User from '../../../../dao/users.dao.ts';
import CompetencesForm from './competences.form.tsx';
import { createContext, useContext, useState } from 'react';
import CompetencesAssessmentForm from './competences-assessment.form.tsx';

export const CompetencesGroupFormContext = createContext({
  isAssessmentView: false,
  competenceGroup: {} as CompetenceGroup,
  showAssessmentView: (group: CompetenceGroup) => {},
});

export function useCompetencesGroupContext() {
  const ctx = useContext(CompetencesGroupFormContext);
  if (!ctx) {
    throw new Error('Component should be wrapped in CompetencesGroupFormContext');
  }
  return ctx;
}

export default function CompetenceGroupForm({
  initialCompetenceGroup,
  user,
}: {
  initialCompetenceGroup: CompetenceGroup;
  user: User;
}) {
  const [isAssessmentView, setIsAssessmentView] = useState(false);
  const [competenceGroup, setCompetenceGroup] = useState(initialCompetenceGroup);

  const showAssessmentView = (group: CompetenceGroup) => {
    setCompetenceGroup(group);
    setIsAssessmentView(true);
  };

  const ctxValue = { isAssessmentView, competenceGroup, showAssessmentView };

  return (
    <CompetencesGroupFormContext.Provider value={ctxValue}>
      <div>
        <h3 className={'text-2xl mt-0'}>
          {competenceGroup?.id ? 'Update Competences' : 'Add Competences'}
        </h3>
        <hr className={'my-4'} />
        {isAssessmentView && <CompetencesAssessmentForm></CompetencesAssessmentForm>}

        {!isAssessmentView && (
          <CompetencesForm competenceGroup={competenceGroup} user={user}></CompetencesForm>
        )}
      </div>
    </CompetencesGroupFormContext.Provider>
  );
}
