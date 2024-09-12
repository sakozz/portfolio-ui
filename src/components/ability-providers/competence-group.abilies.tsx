import Profile from '../../dao/users.dao.ts';
import { createContext, ReactNode } from 'react';
import { AbilityBuilder, createMongoAbility, ExtractSubjectType, MongoQuery } from '@casl/ability';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { createContextualCan } from '@casl/react';
import { Actions, AppAbility, Subjects } from '../../lib/types.ts';
import { CompetenceGroup } from '../../dao/competence-group.dao.ts';

export const CompetenceGroupAbilityContext = createContext(null);
export const Can = createContextualCan(CompetenceGroupAbilityContext.Consumer);

function competenceGroupAbilities(currentUserProfile: Profile) {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (currentUserProfile?.role === 'admin') {
    can(Actions.Manage, 'all');
  } else if (currentUserProfile?.role == 'candidate') {
    can([Actions.Access], CompetenceGroup);
    can([Actions.Create, Actions.Update, Actions.Delete], CompetenceGroup, {
      profileId: { $eq: currentUserProfile.id },
    } as MongoQuery<CompetenceGroup>);
  } else {
    can([Actions.AccessCollection], CompetenceGroup);
  }

  return build({
    detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
  });
}

export default function CompetenceGroupAbilities({ children }: { children: ReactNode }) {
  const { currentProfile }: { currentProfile: Profile } = useSelector(
    (state: RootState) => state.session,
  );

  return (
    <CompetenceGroupAbilityContext.Provider value={competenceGroupAbilities(currentProfile)}>
      {children}
    </CompetenceGroupAbilityContext.Provider>
  );
}
