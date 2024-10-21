import Profile from '../../dao/users.dao.ts';
import { createContext, ReactNode } from 'react';
import { AbilityBuilder, createMongoAbility, ExtractSubjectType, MongoQuery } from '@casl/ability';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { createContextualCan } from '@casl/react';
import { Actions, AppAbility, Subjects } from '../../lib/types.ts';
import { Project } from '../../dao/projects.dao.ts';

export const ProjectAbilityContext = createContext(null);
export const Can = createContextualCan(ProjectAbilityContext.Consumer);

function projectAbilities(currentUserProfile: Profile) {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (currentUserProfile?.role === 'admin') {
    can(Actions.Manage, 'all');
  } else if (currentUserProfile?.role == 'candidate') {
    can([Actions.Access], Project);
    can([Actions.Create, Actions.Update, Actions.Delete], Project, {
      profileId: { $eq: currentUserProfile.id },
    } as MongoQuery<Project>);
  } else {
    can([Actions.AccessCollection], Project);
  }

  return build({
    detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
  });
}

export default function ProjectAbilities({ children }: { children: ReactNode }) {
  const { currentProfile }: { currentProfile: Profile } = useSelector(
    (state: RootState) => state.session,
  );

  return (
    <ProjectAbilityContext.Provider value={projectAbilities(currentProfile)}>
      {children}
    </ProjectAbilityContext.Provider>
  );
}
