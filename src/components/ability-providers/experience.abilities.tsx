import Profile from '../../dao/users.dao.ts';
import { createContext, ReactNode } from 'react';
import { AbilityBuilder, createMongoAbility, ExtractSubjectType, MongoQuery } from '@casl/ability';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { createContextualCan } from '@casl/react';
import { Actions, AppAbility, Subjects } from '../../lib/types.ts';
import { Experience } from '../../dao/experiences.dao.ts';

export const ExperienceAbilityContext = createContext(null);
export const Can = createContextualCan(ExperienceAbilityContext.Consumer);

function experienceAbilities(currentUserProfile: Profile) {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (currentUserProfile?.role === 'admin') {
    can(Actions.Manage, 'all');
  } else if (currentUserProfile?.role == 'candidate') {
    can([Actions.Access], Experience);
    can([Actions.Create, Actions.Update, Actions.Delete], Experience, {
      profileId: { $eq: currentUserProfile.id },
    } as MongoQuery<Experience>);
  } else {
    can([Actions.AccessCollection], Experience);
  }

  return build({
    detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
  });
}

export default function ExperienceAbilities({ children }: { children: ReactNode }) {
  const { currentProfile }: { currentProfile: Profile } = useSelector(
    (state: RootState) => state.session,
  );

  return (
    <ExperienceAbilityContext.Provider value={experienceAbilities(currentProfile)}>
      {children}
    </ExperienceAbilityContext.Provider>
  );
}
