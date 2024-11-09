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
  const competencesWithLevel = () => {
    return competenceGroup.competences
      .filter((group: GroupCompetence) => group.level > 0)
      .sort((a, b) => b.level - a.level);
  };

  const competencesWithoutLevel = () => {
    return competenceGroup.competences.filter((group: GroupCompetence) => group.level < 1);
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
        <h3 className={'text-xl font-bold '}>{competenceGroup?.name}</h3>
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
        {competencesWithLevel()?.map(
          (item: GroupCompetence, index) =>
            item && <CompetenceInfo key={index} groupCompetence={item} />,
        )}

        {competencesWithLevel().length > 0 && competencesWithoutLevel().length > 0 && (
          <h5 className="font-bold mt-6  py-2">Others</h5>
        )}
        <div className="text-sm flex flex-row flex-wrap gap-x-3 gap-y-2">
          {competencesWithoutLevel().map(
            (item: GroupCompetence, index: number) =>
              item && (
                <p key={index} className="py-1 px-3 bg-secondary-50 rounded-full text-primary-500">
                  {item.competence?.name}
                </p>
              ),
          )}
        </div>
      </div>
    </motion.div>
  );
}
