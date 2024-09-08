import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function TimelineEvent({
  children,
  label,
  start,
  end,
  title,
  link,
}: {
  children: ReactNode;
  start: string;
  end: string;
  title: string;
  label?: string;
  subtitle?: string;
  link?: string;
}) {
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
      className="flex flex-col relative py-2">
      <div className="line border-s border-primary-100 absolute top-0 bottom-0 start-28"></div>
      <div className="flex flex-row justify-start items-end ">
        <div className="start w-24 text-end">
          <span>{start}</span>
        </div>
        <div className="w-4 h-4 rounded-full border border-primary-200 bg-secondary-50 z-10 ms-2 me-4 mb-1"></div>
        <div className="end">
          <p className="text-sm text-primary-400 font-light">{label}</p>
          <p>{end}</p>
        </div>
      </div>
      <div className="ms-32 ps-2">
        <div className="flex flex-row items-center">
          <h3 className={'text-lg font-bold '}>{title}</h3>
          {link && (
            <a
              target="_blank"
              href={link}
              className="border-s border-primary-200 ms-2 ps-2 leading-none text-blue-800 cursor-pointer">
              {link}
            </a>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
}