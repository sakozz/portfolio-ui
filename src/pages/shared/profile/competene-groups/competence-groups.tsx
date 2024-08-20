import { useQuery } from "@tanstack/react-query";
import { ArrayPayloadJSON } from "../../../../types/payload.interface.ts";
import { AxiosError, AxiosResponse } from "axios";
import User from "../../../../dao/users.dao.ts";
import Modal from "../../../../components/modal/modal.tsx";
import CompetenceGroupForm from "./competence-group.form.tsx";
import { useModalContext } from "../../../../components/modal/modal-context.tsx";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  CompetenceGroup,
  fetchProfileCompetenceGroups,
} from "../../../../dao/competence-group.dao.ts";

export default function CompetenceGroups({ user }: { user: User }) {
  const { isOpen, openModal } = useModalContext();
  const [formCompetenceGroup, setFormCompetenceGroup] = useState(null);
  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ["profiles", user?.id, "competences"],
    queryFn: ({ signal }) => fetchProfileCompetenceGroups(user?.id, signal),
  });

  const handleCreateNew = () => {
    setFormCompetenceGroup({} as CompetenceGroup);
    openModal();
  };

  const handleEdit = (competenceGroup: CompetenceGroup) => {
    setFormCompetenceGroup(competenceGroup);
    openModal();
  };

  let content;
  if (error) {
    content = <p>Error has occurred</p>;
  }
  if (data) {
    const competenceGroups = data.data as ArrayPayloadJSON<CompetenceGroup>;
    content = competenceGroups.items.map((item, index) => (
      <div key={index} className={"my-2"}>
        <div className={"flex flex-row justify-between gap-4"}>
          <h3 className={"text-xl font-bold "}>{item.name}</h3>
          <button
            type="button"
            className={"btn btn-rounded"}
            onClick={() => handleEdit(item)}
          >
            Edit
          </button>
        </div>
        <p className={"font-bold text-dark-60"}>{item.description}</p>
      </div>
    ));
  }

  return (
    <div className={"flex flex-col w-full"}>
      <div className={"flex flex-row justify-between gap-4"}>
        <h2 className="text-3xl text-red-600">Experiences</h2>
        <button
          className={"btn btn-rounded btn-outline-light"}
          type="button"
          onClick={handleCreateNew}
        >
          Add New
        </button>
      </div>
      <hr className={"my-4"} />
      {content}
      <AnimatePresence>
        {isOpen && (
          <Modal classname={"sm start"}>
            {formCompetenceGroup?.name}
            {formCompetenceGroup && (
              <CompetenceGroupForm
                competenceGroup={formCompetenceGroup}
                user={user}
              ></CompetenceGroupForm>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
