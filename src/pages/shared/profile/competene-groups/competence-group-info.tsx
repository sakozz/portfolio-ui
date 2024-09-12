import { CompetenceGroup } from '../../../../dao/competence-group.dao.ts';
import { CompetenceInfo } from './competence-info.tsx';
import { GroupCompetence } from '../../../../dao/group-competence.dao.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Can } from '../../../../components/ability-providers/competence-group.abilies.tsx';
import { Actions } from '../../../../lib/types.ts';
import { plainToInstance } from 'class-transformer';

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
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ delay: 0.1, duration: 1.2, type: 'spring' }}
      viewport={{ once: true, amount: 0.2 }}
      className="card rounded-2xl p-6 pt-4">
      <div className={'flex flex-row justify-between items-center gap-2'}>
        <h3 className={'text-xl font-bold '}>{competenceGroup.name}</h3>
        <Can I={Actions.Update} this={plainToInstance(CompetenceGroup, competenceGroup)}>
          <button
            type="button"
            className={'btn btn-rounded icon-btn'}
            onClick={() => handleEdit(competenceGroup)}>
            <FontAwesomeIcon icon="pen-to-square" />
          </button>
        </Can>
      </div>
      <div>
        {competenceGroup.competences?.map(
          (item: GroupCompetence, index) =>
            item && <CompetenceInfo key={index} groupCompetence={item} />,
        )}
      </div>
    </motion.div>
  );
}
