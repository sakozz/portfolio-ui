import { RouterProvider } from "react-router-dom";
import "./App.scss";
import router from "./app.routes.tsx";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
