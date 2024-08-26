import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import User from '../../dao/users.dao.ts';
import { motion } from 'framer-motion';

export default function QuickInfo({ user }: { user: User }) {
  return (
    <div className={'card flex flex-col md:flex-row gap-4'}>
      <div
        className={
          'min-w-[280px] flex flex-col justify-center items-center gap-2 bg-secondary-500 text-white p-6 rounded-s-3xl '
        }>
        <img
          src={user?.avatarUrl || ''}
          alt=""
          className={'w-28 h-28 rounded-full mb-3 shadow-2xl  border-white border-2'}
        />
        <div className={'flex flex-col gap-1'}>
          {user?.email && (
            <p>
              <FontAwesomeIcon icon="envelope" className="me-2" />
              {user.email}
            </p>
          )}
          {user?.phone && (
            <p>
              <FontAwesomeIcon icon="phone" className="me-2" />
              {user.phone}
            </p>
          )}
          {user?.address && (
            <p>
              <FontAwesomeIcon icon="map-location-dot" className="me-2" />
              {user.address}
            </p>
          )}
          {user?.linkedInUrl && (
            <p>
              <FontAwesomeIcon icon="linkedin" className="me-2" />
              {user.linkedInUrl}
            </p>
          )}
          {user?.stackoverflowUrl && (
            <p>
              <FontAwesomeIcon icon="stack-overflow" className="me-2" />
              {user.stackoverflowUrl}
            </p>
          )}
          {user?.githubUrl && (
            <p>
              <FontAwesomeIcon icon={['fab', 'github']} className="me-2" />
              {user.githubUrl}
            </p>
          )}
          <hr className={'my-3'} />
          {user?.nationality && (
            <p>
              <FontAwesomeIcon icon="passport" className="me-2" />
              {user.nationality}
            </p>
          )}
          {user?.dateOfBirth && (
            <p>
              <FontAwesomeIcon icon="calendar-days" className="me-2" />
              {user.dateOfBirth}
            </p>
          )}
        </div>
      </div>
      <div className={'p-6'}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -25 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.1, duration: 1, type: 'spring' }}
          viewport={{ once: true, amount: 0.2 }}>
          <h1 className={'text-4xl text-secondary-500 capitalize'}>
            {user?.firstName} {user?.lastName}
          </h1>
          <p className={'text-primary-500 text-xl capitalize'}>Software Engineer</p>
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
          {user?.description}
        </motion.p>
      </div>
    </div>
  );
}
