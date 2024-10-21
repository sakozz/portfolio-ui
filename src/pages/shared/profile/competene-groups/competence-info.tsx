import { GroupCompetence } from '../../../../dao/group-competence.dao.ts';
import { competenceMap } from '../../../../lib/constants.ts';

export function CompetenceInfo({ groupCompetence }: { groupCompetence: GroupCompetence }) {
  const competencePercentage = () => (groupCompetence.level / 5) * 100;
  return (
    <div className="grid grid-cols-2 justify-between my-2">
      <div>
        <span className="text-sm">{groupCompetence.competence?.name}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-primary-400 mb-1">
          {competenceMap[groupCompetence.level]}
        </span>
        <div className="w-full h-[3px] bg-primary-100 rounded relative">
          <div
            className="bg-secondary-200 h-[5px] rounded -top-[1px] start-0 absolute"
            style={{ width: competencePercentage() + '%' }}></div>
        </div>
      </div>
    </div>
  );
}
