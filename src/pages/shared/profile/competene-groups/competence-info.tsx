import { GroupCompetence } from '../../../../dao/group-competence.dao.ts';

const competenceMap: Record<number, string> = {
  0: 'Unspecified',
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
  5: 'Master',
};

export function CompetenceInfo({ competence }: { competence: GroupCompetence }) {
  return (
    <div className={'flex flex-row gap-4 justify-between'}>
      <span>{competence.competencesName}</span> <span>{competenceMap[competence.level]}</span>
    </div>
  );
}
