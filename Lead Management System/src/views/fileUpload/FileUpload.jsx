import React from 'react';
import "./styles.css"

function FileUpload({error, setError, csvFile, setCsvFile}) {

    return (
        <div>

            <span id="file-upload-form" className="uploader">
                <input id="file-upload" type="file" name="fileUpload"
                       accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain"
                       required
                       onChange={(e) => {
                           const file = e.target.files[0];
                           setError(false)
                           console.log("files", file);
                           if (!file) return;
                           setCsvFile(file)
                       }}
                       onClick={(event) => {
                           event.target.value = null
                       }}/>

                <label htmlFor="file-upload" id="file-drag" style={error?{borderColor:"red"}:{}}>
                    <div id="start">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div>Select a file</div>
                        <span id="file-upload-btn" className="btn btn-primary">Select a file</span>
                        {csvFile && <p>{csvFile?.name}</p>}
                    </div>
                    <div id="response" className="hidden">
                        <div id="messages"></div>
                        <progress className="progress" id="file-progress" value="0">
                            <span>0</span>%
                        </progress>
                    </div>
                </label>

            </span>
            {error && <label style={{
                color:"red",
                fontSize:"0.8rem"
            }}> Missing file</label>}
        </div>
    );
}

export default FileUpload;