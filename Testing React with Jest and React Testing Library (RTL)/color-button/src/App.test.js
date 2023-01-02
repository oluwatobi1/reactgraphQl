import {fireEvent, logRoles, render, screen} from '@testing-library/react';
import App, {replaceCamelCaseWithSpaces} from './App';

test('button has initial color and updates when clicked', () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {name: "Change to Blue"})
  expect(colorButton).toHaveStyle({backgroundColor: "red"})

  fireEvent.click(colorButton)
  expect(colorButton).toHaveStyle({ backgroundColor: "blue"});
  expect(colorButton).toHaveTextContent("Change to Red");
});

test("initial condition", ()=>{
  render(<App/>);
  // check button start out enabled
  const colorButton = screen.getByRole("button", {name: "Change to Blue"})
  expect(colorButton).toBeEnabled()
//  check checkbox starts out enabled
  const toggleBtnEnableCheckBox = screen.getByRole("checkbox");
  expect(toggleBtnEnableCheckBox).not.toBeChecked();
})


test("check box functionality: Clicking checkbox toggles button disabled ppt", ()=>{
  render(<App/>);
  const checkBox = screen.getByRole("checkbox", {name: "Disable Button"});
  const colorButton = screen.getByRole("button", {name: 'Change to Blue'});

  expect(colorButton).toBeEnabled()
  fireEvent.click(checkBox)
  expect(colorButton).toBeDisabled();
  fireEvent.click(checkBox)
  expect(colorButton).toBeEnabled();
})

test("btn turns grey on disable", ()=>{
  render(<App/>);
  const checkBox = screen.getByRole("checkbox", {name: "Disable Button"});
  const colorButton = screen.getByRole("button", {name: 'Change to Blue'});

  fireEvent.click(checkBox)
  expect(colorButton).toHaveStyle({"backgroundColor":"gray"});
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({backgroundColor: "red"})
})


// describe("Spaces before camel-case tests", ()=>{
//   test("works for no spaces", ()=>{
//     expect(replaceCamelCaseWithSpaces("Red")).toBe("Red");
//   });
//   test("works for one space", ()=>{
//     expect(replaceCamelCaseWithSpaces("MidnightBlue")).toBe("Midnight Blue");
//   });
//
//   test("Works for multiple spaces", ()=>{
//     expect(replaceCamelCaseWithSpaces("MidnightVioletBlueColor")).toBe("Midnight Violet Blue Color");
//   });
// })