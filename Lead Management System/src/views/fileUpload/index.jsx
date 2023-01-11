import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from "./FileUpload.jsx";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import routes from "../../routes/routes.js";
import {useNavigate} from "react-router-dom";
import API from "../api/index.js";
import {toast} from "react-toastify";

function Index() {
    const navigate = useNavigate()
    const [compulsoryFields, setCompulsoryFields] = React.useState({
        name: "",
        mobileNumber: "",
        status: ""
    });
    const [extraFields, setExtraFields] = React.useState([]);
    const [csvFile, setCsvFile] = React.useState(null);
    const [fileValidation, setFileValidation] = React.useState(false);
    const [validated, setValidated] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            let list = form.querySelectorAll(':invalid');
            if (list[0].name === "fileUpload") {
                setFileValidation(true)
            } else {
                setFileValidation(false)
            }
            event.stopPropagation();
        } else {
            try {
                const taskID = await sendUploadRequest()
                if (taskID) {
                    navigate(routes.dashboard, {
                        state: {
                            taskID: taskID
                        }
                    })
                }
            } catch (e) {
                console.log("Error", e)
                toast.error(e.message)
            }
        }
        setValidated(true);
    };

    const sendUploadRequest = async () => {
        let payload = new FormData()
        payload.append('file', csvFile)
        payload.append('data', JSON.stringify({...compulsoryFields, extra_fields: extraFields}))
        let data;
        const uploadRequest = await API.post("leads", payload)
        if (uploadRequest.status == 400) {
            toast.info("Upload only Allowed from 9AM to 6PM IST")
            return
        }
        data = await uploadRequest.json()
        return data.task_id
    }

    return (
        <>
            <h2 style={{textAlign: "center", marginBottom: "1rem"}}> Lead Management System</h2>
            <Form className="form-container" noValidate validated={validated} onSubmit={handleSubmit}>
                <FileUpload error={fileValidation} setError={setFileValidation} csvFile={csvFile}
                            setCsvFile={setCsvFile}/>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default Index;