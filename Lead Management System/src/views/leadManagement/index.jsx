import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from "./fileUpload/FileUpload.jsx";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Index() {
    const [extraFields, setExtraFields] = React.useState([""]);
    return (
        <>
            <Form>
                <FileUpload/>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name Mapper</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Mobile Number Mapper</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>...</option>
                        <option value="1">Opening</option>
                        <option value="2">Pending</option>
                        <option value="3">Completed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Label>Extra Fields</Form.Label>

                {
                    extraFields.map((inputField, idx)=>(
                        <Form.Group key={idx} className="mb-3" controlId={`formStatus`+idx}>
                          <Form.Control type="text"/>

                    </Form.Group>))
                }
                <Button variant="outline-secondary" onClick={()=>{
                    setExtraFields(prevState => ([...prevState, ""]))
                }} >
                    Add Extra Fields
                </Button>
                {extraFields.length>0 &&<Button variant="outline-secondary" onClick={() => {
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