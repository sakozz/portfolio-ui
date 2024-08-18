import {
  Experience,
  fetchProfileExperiences,
} from "../../../../dao/experiences.dao.ts";
import { useQuery } from "@tanstack/react-query";
import { ArrayPayloadJSON } from "../../../../types/payload.interface.ts";
import { AxiosError, AxiosResponse } from "axios";
import User from "../../../../dao/users.dao.ts";
import Modal from "../../../../components/modal/modal.tsx";
import ExperienceForm from "./experience.form.tsx";
import { useModalContext } from "../../../../components/modal/modal-context.tsx";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Experiences({ user }: { user: User }) {
  const { isOpen, openModal } = useModalContext();
  const [formExperience, setFormExperience] = useState(null);
  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ["profiles", user?.id, "experiences"],
    queryFn: ({ signal }) => fetchProfileExperiences(user?.id, signal),
  });

  const handleEdit = (experience: Experience) => {
    setFormExperience(experience);
    openModal();
  };
  let content;
  if (error) {
    content = <p>Error has occurred</p>;
  }
  if (data) {
    const experiences = data.data as ArrayPayloadJSON<Experience>;
    content = experiences.items.map((item, index) => (
      <div key={index} className={"my-2"}>
        <div className={"flex flex-row justify-between gap-4"}>
          <h3 className={"text-xl font-bold "}>{item.jobTitle}</h3>
          <button
            type="button"
            className={"btn btn-rounded"}
            onClick={() => handleEdit(item)}
          >
            Edit
          </button>
        </div>
        <p className={"font-bold text-dark-60"}>
          {item.startDate} — {item.isCurrent ? "Present" : item.endDate} |{" "}
          {item.companyName} | {item.link}
        </p>
        <p className={"text-lg text-dark-50"}>{item.responsibilities}</p>
      </div>
    ));
  }

  return (
    <div className={"flex flex-col w-full"}>
      <div className={"flex flex-row justify-between gap-4"}>
        <h2 className="text-3xl text-red-600">Experiences</h2>
        <button className={"btn btn-rounded btn-outline-light"} type="button">
          Add New
        </button>
      </div>
      <hr className={"my-4"} />
      {content}
      <AnimatePresence>
        {isOpen && (
          <Modal classname={"sm start"}>
            {formExperience && (
              <ExperienceForm
                experience={formExperience}
                user={user}
              ></ExperienceForm>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
