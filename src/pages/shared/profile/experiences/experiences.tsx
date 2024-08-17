import {
  ExperienceType,
  fetchProfileExperiences,
} from "../../../../dao/experiences.dao.ts";
import { useQuery } from "@tanstack/react-query";
import { ArrayPayloadJSON } from "../../../../types/payload.interface.ts";
import { AxiosError, AxiosResponse } from "axios";

export default function Experiences({ profileId }: { profileId: number }) {
  const { data, error }: { data: AxiosResponse; error: AxiosError } = useQuery({
    queryKey: ["profiles", profileId, "experiences"],
    queryFn: ({ signal }) => fetchProfileExperiences(profileId, signal),
  });
  let content;
  if (error) {
    content = (
      <div>
        <p>Error has occurred</p>
      </div>
    );
  }
  if (data) {
    const experiences = data.data as ArrayPayloadJSON<ExperienceType>;
    content = experiences.items.map((item, index) => (
      <div key={index} className={"my-2"}>
        <h3 className={"text-xl font-bold "}>{item.jobTitle}</h3>
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
      <h2 className="text-3xl text-red-600">Experiences</h2>
      <hr className={"my-4"} />
      {content}
    </div>
  );
}
