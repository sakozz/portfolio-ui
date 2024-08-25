import { GroupCompetence } from '../../../../dao/group-competence.dao.ts';
import { competenceMap } from '../../../../types/cometence-mapping.ts';

export function CompetenceInfo({ groupCompetence }: { groupCompetence: GroupCompetence }) {
  return (
    <div className={'flex flex-row gap-4 justify-between'}>
      <span>{groupCompetence.competence?.name}</span>
      <span>{competenceMap[groupCompetence?.level]}</span>
    </div>
  );
}
