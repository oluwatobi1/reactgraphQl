import {ReactGrid} from "@silevis/reactgrid";
import {useState} from "react"
import "@silevis/reactgrid/styles.css";
import {headers} from "./MockData/mockHeader.js";
import MOCKDATA from "./MockData/lead_MOCK_DATA.json"
import {toast} from "react-toastify";
import {COMPLETED_CONST, tableDropDownConstant} from "../constants.js";


const customToastId = "custom-id-yes";
const getTableData = () => MOCKDATA

const getColumns = () => [

    {columnId: "id", width: 50, resizable: true},
    {columnId: "status", width: 150, resizable: true},
    ...headers.filter(e=>e!=="status").map(e => ({columnId: e, width: 100, resizable: true}))
]

const headerRow = {
    rowId: "header",
    cells: [{type: "header", text: "ID"},{type: "header", text: "status"},
        ...headers.filter(e=>e!=="status").map(e => ({type: "header", text: e}))]
};


const getRows = (allData) => [
    headerRow,
    ...allData.map((currRow, idx) => ({

        rowId: idx,
        cells: [
            {type: "number", value: idx+1},
            {
                type: "dropdown",
                selectedValue: currRow.status,
                isOpen: currRow.isOpen === true,
                values:tableDropDownConstant
            },
            ...headers.filter(e=>e!=="status").map(e => ({type: "text", text: currRow[e]}))

        ]
    }))
];

const applyChangesToPeople = (
    changes,
    prevDetails
) => {
    changes.forEach((change) => {
        const dataRowId = change.rowId;
        const fieldName = change.columnId;
        let dataRow = prevDetails.find((d) => d.id - 1 === dataRowId);
        if (change.type === "dropdown") {
            let prevCellVal = change.previousCell.selectedValue
            let newCellVal = change.newCell.selectedValue
            dataRow.isOpen = change.newCell.isOpen
            if (prevCellVal!==newCellVal){
                if (newCellVal === COMPLETED_CONST){
                    toast.success(`Status Change to ${change.newCell.selectedValue}`,{
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
    const [tableData, setTableData] = useState(getTableData());
    const [columns, setColumns] = useState(getColumns());
    const rows = getRows(tableData);
    const handleChanges = (changes) => {
        setTableData((prevData) => applyChangesToPeople(changes, prevData));
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


    return (
        <>
            <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} onColumnResized={handleColumnResize}/>

        </>
    );
}

export default CsvTable;