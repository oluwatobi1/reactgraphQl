import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import routes from "./routes.js";
import LeadManagement from "../views/leadManagement/index.jsx";


const appRouter = createBrowserRouter([
    {
        path: routes.home,
        element: <LeadManagement/>,
    },
]);

export default appRouter;