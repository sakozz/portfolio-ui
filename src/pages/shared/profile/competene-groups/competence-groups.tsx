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

export default function CompetenceGroups({ user }: { user: Profile }) {
  const { isOpen, openModal } = useModalContext();
  const [formCompetenceGroup, setFormCompetenceGroup] = useState<CompetenceGroup>(null);

  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ['profiles', user?.id, 'competences'],
    queryFn: ({ signal }) => fetchProfileCompetenceGroups(user?.id, signal),
  });

  const handleCreateNew = () => {
    setFormCompetenceGroup({} as CompetenceGroup);
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
        <button
          className={'btn btn-rounded btn-primary-outline'}
          type="button"
          onClick={handleCreateNew}>
          Add New
        </button>
      </div>
      <hr className={'my-4'} />
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{content}</div>
      <AnimatePresence>
        {isOpen && (
          <Modal classname={'sm start'}>
            {formCompetenceGroup && (
              <CompetenceGroupForm
                initialCompetenceGroup={formCompetenceGroup}
                user={user}></CompetenceGroupForm>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
