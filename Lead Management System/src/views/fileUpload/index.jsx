import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from "./FileUpload.jsx";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

import routes from "../../routes/routes.js";
import {useNavigate} from "react-router-dom";

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
        // for test
        navigate(routes.dashboard)
        return

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            let list = form.querySelectorAll(':invalid');
            if (list[0].name === "fileUpload"){
                setFileValidation(true)
            }else {
                setFileValidation(false)
            }
            event.stopPropagation();
        }else{
            try{
                // await sendUploadRequest()

            }catch (e) {
                console.log("Error", e)
            }
            finally {
                //testing purpose
                console.log("finally")
            }

        }
        setValidated(true);
    };

    const sendUploadRequest = async () => {
        let payload = new FormData()
        console.log("cvs", csvFile)
        payload.append('file', csvFile)
        payload.append('data', {...compulsoryFields, extra_fields: extraFields})
        await fetch('', {
            method: 'POST',
            body: payload
        })
    }

    const handleInputChange = (index, event) => {
        const values = [...extraFields];
        values[index] = event.target.value;
        setExtraFields(values);
    };
    return (
        <>
            <h2  style={{textAlign:"center", marginBottom:"1rem"}}> Lead Management System</h2>
            <Form className="form-container" noValidate validated={validated} onSubmit={handleSubmit}>
                <FileUpload error={fileValidation}  setError={setFileValidation} csvFile={csvFile} setCsvFile={setCsvFile}/>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name Mapper</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setCompulsoryFields(prev => ({...prev, name: e.target.value}))}
                        type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Mobile Number Mapper</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => setCompulsoryFields(prev => ({...prev, mobileNumber: e.target.value}))}
                        type="text"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        required aria-label="Default select example"
                        onChange={(e) => setCompulsoryFields(prev => ({...prev, status: e.target.value}))}>
                        <option value="">...</option>
                        <option value="opening">Opening</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </Form.Select>
                </Form.Group>

                {extraFields.length>0 &&<Form.Label>Extra Fields</Form.Label>}

                {
                    extraFields.map((inputField, idx) => (
                        <Form.Group key={idx} className="mb-3" controlId={`formStatus` + idx}>
                            <Form.Control onChange={e => handleInputChange(idx, e)} type="text"/>
                        </Form.Group>))
                }
                <Button variant="secondary" onClick={() => {
                    setExtraFields(prevState => ([...prevState, ""]))
                }}>
                    Add Extra Fields
                </Button>
                {extraFields.length > 0 && <Button variant="danger" style={{backgroundColor: "red"}} onClick={() => {
                    setExtraFields(prevState => {
                        const temp = [...prevState]
                        temp.splice(temp.length - 1, 1)
                        return temp
                    })
                }}>
                    Delete
                </Button>}

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