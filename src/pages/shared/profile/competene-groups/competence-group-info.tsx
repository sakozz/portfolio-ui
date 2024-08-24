import { CompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupCompetencesByIds } from '../../../../dao/competence.dao.ts';
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

  const { data }: { data: CompetenceGroup } = useQuery({
    queryKey: ['competences', competenceGroup.id],
    queryFn: ({ signal }) => fetchGroupCompetencesByIds(competenceGroup, signal),
  });
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
        {data &&
          data.competences?.map((item: GroupCompetence) => (
            <CompetenceInfo key={item.id} competence={item} />
          ))}
      </div>
    </div>
  );
}
