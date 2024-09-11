import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { InferSubjects, MongoAbility } from '@casl/ability';
import Profile from '../dao/users.dao.ts';
import { Competence } from '../dao/competence.dao.ts';
import { Education } from '../dao/education.ts';
import { Experience } from '../dao/experiences.dao.ts';
import { Project } from '../dao/projects.dao.ts';
import { CompetenceGroup } from '../dao/competence-group.dao.ts';

export type ProfileSection = {
  key: string;
  label: string;
  isVisible: boolean;
  icon: IconProp;
};

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Access = 'access',
  AccessCollection = 'accessCollection',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<
      | typeof Profile
      | typeof Competence
      | typeof Education
      | typeof Experience
      | typeof Project
      | typeof CompetenceGroup
    >
  | 'all';
export type AppAbility = MongoAbility<[Actions, Subjects]>;
