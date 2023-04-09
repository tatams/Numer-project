// var i = 0
// var Xi =2

// function func(x){
//     var fx=Math.pow(x,2)-7
//     var fxx=2*x
//     return(x-(fx/fxx))
// }
// function errorcheck(oldX,X){
//     return( Math.abs(( X - oldX ) / X) *100)
// }

// do {
//     console.log("Iteration " + (i+1))
//     console.log("X" + (i+1) + " = " + Xi)
//     i++
//     var oldx = Xi
//     Xi = func(oldx)
//     error = errorcheck(oldx,Xi)
//     console.log("error = " + error)
// } while( error > 0.000001 )

//-------------------------------------------

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
import { evaluate, derivative } from "mathjs";
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

const Newton = () => {
  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueXi, setValueXi] = useState([]);
  const [valueXold, setValueXold] = useState([]);
  const [valueE, setvalueE] = useState([]);
  const [showGraph, setshowGraph] = useState(false);

  const [html, setHtml] = useState(null);
  const [Equation, setEquation] = useState("(x^4)-13");
  const [X, setX] = useState(0);
  const [Xi, setXi] = useState(0);
  const print = () => {
    console.log(data);
    setValueIter(data.map((x) => x.iteration));
    setValueXi(data.map((x) => x.Xi));
    setValueXold(data.map((x) => x.Xold));
    setvalueE(data.map((x) => x.E));
    return (
      <Container>
        <Table striped bordered hover variant="dark" className="tab">
          <thead>
            <tr className="table-head">
              <th width="12%">Iteration</th>
              <th width="44%">Xi</th>
              <th width="44%">Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.Xi}</td>
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
        label: "Xi",
        data: valueXi,
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  const error = (xo, xn) => Math.abs((xn - xo) / xn) * 100;

  
const Calnewton = (xi) => {
    var xo, ea, scope,fxx,fx,dirformula;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
    do {
        console.log("ffffff")
      iter++;
      xo = xi;
      scope = {
        x: xi,
      };
      fx = evaluate(Equation,scope)
      dirformula = derivative(Equation,'x')
      fxx = evaluate(dirformula.toString(),scope)
      xi = xo - (fx / fxx)
      ea = error(xo, xi);
      obj = {
        iteration: iter,
        Xi: xi,
        Xold: xo,
        E: ea
      };
      data.push(obj);
    } while (ea > e && iter < MAX);
      setX(xi);
      setValueIter(iter);
      setshowGraph(true);
      setvalueE(ea);
  };


  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputXi = (event) => {
    console.log(event.target.value);
    setXi(event.target.value);
  };

  const calculateRoot = () => {
    const xinum = parseFloat(Xi);
    Calnewton(xinum);
    setHtml(print());
  };

  return (
    <Container>
      <div className="main-section">
      <Form>
        <Form.Group className="form-input">
          <div>
          <h1>Newton-Raphson</h1>
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
          <Form.Label>Input x1</Form.Label>
          <input
            type="number"
            id="XL"
            onChange={inputXi}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            maxlength="4"
            size="4"
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
                Xi : {valueXi[valueXi.length-1]}<br></br>
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

export default Newton;
    