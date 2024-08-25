import { CompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import { CompetenceInfo } from './competence-info.tsx';
import { GroupCompetence } from '../../../../dao/group-competence.dao.ts';

export default function CompetenceGroupInfo({
  competenceGroup,
  onEdit,
}: {
  competenceGroup: CompetenceGroup;
  onEdit: (item: CompetenceGroup) => void;
}) {
  const handleEdit = (competenceGroup: CompetenceGroup) => {
    onEdit(competenceGroup);
  };
  return (
    <div>
      <div className={'flex flex-row justify-between gap-4'}>
        <h3 className={'text-xl font-bold '}>{competenceGroup.name}</h3>
        <button
          type="button"
          className={'btn btn-rounded'}
          onClick={() => handleEdit(competenceGroup)}>
          Edit
        </button>
      </div>
      <div>
        {competenceGroup.competences?.map(
          (item: GroupCompetence, index) =>
            item && <CompetenceInfo key={index} groupCompetence={item} />,
        )}
      </div>
    </div>
  );
}
