import { Calbisection } from "../calculatetest/bisectioncal";
import { Calonepoint } from "../calculatetest/onepointcal";
const bisection_datatest = {
    fx: '(x^4)-13',
    xl:-1,
    xr:2
}
const onepoint_datatest = {
    fx: 'cos(x)',
    x1:1
}

describe('Bisection Front-end', () => {
  test('Calculate bisection Xm', () => {
    const Bisection = Calbisection(bisection_datatest.xl,bisection_datatest.xr,bisection_datatest.fx);
    // console.log(Bisection)
    expect(Bisection.Xm).toBe(1.8988290429115295);
  });
});

describe('OnePoint Front-end', () => {
    test('Calculate OnePoint X1', () => {
      const Onepoint = Calonepoint(onepoint_datatest.x1,onepoint_datatest.fx);
    //   console.log(Onepoint)
      expect(Onepoint.Xi).toBe(0.7390851084737987);
    });
  });