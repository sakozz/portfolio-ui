import { useQuery } from '@tanstack/react-query';
import { ArrayPayloadJSON } from '../../../../types/payload.interface.ts';
import { AxiosError, AxiosResponse } from 'axios';
import Profile from '../../../../dao/users.dao.ts';
import Modal from '../../../../components/modal/modal.tsx';
import EducationForm from './education.form.tsx';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useModalContext } from '../../../../components/modal/modal-context.tsx';
import EducationInfo from './education-info.tsx';
import { Education, fetchEducation } from '../../../../dao/education.ts';

export default function EducationList({ profile }: { profile: Profile }) {
  const { isOpen, openModal } = useModalContext();
  const [formEducation, setFormEducation] = useState(null);
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
      <EducationInfo education={item} key={index}>
        <button type="button" className={'btn btn-rounded'} onClick={() => handleEdit(item)}>
          Edit
        </button>
      </EducationInfo>
    ));
  }

  return (
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
          Recent Educations
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
            {formEducation && (
              <EducationForm education={formEducation} profile={profile}></EducationForm>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
