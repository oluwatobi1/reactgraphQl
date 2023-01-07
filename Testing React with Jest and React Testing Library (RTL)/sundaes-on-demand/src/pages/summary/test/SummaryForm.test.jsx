import {fireEvent, render, screen} from "@testing-library/react";
import SummaryForm from "../SummaryForm";


test("check box initial state is unchecked", ()=>{
    render(<SummaryForm/>);
    const tcCheckBox = screen.getByRole("checkbox", {name: /terms and conditions/i })
    const submitButton = screen.getByRole("button", {name: /confirm order/i});
    expect(tcCheckBox).not.toBeChecked()
    expect(submitButton).toBeDisabled()

})
test("check box can disable and enable submit btn", ()=>{
    render(<SummaryForm/>);
    const tcCheckBox = screen.getByRole("checkbox", {name: /terms and conditions/i});
    const submitButton = screen.getByRole("button", {name: /confirm order/i});
    fireEvent.click(tcCheckBox);
    expect(submitButton).toBeEnabled();
    fireEvent.click(tcCheckBox);
    expect(submitButton).toBeDisabled();
})