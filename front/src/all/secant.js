// var i = 0
// var Xi = 2
// var newx = 2
// function func(x,xx,i){
//     if(i==1){
//         var fx=Math.pow(x,2)-7
//         var fxx=2*x
//         var value = x-(fx/fxx)
//         console.log("x0 = 2")
//     }
//     else{
//         var fx0=Math.pow(x,2)-7
//         var fx1=Math.pow(xx,2)-7
//         var value = xx-((fx1*(x-xx))/(fx0-fx1))
//         console.log("x"+(i-2)+" = " +x)
//         console.log("x"+(i-1)+" = "+xx)
//     }
//     return(value)
// }
// function errorcheck(oldX,X){
//     return( Math.abs(( X - oldX ) / X) *100)
// }
// do {
//     console.log("Iteration " + (i+1))
//     i++
//     var oldx = Xi
//     Xi = newx
//     newx = func(oldx,Xi,i)
//     error = errorcheck(Xi,newx)
//     console.log("error = " + error)
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

const Secant = () => {
  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueXi, setValueXi] = useState([]);
  const [valueXold, setValueXold] = useState([]);
  const [valueXnew, setValueXnew] = useState([]);
  const [valueE, setvalueE] = useState([]);
  const [showGraph, setshowGraph] = useState(false);

  const [html, setHtml] = useState(null);
  const [Equation, setEquation] = useState("(x^2)-7");
  const [X, setX] = useState(0);
  const [Xold, setXold] = useState(0);
  const [Xnew, setXnew] = useState(0);
  const print = () => {
    console.log(data);
    setValueIter(data.map((x) => x.iteration));
    setValueXi(data.map((x) => x.Xi));
    setValueXold(data.map((x) => x.Xold));
    setValueXnew(data.map((x) => x.Xnew));
    setvalueE(data.map((x) => x.E));
    return (
      <Container>
        <Table striped bordered hover variant="dark" className="tab">
          <thead>
            <tr className="table-head">
              <th width="10%">Iteration</th>
              <th width="30%">Xi</th>
              <th width="30%">Xi+1</th>
              <th width="30%">Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.Xold}</td>
                  <td>{element.Xnew}</td>
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
        label: "Xnew",
        data: valueXnew,
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  const error = (xo, xn) => Math.abs((xn - xo) / xn) * 100;

  
const Calsecant = (x1,x2) => {
    var ea, scope, fxo, fxn,xnew;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
    do {
      iter++;
      scope = {
        x: x1,
      };
      fxo = evaluate(Equation,scope)
      console.log("X1 = "+x1+" fX1 = "+fxo)
      scope = {
        x: x2,
      };
      fxn = evaluate(Equation,scope)
      console.log("X2 = "+x2+" fX2 = "+fxn)
      xnew = x2-((fxn*(x1-x2))/(fxo-fxn));
      console.log("X3 = "+xnew)
    ea = error(x2, xnew);
      obj = {
        iteration: iter,
        X: xnew,
        Xold:x2,
        Xnew:xnew,
        E: ea
      };
      data.push(obj);
      console.log(data)
      x1 = x2;
      x2 = xnew;
    } while (ea > e && iter < MAX);
      setX(xnew);
      setValueIter(iter);
      setshowGraph(true);
      setvalueE(ea);
      console.log("-------------------------")
  };


  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputX1 = (event) => {
    console.log(event.target.value);
    setXold(event.target.value);
  };

  const inputX2 = (event) => {
    console.log(event.target.value);
    setXnew(event.target.value);
  };

  const calculateRoot = () => {
    const x1num = parseFloat(Xold);
    const x2num = parseFloat(Xnew);
    Calsecant(x1num,x2num);
    setHtml(print());
  };

  return (
    <Container>
      <div className="main-section">
      <Form>
        <Form.Group className="form-input">
          <div>
          <h1>Secant</h1>
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
          <Form.Label>Input x0</Form.Label>
          <input
            type="number"
            id="X1"
            onChange={inputX1}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            maxlength="4"
            size="4"
          ></input>
          </div>
          <div className="form-i">
          <Form.Label>Input x1</Form.Label>
          <input
            type="number"
            id="X2"
            onChange={inputX2}
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
                {/* Xi : {valueXold[valueXold.length-1]}<br></br>
                Xi+1 : {valueXnew[valueXnew.length-1]}<br></br> */}
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

export default Secant;
    

    