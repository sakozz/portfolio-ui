import Profile from '../../dao/users.dao.ts';
import { createContext, ReactNode } from 'react';
import { AbilityBuilder, createMongoAbility, ExtractSubjectType, MongoQuery } from '@casl/ability';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { createContextualCan } from '@casl/react';
import { Actions, AppAbility, Subjects } from '../../lib/types.ts';
import { Education } from '../../dao/education.ts';

export const EducationAbilityContext = createContext(null);
export const Can = createContextualCan(EducationAbilityContext.Consumer);

function educationAbilities(currentUserProfile: Profile) {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (currentUserProfile?.role === 'admin') {
    can(Actions.Manage, 'all');
  } else if (currentUserProfile?.role == 'candidate') {
    can([Actions.Access], Education);
    can([Actions.Create, Actions.Update, Actions.Delete], Education, {
      profileId: { $eq: currentUserProfile.id },
    } as MongoQuery<Education>);
  } else {
    can([Actions.AccessCollection], Education);
  }

  return build({
    detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
  });
}

export default function EducationAbilities({ children }: { children: ReactNode }) {
  const { currentProfile }: { currentProfile: Profile } = useSelector(
    (state: RootState) => state.session,
  );

  return (
    <EducationAbilityContext.Provider value={educationAbilities(currentProfile)}>
      {children}
    </EducationAbilityContext.Provider>
  );
}
