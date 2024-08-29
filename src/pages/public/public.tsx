import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { profileConfigs } from '../../profile-configs.ts';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function PublicPages() {
  const { authenticated } = useSelector((state: RootState) => state.session);
  const navigate = useNavigate();
  let username = profileConfigs.defaultProfileUsername;
  useEffect(() => {
    if (authenticated) {
      username = 'own';
    }
  }, [username, navigate, authenticated]);

  return <Navigate to={`/${username}`} />;
}
