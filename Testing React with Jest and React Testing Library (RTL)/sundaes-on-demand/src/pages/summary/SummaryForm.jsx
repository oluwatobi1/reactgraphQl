import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";

function SummaryForm(props) {
    const [canSubmit, setCanSubmit] = useState(false);
    const CheckBoxLabel = (
        <span>
            i agree to
            <span style={{color:"blue"}}>
            Terms and Conditions
        </span>
        </span>
    )
    return (
        <Form>
            <Form.Group controlId="terms_and_conditions">
                <Form.Check
                    type="checkbox"
                    checked={canSubmit}
                    onChange={(e) => {
                        setCanSubmit(e.target.checked);
                    }}
                    label={CheckBoxLabel}
                >

                </Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" disabled={!canSubmit}>
                Confirm order
            </Button>

            {/*<div>*/}

            {/*    <input type="checkbox" id="t_and_c" defaultChecked={canSubmit} onChange={(e) => {*/}
            {/*        setCanSubmit(e.target.checked);*/}
            {/*    }}/>*/}
            {/*    <label htmlFor="t_and_c">*/}
            {/*        Terms and Conditions*/}
            {/*    </label>*/}
            {/*    <button disabled={canSubmit}>Confirm Order</button>*/}
            {/*</div>*/}
        </Form>

    );
}

export default SummaryForm;