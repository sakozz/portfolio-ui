import { motion } from 'framer-motion';
import { profileSections } from '../../../lib/constants.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useScrollSpyContext } from '../../../components/scroll-spy.tsx';

export default function ProfileTabs() {
  const { visibleElementId } = useScrollSpyContext();

  const handleNavClick = (sectionKey: string) => {
    const element = document.getElementById(sectionKey);
    if (element) {
      element.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-opacity-90 flex justify-center container bg-white pt-6 pb-2">
      <nav
        className={
          'flex flex-row items-center justify-between list-none gap-1 p-1 bg-primary-100 rounded-3xl'
        }>
        {profileSections.map((section) => (
          <button
            key={section.key}
            data-scrollspy-id={section.key}
            onClick={() => handleNavClick(section.key)}
            className={'p-2 lg:p-1 px-5 lg:px-4 relative '}>
            {visibleElementId == section.key && (
              <motion.div
                layoutId={'activeTabIndicator'}
                className="absolute left-0 top-0 bottom-0 w-full bg-white rounded-3xl shadow"></motion.div>
            )}
            <div
              className={
                visibleElementId == section.key
                  ? 'z-1 text-dark-90 relative'
                  : 'z-1 text-dark-60 relative'
              }>
              <FontAwesomeIcon icon={section.icon} className="mr-2" />
              <span className="hidden lg:inline-block">{section.label}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}
