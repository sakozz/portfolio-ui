import { CompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import User from '../../../../dao/users.dao.ts';
import CompetencesForm from './competences.form.tsx';
import { useState } from 'react';
import CompetencesAssessmentForm from './competences-assessment.form.tsx';
import { CompetencesGroupFormContext } from '../../../../lib/hooks.ts';

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

  const showCompetencesView = (group: CompetenceGroup) => {
    setCompetenceGroup(group);
    setIsAssessmentView(false);
  };

  const ctxValue = { isAssessmentView, competenceGroup, showAssessmentView, showCompetencesView };

  return (
    <CompetencesGroupFormContext.Provider value={ctxValue}>
      <div>
        <h3 className={'text-2xl mt-0'}>
          {competenceGroup?.id ? 'Update Competences' : 'Add Competences'}
        </h3>
        <hr className={'my-4'} />
        {isAssessmentView && <CompetencesAssessmentForm user={user}></CompetencesAssessmentForm>}
        {!isAssessmentView && (
          <CompetencesForm competenceGroup={competenceGroup} user={user}></CompetencesForm>
        )}
      </div>
    </CompetencesGroupFormContext.Provider>
  );
}
