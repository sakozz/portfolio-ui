import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import User from "../../../dao/users.dao.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileOverview() {
  const { currentUser }: { currentUser: User } = useSelector(
    (state: RootState) => state.session,
  );
  return (
    <div className="flex flex-row items-center justify-center">
      <div
        className={
          "flex flex-col md:flex-row gap-4 border shadow rounded-3xl p-8 w-full"
        }
      >
        <div
          className={
            "min-w-[250px] flex flex-col justify-center items-center gap-2"
          }
        >
          <img
            src={currentUser?.avatarUrl || ""}
            alt=""
            className={"w-24 h-24 rounded-full mb-3"}
          />
          <div className={"flex flex-col gap-1"}>
            {currentUser?.email && (
              <p>
                <FontAwesomeIcon icon="envelope" className="me-2" />
                {currentUser.email}
              </p>
            )}
            {currentUser?.phone && (
              <p>
                <FontAwesomeIcon icon="phone" className="me-2" />
                {currentUser.phone}
              </p>
            )}
            {currentUser?.address && (
              <p>
                <FontAwesomeIcon icon="map-location-dot" className="me-2" />
                {currentUser.address}
              </p>
            )}
            {currentUser?.linkedInUrl && (
              <p>
                <FontAwesomeIcon icon="linkedin" className="me-2" />
                {currentUser.linkedInUrl}
              </p>
            )}
            {currentUser?.stackoverflowUrl && (
              <p>
                <FontAwesomeIcon icon="stack-overflow" className="me-2" />
                {currentUser.stackoverflowUrl}
              </p>
            )}
            {currentUser?.githubUrl && (
              <p>
                <FontAwesomeIcon icon={["fab", "github"]} className="me-2" />
                {currentUser.githubUrl}
              </p>
            )}
            <hr className={"my-3"} />
            {currentUser?.nationality && (
              <p>
                <FontAwesomeIcon icon="passport" className="me-2" />
                {currentUser.nationality}
              </p>
            )}
            {currentUser?.dateOfBirth && (
              <p>
                <FontAwesomeIcon icon="calendar-days" className="me-2" />
                {currentUser.dateOfBirth}
              </p>
            )}
          </div>
        </div>
        <div>
          <h1 className={"text-4xl font-bold text-red-600"}>
            {currentUser?.firstName} {currentUser?.lastName}
          </h1>
          <p className={"text-dark-50 text-xl"}>Software Engineer</p>
          <p className={"mt-8 leading text-lg"}>{currentUser?.description}</p>
        </div>
      </div>
    </div>
  );
}
