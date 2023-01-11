import {ReactGrid} from "@silevis/reactgrid";
import {useState} from "react"
import "@silevis/reactgrid/styles.css";
import {headers} from "./MockData/mockHeader.js";
import MOCKDATA from "./MockData/lead_MOCK_DATA.json"


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


const getRows = (people) => [
    headerRow,
    ...people.map((currRow, idx) => ({
        rowId: idx,
        cells: [
            {type: "number", value: idx+1},
            {
                type: "dropdown",
                selectedValue: currRow.status,
                inputValue: currRow.status,
                isOpen: currRow.isOpen === true,
                values: [
                    {label: "Open", value: "Open"},
                    {label: "Pending", value: "Pending"},
                    {label: "Completed", value: "Completed"},
                ]
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
            dataRow[fieldName] = change.newCell.inputValue
            // CHANGED: set the isOpen property to the value received.
            dataRow.isOpen = change.newCell.isOpen
        } else {
            console.log("ERROR", change.type, dataRow[fieldName]);
        }
    });
    return [...prevDetails];
};


function CsvTable() {
    const [people, setPeople] = useState(getTableData());
    const [columns, setColumns] = useState(getColumns());

    const rows = getRows(people);

    const handleChanges = (changes) => {
        setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
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
        <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} onColumnResized={handleColumnResize}/>
    );
}

export default CsvTable;