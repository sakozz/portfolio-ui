import { Experience, fetchProfileExperiences } from '../../../../dao/experiences.dao.ts';
import { useQuery } from '@tanstack/react-query';
import { ArrayPayloadJSON } from '../../../../types/payload.interface.ts';
import { AxiosError, AxiosResponse } from 'axios';
import Profile from '../../../../dao/users.dao.ts';
import Modal from '../../../../components/modal/modal.tsx';
import ExperienceForm from './experience.form.tsx';
import { useModalContext } from '../../../../components/modal/modal-context.tsx';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Experiences({ user }: { user: Profile }) {
  const { isOpen, openModal } = useModalContext();
  const [formExperience, setFormExperience] = useState(null);
  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ['profiles', user?.id, 'experiences'],
    queryFn: ({ signal }) => fetchProfileExperiences(user?.id, signal),
  });

  const handleCreateNew = () => {
    setFormExperience({} as Experience);
    openModal();
  };

  const handleEdit = (experience: Experience) => {
    setFormExperience(experience);
    openModal();
  };

  let content;
  if (error) {
    content = <p>Error has occurred</p>;
  }
  if (data) {
    const experiences = data.data as ArrayPayloadJSON<Experience>;
    content = experiences.items.map((item, index) => (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.1, duration: 1.2, type: 'spring' }}
        viewport={{ once: true, amount: 0.2 }}
        key={index}
        className={'my-2'}>
        <div className={'flex flex-row justify-between gap-4'}>
          <h3 className={'text-xl font-bold '}>{item.jobTitle}</h3>
          <button type="button" className={'btn btn-rounded'} onClick={() => handleEdit(item)}>
            Edit
          </button>
        </div>
        <p className={'font-bold text-primary-900'}>
          {item.startDate} — {item.isCurrent ? 'Present' : item.endDate} | {item.companyName} |{' '}
          {item.link}
        </p>
        <p className={'text-primary-500'}>{item.responsibilities}</p>
      </motion.div>
    ));
  }

  return (
    <div className={'flex flex-col w-full'} id="experiences" data-scrollspy="experiences">
      <div className={'flex flex-row justify-between gap-4'}>
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 50, scale: 1.2 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.1, duration: 1, type: 'spring' }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl text-secondary-500">
          Experiences
        </motion.h2>
        <button
          className={'btn btn-rounded btn-primary-outline'}
          type="button"
          onClick={handleCreateNew}>
          Add New
        </button>
      </div>
      <hr className={'my-4'} />
      {content}
      <AnimatePresence>
        {isOpen && (
          <Modal classname={'sm start'}>
            {formExperience && (
              <ExperienceForm experience={formExperience} user={user}></ExperienceForm>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
