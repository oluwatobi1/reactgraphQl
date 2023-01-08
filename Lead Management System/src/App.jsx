import {
    RouterProvider,
} from "react-router-dom";
import appRouter from "./routes/index.jsx";

function App() {

  return (
    <>
        <RouterProvider router={appRouter} />
    </>
  )
}

export default App
