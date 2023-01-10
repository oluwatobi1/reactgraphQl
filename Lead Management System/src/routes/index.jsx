import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import routes from "./routes.js";
import LeadManagement from "../views/fileUpload/index.jsx";
import Dashboard from "../views/dashboard/index.jsx";


const appRouter = createBrowserRouter([
    {
        path: routes.home,
        element: <LeadManagement/>,
    }, {
        path: routes.dashboard,
        element: <Dashboard/>,
    },
]);

export default appRouter;