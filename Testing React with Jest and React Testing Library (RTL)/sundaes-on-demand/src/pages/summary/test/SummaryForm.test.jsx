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

test("Pop over responds to hover", async ()=>{
    render(<SummaryForm/>);
    // no pop over on page load
    const noPopOver = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(noPopOver).not.toBeInTheDocument()
    // pop over appears on hover
    const user = userEvent.setup();
    const termAndCond = screen.getByText(/terms and conditions/i)
    await user.hover(termAndCond);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument()

    // pop over disappear on mouse leave
    await user.unhover(termAndCond);
    expect(popover).not.toBeInTheDocument()
})