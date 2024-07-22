import { library } from "@fortawesome/fontawesome-svg-core";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import router from "./app.routes.tsx";
import { faIconsList } from "./types/icons.ts";

library.add(...faIconsList);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
