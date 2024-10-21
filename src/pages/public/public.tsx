import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { profileConfigs } from '../../profile-configs.ts';
import { Navigate } from 'react-router-dom';

export default function PublicPages() {
  const { authenticated, currentProfile } = useSelector((state: RootState) => state.session);
  return (
    <Navigate
      to={`/${authenticated ? currentProfile.username : profileConfigs.defaultProfileUsername}`}
    />
  );
}
