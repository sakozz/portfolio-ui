import { ErrorResponse, useRouteError } from "react-router-dom";
import PageContent from "./page-content/page-content.tsx";
import Sidebar from "./side-nav/sidebar.tsx";

function ErrorPage() {
  const error: ErrorResponse = useRouteError() as ErrorResponse;

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <Sidebar />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
