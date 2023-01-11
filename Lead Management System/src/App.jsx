import {RouterProvider,} from "react-router-dom";
import appRouter from "./routes/index.jsx";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (
        <>
            <RouterProvider router={appRouter}/>
            <ToastContainer
                position="top-right"
                theme="light"
                hideProgressBar
                newestOnTop
                limit={1}
                autoClose={2000}/>
        </>
    )
}

export default App
