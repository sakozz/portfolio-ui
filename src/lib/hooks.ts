import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { CompetenceGroup } from '../dao/competence-group.dao.ts';

export type CompetencesGroupFormContextType = {
  isAssessmentView: boolean;
  competenceGroup: CompetenceGroup;
  showAssessmentView: (group: CompetenceGroup) => void;
  showCompetencesView: (group: CompetenceGroup) => void;
};

export const CompetencesGroupFormContext = createContext<CompetencesGroupFormContextType | null>(
  null,
);

export function useCompetencesGroupContext() {
  const ctx = useContext(CompetencesGroupFormContext);
  if (!ctx) {
    throw new Error('Component should be wrapped in CompetencesGroupFormContext');
  }
  return ctx;
}

export const useElementOnScreen = (options: IntersectionObserverInit) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
