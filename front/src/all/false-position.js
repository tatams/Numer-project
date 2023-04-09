// var Xl = 1.5
// var Xr = 2.0
// var i = 0
// var FXr,FXl,FXm,Xprevious

// function func(x){
//     return( Math.pow(x,4) - 13 )
// }
// function half(l,r){
//     return( (l+r)/2 )
// }
// function errorcheck(Xnew,Xold){
//     return( ( Xnew - Xold ) / Xnew * 100)
// }

// do {
//     i++
//     FXl = func(Xl)
//     FXr = func(Xr)
//     Xm = half(Xl,Xr);
//     FXm = func(Xm)
//     if(FXm*FXr>0) {
//         Xprevious = Xr
//         Xr = Xm
//         error = errorcheck(Xr,Xprevious)
//     }    
//     else {
//         Xprevious = Xl
//         Xl = Xm
//         error = errorcheck(Xl,Xprevious)
//     }
//     console.log("Iteration " + i)
//     console.log("Xl = " + Xl)
//     console.log("Xr = " + Xr)
// } while( error > 0.000001 )


import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from "mathjs";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../css/style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FalsePosition = () => {
    const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueXl, setValueXl] = useState([]);
  const [valueX1, setValueX1] = useState([]);
  const [valueXr, setValueXr] = useState([]);
  const [valueE, setvalueE] = useState([]);
  const [showGraph, setshowGraph] = useState(false);

  const [html, setHtml] = useState(null);
  const [Equation, setEquation] = useState("(x^4)-13");
  const [X, setX] = useState(0);
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);
  const print = () => {
    console.log(data);
    setValueIter(data.map((x) => x.iteration));
    setValueXl(data.map((x) => x.Xl));
    setValueX1(data.map((x) => x.X1));
    setValueXr(data.map((x) => x.Xr));
    setvalueE(data.map((x) => x.E));
    return (
      <Container>
        <Table striped bordered hover variant="dark" className="tab">
          <thead>
            <tr className="table-head">
              <th width="12%">Iteration</th>
              <th width="22%">XL</th>
              <th width="22%">X1</th>
              <th width="22%">XR</th>
              <th width="22%">Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.Xl}</td>
                  <td>{element.X1}</td>
                  <td>{element.Xr}</td>
                  <td>{element.E}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  };

  const options = {
    scaleShowValues: true,
    scales: {
      y: {
        display: true,
        // beginAtZero: true,
        ticks: {
          stepSize: 0.000001,
          suggestedMin:0,
          
        }
        // autoskip:false
        // stepSize: 1,
      },
      x:{
        
      }
      // yAxes: [{
      //       ticks: {
      //           // precision: 0,
      //           // stepSize: 1,
      //           // autoskip:false,
      //           // beginAtZero:false,
      //           // suggestedMin:0
      //           // min :0,
      //           // max:100
      //           stepSize: 2
      //       },
      //   }],
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataa = {
    labels: valueIter,
    datasets: [
      {
        label: "ฺError",
        data: valueE,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "X1",
        data: valueX1,
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  const error = (xo, xn) => Math.abs((xn - xo) / xn) * 100;

  const Calfalseposition = (xl, xr) => {
    var x1, fX1, fXl, fXr, ea, scope;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
    do {
      scope = {
        x: xl,
      };
      fXl = evaluate(Equation, scope);
      console.log("fxl :"+fXl);
      scope = {
        x: xr,
      };
      fXr = evaluate(Equation, scope);
      console.log("fxr :"+fXr);
      x1 = ((xl*fXr)-(xr*fXl))/(fXr-fXl);
      scope = {
        x: x1,
      };
      fX1 = evaluate(Equation, scope);
      iter++;
      if (fX1 * fXr > 0) {
        ea = error(xr, x1);
        // xold = xr;
        obj = {
          iteration: iter,
          Xl: xl,
          X1: x1,
          Xr: xr,
          E: ea
        };
        data.push(obj);
        xr = x1;
      } else if (fX1 * fXr < 0) {
        ea = error(xl, x1);
        // xold = xl;
        obj = {
          iteration: iter,
          Xl: xl,
          X1: x1,
          Xr: xr,
          E: ea
        };
        data.push(obj);
        xl = x1;
      }
    } while (ea > e && iter < MAX);
    if(fXl < 0 && fXr > 0){
      setX(x1);
      setValueIter(iter);
      setshowGraph(true);
      setvalueE(ea);
    }
    else{
      Swal.fire({
        icon: "error",
        text: "XL or XR value is incorrect",
      });
      setshowGraph(false);
    }
  };

  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputXL = (event) => {
    console.log(event.target.value);
    setXL(event.target.value);
  };

  const inputXR = (event) => {
    console.log(event.target.value);
    setXR(event.target.value);
  };

  const calculateRoot = () => {
    const xlnum = parseFloat(XL);
    const xrnum = parseFloat(XR);
    Calfalseposition(xlnum, xrnum);
    setHtml(print());

    console.log(valueIter);
    console.log(valueXl);
  };

  return (
    <Container>
      <div className="main-section">
      <Form>
        <Form.Group className="form-input">
          <div>
          <h1>False Position</h1>
          </div>
          <div>
          <div className="form-all-i">
            <div className="form-i">
          <Form.Label>Input f(x)</Form.Label>
          <input
            type="text"
            id="equation"
            value={Equation}
            onChange={inputEquation}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            width=""
          ></input>
            </div>
            <div className="form-i">
          <Form.Label>Input XL</Form.Label>
          <input
            type="number"
            id="XL"
            onChange={inputXL}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            maxlength="4"
            size="4"
          ></input>
          </div>
            <div className="form-i">
          <Form.Label>Input XR</Form.Label>
          <input
            type="number"
            id="XR"
            onChange={inputXR}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
          ></input>
            </div>
          </div>
          </div>
        </Form.Group>
        <Button onClick={''} className="button-random">Random</Button>
        <Button onClick={calculateRoot} className="button-calculate">Calculate</Button>
      </Form>
      <div>
      {showGraph == true && 
        <Container>
          <div className="table_answersection">
            <div className="table_answer-dec">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          <div className="table_answer">
          <div className="graph"><Line options={options} data={dataa} /></div>
            <div className="result">
              <center><h3>Answer</h3></center><br></br>
                Iteration : {valueIter[valueIter.length-1]}<br></br>
                XL : {valueXl[valueXl.length-1]}<br></br>
                X1 : {valueX1[valueX1.length-1]}<br></br>
                XR : {valueXr[valueXr.length-1]}<br></br>
                Error : {valueE[valueE.length-1]}<br></br><br></br>
                Answer = {X.toPrecision(7)}<br></br>

            </div>
          </div>
          </div>
        </Container>
      }
      </div>
      
      </div>
      <br></br>
      {showGraph == true && 
        <Container>
            {html}
        </Container>
      }
    </Container>
  );
};

export default FalsePosition;


    