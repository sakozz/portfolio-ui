import { useElementOnScreen } from '../../../lib/hooks.ts';
import { useEffect } from 'react';
import { uiActions } from '../../../store/ui.store.ts';
import { useDispatch } from 'react-redux';

export default function EducationInfo() {
  const dispatch = useDispatch();
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  useEffect(() => {
    dispatch(uiActions.setInViewElement({ el: isVisible ? 'education' : null, scroll: false }));
  }, [dispatch, isVisible]);
  return (
    <div ref={containerRef} className={'card p-6'}>
      <div id={'education'}>
        <h2 className={'text-2xl text-red-600 my-6'}>Education</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec ante aliquam, sodales
          dui ornare, porttitor nunc. Suspendisse in congue leo, eget porttitor nibh. Morbi semper
          dolor sit amet aliquet tempor. Sed sit amet justo tellus. Sed id nulla sit amet ante
          cursus viverra at ac nisi. Donec eget mattis dui, sit amet volutpat nisl. Etiam et pretium
          libero. Curabitur posuere est in luctus laoreet. Aliquam consequat efficitur eros sed
          dapibus. Cras id posuere quam. Nam sollicitudin quam pharetra mi convallis, eu molestie
          odio varius.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec ante aliquam, sodales
          dui ornare, porttitor nunc. Suspendisse in congue leo, eget porttitor nibh. Morbi semper
          dolor sit amet aliquet tempor. Sed sit amet justo tellus. Sed id nulla sit amet ante
          cursus viverra at ac nisi. Donec eget mattis dui, sit amet volutpat nisl. Etiam et pretium
          libero. Curabitur posuere est in luctus laoreet. Aliquam consequat efficitur eros sed
          dapibus. Cras id posuere quam. Nam sollicitudin quam pharetra mi convallis, eu molestie
          odio varius.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec ante aliquam, sodales
          dui ornare, porttitor nunc. Suspendisse in congue leo, eget porttitor nibh. Morbi semper
          dolor sit amet aliquet tempor. Sed sit amet justo tellus. Sed id nulla sit amet ante
          cursus viverra at ac nisi. Donec eget mattis dui, sit amet volutpat nisl. Etiam et pretium
          libero. Curabitur posuere est in luctus laoreet. Aliquam consequat efficitur eros sed
          dapibus. Cras id posuere quam. Nam sollicitudin quam pharetra mi convallis, eu molestie
          odio varius.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec ante aliquam, sodales
          dui ornare, porttitor nunc. Suspendisse in congue leo, eget porttitor nibh. Morbi semper
          dolor sit amet aliquet tempor. Sed sit amet justo tellus. Sed id nulla sit amet ante
          cursus viverra at ac nisi. Donec eget mattis dui, sit amet volutpat nisl. Etiam et pretium
          libero. Curabitur posuere est in luctus laoreet. Aliquam consequat efficitur eros sed
          dapibus. Cras id posuere quam. Nam sollicitudin quam pharetra mi convallis, eu molestie
          odio varius.
        </p>
      </div>
    </div>
  );
}
