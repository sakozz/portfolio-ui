import { useQuery } from '@tanstack/react-query';
import { ArrayPayloadJSON } from '../../../../types/payload.interface.ts';
import { AxiosError, AxiosResponse } from 'axios';
import Profile from '../../../../dao/users.dao.ts';
import Modal from '../../../../components/modal/modal.tsx';
import EducationForm from './education.form.tsx';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useModalContext } from '../../../../components/modal/modal-context.tsx';
import { Education, fetchEducation } from '../../../../dao/education.ts';
import TimelineEvent from '../../../../components/timeline-event.tsx';
import { plainToInstance } from 'class-transformer';
import { Actions } from '../../../../lib/types.ts';
import EducationAbilities, {
  Can,
} from '../../../../components/ability-providers/education.abilities.tsx';
import parse from 'html-react-parser';

export default function EducationList({ profile }: { profile: Profile }) {
  const { isOpen, openModal } = useModalContext();
  const [formEducation, setFormEducation] = useState(null);
  const newEducation = plainToInstance(Education, { profileId: profile.id });
  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ['profiles', profile?.id, 'education'],
    queryFn: ({ signal }) => fetchEducation(profile?.id, signal),
  });

  const handleCreateNew = () => {
    setFormEducation({} as Education);
    openModal();
  };

  const handleEdit = (education: Education) => {
    setFormEducation(education);
    openModal();
  };

  let content;
  if (error) {
    content = <p>Error has occurred</p>;
  }
  if (data) {
    const education = data.data as ArrayPayloadJSON<Education>;
    content = education.items.map((item, index) => (
      <TimelineEvent
        key={index}
        title={item.degreeProgram}
        link={item.link}
        start={item.startDate}
        isPresent={item.isCurrent}
        end={item.endDate}
        isFirst={index == 0}
        isLast={index == education.items.length - 1}>
        <div className="flex flex-row justify-between items-start relative">
          <div className="tip-tap-content">{parse(item?.university)}</div>
          <Can I={Actions.Update} this={plainToInstance(Education, item)}>
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
    <EducationAbilities>
      <div className={'flex flex-col w-full'} id="education" data-scrollspy="education">
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
            Education
          </motion.h2>
          <Can I={Actions.Update} this={newEducation}>
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
              {formEducation && (
                <EducationForm education={formEducation} profile={profile}></EducationForm>
              )}
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </EducationAbilities>
  );
}
