import { ProfileSection } from './types.ts';

export const competenceMap: Record<number, string> = {
  0: 'Unspecified',
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
  5: 'Master',
};

export const profileSections: ProfileSection[] = [
  { label: 'Competences', key: 'competences', icon: 'code', isVisible: true },
  { label: 'Projects', key: 'projects', icon: 'list-check', isVisible: true },
  { label: 'Experiences', key: 'experiences', icon: 'school-circle-check', isVisible: true },
  { label: 'Education', key: 'education', icon: 'graduation-cap', isVisible: true },
  /*  { label: 'Languages', key: 'languages', icon: 'language', isVisible: true },
    { label: 'Certifications', key: 'certifications', icon: 'certificate', isVisible: true },
    { label: 'References', key: 'references', icon: 'users-line', isVisible: false },*/
];
