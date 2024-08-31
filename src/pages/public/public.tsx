import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { profileConfigs } from '../../profile-configs.ts';
import { Navigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function PublicPages() {
  const { authenticated, currentProfile } = useSelector((state: RootState) => state.session);
  const username = useRef<string>();
  useEffect(() => {
    username.current = authenticated
      ? currentProfile.username
      : profileConfigs.defaultProfileUsername;
  }, [currentProfile, authenticated]);

  return username?.current ? <Navigate to={`/${username.current}`} /> : <></>;
}
