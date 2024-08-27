import { motion } from 'framer-motion';
import { profileSections } from '../../../lib/constants.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../store/ui.store.ts';
import { RootState } from '../../../store/store.ts';

export default function ProfileTabs() {
  const { el } = useSelector((state: RootState) => state.ui.inViewElement) || {
    el: profileSections[0].key,
  };

  const dispatch = useDispatch();
  const handleNavClick = (sectionKey: string) => {
    dispatch(uiActions.setInViewElement({ el: sectionKey, scroll: true }));
  };

  const activeElementKey = () => {
    return el || profileSections[0].key;
  };

  return (
    <div>
      <nav
        className={
          'flex flex-row items-center justify-between list-none gap-1 p-1 bg-light-120 rounded-3xl'
        }>
        {profileSections.map((section) => (
          <button
            key={section.key}
            onClick={() => handleNavClick(section.key)}
            className={'p-2 lg:p-1 px-5 lg:px-4 relative '}>
            {activeElementKey() == section.key && (
              <motion.div
                layoutId={'activeTabIndicator'}
                className="absolute left-0 top-0 bottom-0 w-full bg-white rounded-3xl shadow"></motion.div>
            )}
            <div
              className={
                activeElementKey() == section.key
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
