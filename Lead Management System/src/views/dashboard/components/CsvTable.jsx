import {ReactGrid} from "@silevis/reactgrid";
import {useState} from "react"
import "@silevis/reactgrid/styles.css";


const getPeople = () => [
    { name: "Thomas", mobileNumber:"1258832792", status:"Completed" },
    { name: "Susie", mobileNumber:"984372792", status:"Pending"   },
    { name: "", mobileNumber:"923322792", status:"Open"  }
];

const getColumns = ()=> [
    { columnId: "name", width: 150, resizable: true  },
    { columnId: "mobileNumber", width: 150, resizable: true  },
    { columnId: "status", width: 150, resizable: true  },
];

const headerRow= {
    rowId: "header",
    cells: [
        { type: "header", text: "Name" },
        { type: "header", text: "Mobile Number" },
        { type: "header", text: "Status" },
    ]
};


const getRows = (people)=> [
    headerRow,
    ...people.map((person, idx) => ({
        rowId: idx,
        cells: [
            { type: "text", text: person.name },
            { type: "text", text: person.mobileNumber },
            { type: "dropdown", text: person.status,
                values: ["Completed"]
            },
        ]
    }))
];

const applyChangesToPeople = (
        changes,
    prevPeople
)=> {
    changes.forEach((change) => {
        const personIndex = change.rowId;
        const fieldName = change.columnId;
        prevPeople[personIndex][fieldName] = change.newCell.text;
    });
    return [...prevPeople];
};


function CsvTable(pops) {
    const [people, setPeople] = useState(getPeople());
    const [columns, setColumns] = useState(getColumns());

    const rows = getRows(people);

    const handleChanges = (changes) => {
        setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
    };

    const handleColumnResize = (ci, width) => {
        setColumns((prevColumns) => {
            const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
            const resizedColumn = prevColumns[columnIndex];
            const updatedColumn = { ...resizedColumn, width };
            prevColumns[columnIndex] = updatedColumn;
            return [...prevColumns];
        });
    }




    return (
        <ReactGrid rows={rows} columns={columns}  onColumnResized={handleColumnResize}  />
    );
}

export default CsvTable;