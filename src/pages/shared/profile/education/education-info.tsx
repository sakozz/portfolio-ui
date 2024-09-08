import { motion } from 'framer-motion';
import { Education } from '../../../../dao/education.ts';
import { ReactNode } from 'react';

export default function EducationInfo({
  education,
  children,
}: {
  education: Education;
  children: ReactNode;
}) {
  return (
    <div id="education" data-scrollspy="educations">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.1, duration: 1.2, type: 'spring' }}
        viewport={{ once: true, amount: 0.2 }}
        data-scrollspy="educations"
        className={'my-2'}>
        <div className={'flex flex-row justify-between gap-4'}>
          <h3 className={'text-xl font-bold '}>{education.degreeProgram}</h3>
          {children}
        </div>
        <p className={'font-bold text-primary-900'}>
          {education.startDate} — {education.isCurrent ? 'Present' : education.endDate} |{' '}
          {education.university} | {education.link}
        </p>
      </motion.div>
    </div>
  );
}
