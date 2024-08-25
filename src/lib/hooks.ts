import { createContext, useContext } from 'react';
import { CompetenceGroup } from '../dao/competence-group.dao.ts';

export type CompetencesGroupFormContextType = {
  isAssessmentView: boolean;
  competenceGroup: CompetenceGroup;
  showAssessmentView: (group: CompetenceGroup) => void;
  showCompetencesView: (group: CompetenceGroup) => void;
};

export const CompetencesGroupFormContext = createContext<CompetencesGroupFormContextType | null>(
  null,
);

export function useCompetencesGroupContext() {
  const ctx = useContext(CompetencesGroupFormContext);
  if (!ctx) {
    throw new Error('Component should be wrapped in CompetencesGroupFormContext');
  }
  return ctx;
}
