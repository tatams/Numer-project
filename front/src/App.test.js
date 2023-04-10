// import { render, screen, fireEvent } from '@testing-library/react';
// const request = require('supertest');

// import App from './App';
// import Bisection from './all/Bisection';
// import Navbar from './component/nav';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('input updates its value when a new value is entered', ()=>{
//   const Bisection = require('./all/Bisection');
//   // render(<Bisection/>);
//   const inputfx = screen.getByTestId("fx")
//   const newValue = "(x-1)^2"
//   fireEvent.change(inputfx, { target: { value: newValue }})
//   expect(inputfx.value).toMatch(newValue)
  
// })

// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import InputField from "./InputField";

// describe("InputField component", () => {
//   it("updates its value when a new value is entered", () => {
//     const onChangeMock = jest.fn();
//     const defaultValue = "default value";

//     render(
//       <InputField
//         label="Input Field"
//         name="input-field"
//         value={defaultValue}
//         onChange={onChangeMock}
//       />
//     );

//     const inputEl = screen.getByLabelText("Input Field");
//     const newValue = "new value";

//     fireEvent.change(inputEl, { target: { value: newValue } });

//     expect(onChangeMock).toHaveBeenCalledTimes(1);
//     expect(onChangeMock).toHaveBeenCalledWith(newValue);
//     expect(inputEl.value).toBe(newValue);
//   });
// });


// test('handleClick function is called when button is clicked', () => {
//   const handleClickMock = jest.fn();
//   render(<Bisection onClick={handleClickMock} />);
//   const buttoncal = screen.getByTestId('Calculate');
//   fireEvent.click(buttoncal);
//   expect(handleClickMock).toHaveBeenCalled();
// });

// test('Navbar Page Mapping',()=>{
//   const { getByTestId, container } = renderWithRouter(<Navbar/>);
//   const navbar = getByTestId('navbar');
//   const homeLink = getByTestId('home-link');

//   expect(container.innerHTML).toMatch('Home page');
//   expect(navbar).toContainElement(homeLink);
// });