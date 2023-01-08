import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./styles.css"

function FileUpload() {
    const [csvFile, setCsvFile] = useState(null);

    return (
        <div className="form-container">
            <h2 className="upload-title">Upload File</h2>
            <span id="file-upload-form" className="uploader">
                <input id="file-upload" type="file" name="fileUpload"
                       accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain"
                       onChange={(e) => {
                           const file = e.target.files;
                           console.log("files", file);
                           if (!file.length) return;
                           setCsvFile(file)

                       }}
                       onClick={(event) => {
                           event.target.value = null
                       }}/>

                <label htmlFor="file-upload" id="file-drag">
                    <div id="start">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div>Select a file</div>
                        <span id="file-upload-btn" type="bu" className="btn btn-primary">Select a file</span>
                        {csvFile && <p>{csvFile[0]?.name}</p>}
                    </div>
                    <div id="response" className="hidden">
                        <div id="messages"></div>
                        <progress className="progress" id="file-progress" value="0">
                            <span>0</span>%
                        </progress>
                    </div>
                </label>

            </span>
        </div>
    );
}

export default FileUpload;