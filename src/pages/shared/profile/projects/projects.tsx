import { useQuery } from '@tanstack/react-query';
import { ArrayPayloadJSON } from '../../../../types/payload.interface.ts';
import { AxiosError, AxiosResponse } from 'axios';
import Profile from '../../../../dao/users.dao.ts';
import Modal from '../../../../components/modal/modal.tsx';
import ProjectForm from './project.form.tsx';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useModalContext } from '../../../../components/modal/modal-context.tsx';
import { fetchProjects, Project } from '../../../../dao/projects.dao.ts';
import TimelineEvent from '../../../../components/timeline-event.tsx';
import { plainToInstance } from 'class-transformer';
import { Actions } from '../../../../lib/types.ts';
import ProjectAbilities, {
  Can,
} from '../../../../components/ability-providers/project.abilities.tsx';
import parse from 'html-react-parser';

export default function Projects({ profile }: { profile: Profile }) {
  const { isOpen, openModal } = useModalContext();
  const [formProject, setFormProject] = useState(null);
  const newProject = plainToInstance(Project, { profileId: profile.id });
  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ['profiles', profile?.id, 'projects'],
    queryFn: ({ signal }) => fetchProjects(profile?.id, signal),
  });

  const handleCreateNew = () => {
    setFormProject({} as Project);
    openModal();
  };

  const handleEdit = (project: Project) => {
    setFormProject(project);
    openModal();
  };

  let content;
  if (error) {
    content = <p>Error has occurred</p>;
  }
  if (data) {
    const projects = data.data as ArrayPayloadJSON<Project>;
    content = projects.items.map((item, index) => (
      <TimelineEvent
        key={index}
        title={item.name}
        label={item.companyName}
        link={item.link}
        start={item.startDate}
        isFirst={index == 0}
        isLast={index == projects.items.length - 1}
        isPresent={item.isCurrent}
        end={item.endDate}>
        <div className="flex flex-row justify-between items-start relative">
          <div className={'pe-24 tip-tap-content'}>{parse(item.description)}</div>
          <Can I={Actions.Update} this={plainToInstance(Project, item)}>
            <button
              type="button"
              className={'btn btn-rounded absolute -top-16 end-4'}
              onClick={() => handleEdit(item)}>
              Edit
            </button>
          </Can>
        </div>
      </TimelineEvent>
    ));
  }

  return (
    <ProjectAbilities>
      <div className={'flex flex-col w-full'} id="projects" data-scrollspy="projects">
        <div className={'flex flex-row justify-between gap-4'}>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 50, scale: 1.2 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1, duration: 1, type: 'spring' }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl text-secondary-500">
            Recent Projects
          </motion.h2>
          <Can I={Actions.Update} this={newProject}>
            <button
              className={'btn btn-rounded btn-primary-outline'}
              type="button"
              onClick={handleCreateNew}>
              Add New
            </button>
          </Can>
        </div>
        <hr className={'my-4'} />
        {content}
        <AnimatePresence>
          {isOpen && (
            <Modal classname={'sm start'}>
              {formProject && <ProjectForm project={formProject} user={profile}></ProjectForm>}
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </ProjectAbilities>
  );
}
