import {fireEvent, render, screen} from "@testing-library/react";
import SummaryForm from "../SummaryForm";


test("check box initial state is unchecked", ()=>{
    render(<SummaryForm/>);
    const tcCheckBox = screen.getByRole("checkbox", {name:"Terms and Conditions"})
    expect(tcCheckBox).not.toBeChecked()
})
test("check box can disable and enable submit btn", ()=>{
    render(<SummaryForm/>);
    const tcCheckBox = screen.getByRole("checkbox", {name: "Terms and Conditions"});
    const submitButton = screen.getByRole("button", {name: "Submit"});
    fireEvent.click(tcCheckBox);
    expect(submitButton).toBeDisabled();
    fireEvent.click(tcCheckBox);
    expect(submitButton).toBeEnabled();
})