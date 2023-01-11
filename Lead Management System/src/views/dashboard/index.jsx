import React from 'react';
import CsvTable from "./components/CsvTable.jsx";
import Button from "react-bootstrap/Button";
import routes from "../../routes/routes.js";
import {useNavigate} from "react-router-dom";

function index() {
    const navigate = useNavigate()
    return (
        <>
            <Button onClick={() => navigate(routes.home)}>
                Upload New data
            </Button>
            <CsvTable/>
        </>
    );
}

export default index;