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
import TimelineEvent from '../../../../components/timeline-event.tsx';
import { plainToInstance } from 'class-transformer';
import ExperienceAbilities, {
  Can,
} from '../../../../components/ability-providers/experience.abilities.tsx';
import { Actions } from '../../../../lib/types.ts';

export default function Experiences({ profile }: { profile: Profile }) {
  const { isOpen, openModal } = useModalContext();
  const [formExperience, setFormExperience] = useState(null);
  const newExperience = plainToInstance(Experience, { profileId: profile.id });
  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ['profiles', profile?.id, 'experiences'],
    queryFn: ({ signal }) => fetchProfileExperiences(profile?.id, signal),
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
      <TimelineEvent
        key={index}
        title={item.jobTitle}
        label={item.companyName}
        link={item.link}
        start={item.startDate}
        end={item.isCurrent ? 'Present' : item.endDate}
        isFirst={index == 0}
        isLast={index == experiences.items.length - 1}>
        <div className="flex flex-row justify-between items-start relative">
          <p className={'text-primary-500'}>{item.responsibilities}</p>
          <Can I={Actions.Update} this={plainToInstance(Experience, item)}>
            <button
              type="button"
              className={'btn btn-rounded absolute -top-16 end-4'}
              onClick={() => handleEdit(item)}>
              Edit
            </button>
          </Can>
        </div>
      </TimelineEvent>
    ));
  }

  return (
    <ExperienceAbilities>
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
          <Can I={Actions.Create} this={newExperience}>
            <button
              className={'btn btn-rounded btn-primary-outline'}
              type="button"
              onClick={handleCreateNew}>
              Add New
            </button>
          </Can>
        </div>
        <hr className={'my-4'} />
        {content}
        <AnimatePresence>
          {isOpen && (
            <Modal classname={'sm start'}>
              {formExperience && (
                <ExperienceForm experience={formExperience} user={profile}></ExperienceForm>
              )}
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </ExperienceAbilities>
  );
}
