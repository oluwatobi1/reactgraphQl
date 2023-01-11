import {ReactGrid} from "@silevis/reactgrid";
import {useEffect, useState} from "react"
import "@silevis/reactgrid/styles.css";
import {toast} from "react-toastify";
import {COMPLETED_CONST, tableDropDownConstant} from "../constants.js";
import API from "../../api/index.js";
import routes from "../../../routes/routes.js";
import {useLocation, useNavigate} from "react-router-dom";
import LoaderUI from "./LoaderUI";

export const headers = [
    "name",
    "mobile",
    "status",
    "address",
    "industry",
    "website",
    "contacts",
    "notes",
    "pipelines"
]
const customToastId = "custom-id-yes";

const getColumns = () => [

    {columnId: "id", width: 50, resizable: true},
    {columnId: "status", width: 150, resizable: true},
    ...headers.filter(e => e !== "status").map(e => ({columnId: e, width: 100, resizable: true}))
]

const headerRow = {
    rowId: "header",
    cells: [{type: "header", text: "ID"}, {type: "header", text: "status"},
        ...headers.filter(e => e !== "status").map(e => ({type: "header", text: e}))]
};

const getRows = (allData) => [
    headerRow,
    ...allData.map((currRow, idx) => ({

        rowId: currRow.id,
        cells: [
            {type: "number", value: idx + 1},
            {
                type: "dropdown",
                selectedValue: currRow.status,
                isOpen: currRow.isOpen === true,
                values: tableDropDownConstant
            },
            ...headers.filter(e => e !== "status").map(e => ({type: "text", text: currRow[e]}))

        ]
    }))
];

const applyChangesToDataTable = (
    changes,
    prevDetails
) => {
    changes.forEach((change) => {
        const dataRowId = change.rowId;
        const fieldName = change.columnId;
        let dataRow = prevDetails.find((d) => d.id === dataRowId);
        if (change.type === "dropdown") {
            let prevCellVal = change.previousCell.selectedValue
            let newCellVal = change.newCell.selectedValue
            dataRow["isOpen"] = change.newCell.isOpen
            if (prevCellVal !== newCellVal) {
                if (newCellVal === COMPLETED_CONST) {
                    toast.success(`Status Change to ${change.newCell.selectedValue}`, {
                        toastId: customToastId
                    })
                }
                dataRow[fieldName] = change.newCell.inputValue
            }
        } else {
            console.log("ERROR", change.type, dataRow[fieldName]);
        }
    });
    return [...prevDetails];
};

function CsvTable() {
    const location = useLocation();
    const navigate = useNavigate()
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState(getColumns());
    const [loading, setLoading] = useState(false);
    const [isDataReady, setIsDataReady] = useState(false);
    const rows = getRows(tableData);
    const handleChanges = (changes) => {
        setTableData((prevData) => applyChangesToDataTable(changes, prevData));
    };
    const handleColumnResize = (ci, width) => {
        setColumns((prevColumns) => {
            const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
            const resizedColumn = prevColumns[columnIndex];
            const updatedColumn = {...resizedColumn, width};
            prevColumns[columnIndex] = updatedColumn;
            return [...prevColumns];
        });
    }

    const handleFetchRequestStatus = async () => {
        const uploadedTaskID = location.state.taskID
        if (!uploadedTaskID) {
            navigate(routes.home)
        }
        try {
            setLoading(true)
            const request = await API.get(`leads/${uploadedTaskID}`)
            const res = await request.json()
            if (res.message === "successful") {
                setIsDataReady(true)
                setTableData(res.data)
                setLoading(false)
            }
            if (res.status === "FAILURE") {
                setIsDataReady(true)
                toast.info("File doesn't Match Requirement")
                navigate(routes.home)
                setLoading(false)
            }
        } catch (e) {
            console.log("an error occurred")
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isDataReady) {
            // stop fetch check when response is returned
            clearInterval()
            return;
        }
        // send status check request per minute
        const intervalId = setInterval(async () => {  //assign interval to a variable to clear it.
            handleFetchRequestStatus().then()
        }, 1000)
        return () => clearInterval(intervalId);
    }, [isDataReady]);


    return (
        <>
            {loading ? <LoaderUI/> :
                <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges}
                           onColumnResized={handleColumnResize}/>
            }</>

    );
}

export default CsvTable;