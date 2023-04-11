// import { Calbisection } from "../calculatetest/bisectioncal";
// import { Calonepoint } from "../calculatetest/onepointcal";

// const bisection_datatest = {
//     fx: '(x^4)-13',
//     xl:-1,
//     xr:2
// }
// const onepoint_datatest = {
//     fx: 'cos(x)',
//     x1:1
// }

// describe('Bisection Front-end', () => {
//   test('Calculate bisection Xm', () => {
//     const Bisection = Calbisection(bisection_datatest.xl,bisection_datatest.xr,bisection_datatest.fx);
//     // console.log(Bisection)
//     expect(Bisection.Xm).toBe(1.8988290429115295);
//   });
// });

// describe('OnePoint Front-end', () => {
//     test('Calculate OnePoint X1', () => {
//       const Onepoint = Calonepoint(onepoint_datatest.x1,onepoint_datatest.fx);
//     //   console.log(Onepoint)
//       expect(Onepoint.Xi).toBe(0.7390851084737987);
//     });
//   });

import Taylor from './all/taylor'
import { shallow } from 'enzyme';
import {render, screen, fireEvent} from '@testing-library/react'
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Tayler Front Test',()=>{
  it('Tayler component', async ()=>{
    const { getByTestId} = render(<Taylor />);
    const fx = screen.getByTestId('fx');
    const x1 = screen.getByTestId('X1');
    const x0 = screen.getByTestId('X0');
    const n = screen.getByTestId('N');
    const cal = screen.getByTestId('cal');
    // const input =  screen.getByLabelText('Input f(x)');
    fireEvent.change(fx, { target: { value: '(x^2)-7' } });
    fireEvent.change(x1, { target: { value: 2 } });
    fireEvent.change(x0, { target: { value: 1 } });
    fireEvent.change(n, { target: { value: 4 } });
    console.log(fx.value)
    console.log(x1.value)
    console.log(x0.value)
    console.log(n.value)
    fireEvent.click(cal);

    const ans = screen.getByTestId('ans');
    console.log(ans.textContent)
    expect(ans.textContent).toBe("Answer : -3");

    // const fx = screen.getByTestId('N')
    // console.log(fx)
  })
})