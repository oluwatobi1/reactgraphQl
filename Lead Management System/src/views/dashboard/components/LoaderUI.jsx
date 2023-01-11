import React from 'react';
import {Spinner} from "react-bootstrap";

function LoaderUi() {
    return (
        <div style={{marginTop:"5rem", textAlign:"center"}}>
            <Spinner animation="grow"/>

            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Spinner animation="grow"/>
        </div>

    );
}

export default LoaderUi;