import Profile from '../../dao/users.dao.ts';
import { createContext, ReactNode } from 'react';
import { AbilityBuilder, createMongoAbility, ExtractSubjectType, MongoQuery } from '@casl/ability';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { createContextualCan } from '@casl/react';
import { Actions, AppAbility, Subjects } from '../../lib/types.ts';

export const ProfileAbilityContext = createContext(null);
export const Can = createContextualCan(ProfileAbilityContext.Consumer);

function profileAbilities(currentUserProfile: Profile) {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (currentUserProfile?.role === 'admin') {
    can(Actions.Manage, 'all');
  } else if (currentUserProfile?.role == 'candidate') {
    can([Actions.Access, Actions.Create], Profile);
    can(Actions.Update, Profile, {
      userId: { $eq: currentUserProfile.userId },
    } as MongoQuery<Profile>);
  } else {
    can([Actions.Access], Profile);
  }

  return build({
    detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
  });
}

export default function ProfileAbilities({ children }: { children: ReactNode }) {
  const { currentProfile }: { currentProfile: Profile } = useSelector(
    (state: RootState) => state.session,
  );

  return (
    <ProfileAbilityContext.Provider value={profileAbilities(currentProfile)}>
      {children}
    </ProfileAbilityContext.Provider>
  );
}
