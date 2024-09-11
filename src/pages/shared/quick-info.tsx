import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile from '../../dao/users.dao.ts';
import { motion } from 'framer-motion';
import { plainToInstance } from 'class-transformer';
import ProfileAbilities, { Can } from '../../components/ability-providers/profile-abilies.tsx';
import { Actions } from '../../lib/types.ts';

export default function QuickInfo({ profile }: { profile: Profile }) {
  const handleEdit = () => {};

  return (
    <ProfileAbilities>
      <div className={'card flex flex-col md:flex-row gap-4'}>
        <div
          className={
            'min-w-[280px] flex flex-col justify-center items-center gap-2 bg-secondary-500 text-white p-6 rounded-s-3xl '
          }>
          <img
            src={profile?.avatarUrl || ''}
            alt=""
            className={'w-28 h-28 rounded-full mb-3 shadow-2xl  border-white border-2'}
          />
          <div className={'flex flex-col gap-1'}>
            {profile?.email && (
              <p>
                <FontAwesomeIcon icon="envelope" className="me-2" />
                {profile.email}
              </p>
            )}
            {profile?.phone && (
              <p>
                <FontAwesomeIcon icon="phone" className="me-2" />
                {profile.phone}
              </p>
            )}
            {profile?.address && (
              <p>
                <FontAwesomeIcon icon="map-location-dot" className="me-2" />
                {profile.address}
              </p>
            )}
            {profile?.linkedInUrl && (
              <p>
                <FontAwesomeIcon icon="linkedin" className="me-2" />
                {profile.linkedInUrl}
              </p>
            )}
            {profile?.stackoverflowUrl && (
              <p>
                <FontAwesomeIcon icon="stack-overflow" className="me-2" />
                {profile.stackoverflowUrl}
              </p>
            )}
            {profile?.githubUrl && (
              <p>
                <FontAwesomeIcon icon={['fab', 'github']} className="me-2" />
                {profile.githubUrl}
              </p>
            )}
            <hr className={'my-3'} />
            {profile?.nationality && (
              <p>
                <FontAwesomeIcon icon="passport" className="me-2" />
                {profile.nationality}
              </p>
            )}
            {profile?.dateOfBirth && (
              <p>
                <FontAwesomeIcon icon="calendar-days" className="me-2" />
                {profile.dateOfBirth}
              </p>
            )}
          </div>
        </div>
        <div className={'p-6 w-full'}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -25 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1, duration: 1, type: 'spring' }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-row">
            <div className="grow">
              <h1 className={'text-4xl text-secondary-500 capitalize'}>
                {profile?.firstName} {profile?.lastName}
              </h1>
              <p className={'text-primary-500 text-xl capitalize'}>Software Engineer</p>
            </div>
            <Can I={Actions.Update} this={plainToInstance(Profile, profile)}>
              <button type="button" className={'btn btn-rounded icon-btn'} onClick={handleEdit}>
                <FontAwesomeIcon icon="pen-to-square" />
              </button>
            </Can>
          </motion.div>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1, duration: 1, type: 'spring' }}
            viewport={{ once: true, amount: 0.2 }}
            className={'mt-8 leading text-lg'}>
            {profile?.description}
          </motion.p>
        </div>
      </div>
    </ProfileAbilities>
  );
}
