import { CompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import { CompetenceInfo } from './competence-info.tsx';
import { GroupCompetence } from '../../../../dao/group-competence.dao.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div className="card rounded-2xl p-6 pt-4">
      <div className={'flex flex-row justify-between items-center gap-2'}>
        <h3 className={'text-xl font-bold '}>{competenceGroup.name}</h3>
        <button
          type="button"
          className={'btn btn-rounded icon-btn'}
          onClick={() => handleEdit(competenceGroup)}>
          <FontAwesomeIcon icon="pen-to-square" />
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
