import { useQuery } from '@tanstack/react-query';
import { ArrayPayloadJSON } from '../../../../types/payload.interface.ts';
import { AxiosError, AxiosResponse } from 'axios';
import Profile from '../../../../dao/users.dao.ts';
import Modal from '../../../../components/modal/modal.tsx';
import CompetenceGroupForm from './competence-group.form.tsx';
import { useModalContext } from '../../../../components/modal/modal-context.tsx';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CompetenceGroup,
  fetchProfileCompetenceGroups,
} from '../../../../dao/competence-group.dao.ts';
import CompetenceGroupInfo from './competence-group-info.tsx';
import CompetenceGroupAbilities, {
  Can,
} from '../../../../components/ability-providers/competence-group.abilies.tsx';
import { Actions } from '../../../../lib/types.ts';
import { plainToInstance } from 'class-transformer';

export default function CompetenceGroups({ profile }: { profile: Profile }) {
  const { isOpen, openModal } = useModalContext();
  const [formCompetenceGroup, setFormCompetenceGroup] = useState<CompetenceGroup>(null);
  const newCompetenceGroup = plainToInstance(CompetenceGroup, { profileId: profile.id });

  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ['profiles', profile?.id, 'competences'],
    queryFn: ({ signal }) => fetchProfileCompetenceGroups(profile?.id, signal),
  });

  const handleCreateNew = () => {
    setFormCompetenceGroup(newCompetenceGroup);
    openModal();
  };

  const handleEdit = (competenceGroup: CompetenceGroup) => {
    setFormCompetenceGroup(competenceGroup as CompetenceGroup);
    openModal();
  };

  let content;
  if (error) {
    content = <p>Error has occurred</p>;
  }

  if (data) {
    const competenceGroups = data.data as ArrayPayloadJSON<CompetenceGroup>;
    content = competenceGroups.items.map((item) => (
      <CompetenceGroupInfo
        key={item.id}
        competenceGroup={item}
        onEdit={(item) => handleEdit(item as CompetenceGroup)}
      />
    ));
  }

  return (
    <CompetenceGroupAbilities>
      <div className={'flex flex-col w-full'} id="competences" data-scrollspy="competences">
        <div className={'flex flex-row justify-between gap-4'}>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1, duration: 1.2, type: 'spring' }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl text-secondary-500">
            Competences
          </motion.h2>
          <Can I={Actions.Create} this={newCompetenceGroup}>
            <button
              className={'btn btn-rounded btn-primary-outline'}
              type="button"
              onClick={handleCreateNew}>
              Add New
            </button>
          </Can>
        </div>
        <hr className={'my-4'} />
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">{content}</div>
        <AnimatePresence>
          {isOpen && (
            <Modal classname={'sm start'}>
              {formCompetenceGroup && (
                <CompetenceGroupForm
                  initialCompetenceGroup={formCompetenceGroup}
                  user={profile}></CompetenceGroupForm>
              )}
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </CompetenceGroupAbilities>
  );
}
