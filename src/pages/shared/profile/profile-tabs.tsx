import { useState } from 'react';
import { motion } from 'framer-motion';
import { profileSections } from '../../../lib/constants.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProfileTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleNavClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <nav
        className={
          'flex flex-row items-center justify-between list-none gap-1 p-1 bg-light-120 rounded-3xl'
        }>
        {profileSections.map((section, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index)}
            className={'p-2 lg:p-1 px-5 lg:px-4 relative '}>
            {activeIndex == index && (
              <motion.div
                layoutId={'activeTabIndicator'}
                className="absolute left-0 top-0 bottom-0 w-full bg-white rounded-3xl shadow"></motion.div>
            )}
            <a
              href={`#${section.key}`}
              className={
                activeIndex == index ? 'z-1 text-dark-90 relative' : 'z-1 text-dark-60 relative'
              }>
              <FontAwesomeIcon icon={section.icon} className="mr-2" />
              <span className="hidden lg:inline-block">{section.label}</span>
            </a>
          </button>
        ))}
      </nav>
    </div>
  );
}
