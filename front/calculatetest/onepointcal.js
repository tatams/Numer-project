import { evaluate } from "mathjs";
export const Calonepoint = (xi,Equation) => {
    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;
    var xo, ea, scope;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
    const data =[];
    do {
      iter++;
      xo = xi;
      scope = {
        x: xi,
      };
      xi = evaluate(Equation, scope);
      ea = error(xo, xi);
      obj = {
        iteration: iter,
        Xi: xi,
        Xold: xo,
        E: ea
      };
      data.push(obj);
    } while (ea > e && iter < MAX);
    return obj
  };