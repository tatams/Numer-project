import { evaluate } from "mathjs";
export const Calbisection = (xl, xr,Equation) => {
    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;
    var xm, fXm, fXl, fXr, ea, scope;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
    const data =[];
    do {
      xm = (xl + xr) / 2.0;
      scope = {
        x: xl,
      };
      fXl = evaluate(Equation, scope);
      scope = {
        x: xr,
      };
      fXr = evaluate(Equation, scope);
      scope = {
        x: xm,
      };
      fXm = evaluate(Equation, scope);

      iter++;
      if (fXm * fXr > 0) {
        ea = error(xr, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          E: ea
        };
        data.push(obj);
        xr = xm;
      } else if (fXm * fXr < 0) {
        ea = error(xl, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          E: ea
        };
        data.push(obj);
        xl = xm;
      }
    } while (ea > e && iter < MAX);
    return obj
    
  };