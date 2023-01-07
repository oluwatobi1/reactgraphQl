import {render, screen} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";


test("check box initial state is unchecked", ()=>{
    render(<SummaryForm/>);
    const tcCheckBox = screen.getByRole("checkbox", {name: /terms and conditions/i })
    const submitButton = screen.getByRole("button", {name: /confirm order/i});
    expect(tcCheckBox).not.toBeChecked()
    expect(submitButton).toBeDisabled()

})
test("check box can disable and enable submit btn", async ()=>{
    render(<SummaryForm/>);
    const user = userEvent.setup()
    const tcCheckBox = screen.getByRole("checkbox", {name: /terms and conditions/i});
    const submitButton = screen.getByRole("button", {name: /confirm order/i});
    await user.click(tcCheckBox);
    expect(submitButton).toBeEnabled();
    await user.click(tcCheckBox);
    expect(submitButton).toBeDisabled();
})