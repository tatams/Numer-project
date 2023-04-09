// var Xi = 0.0
// var i = 0
// var Xprevious

// function func(x){
//     return( 1/2 )
// }
// function errorcheck(Xp,X){
//     return( ( X - Xp ) / X * 100)
// }

// console.log("X1 = " + Xi)
// do {
//     i++
//     Xprevious = Xi
//     Xi = func(Xprevious)
//     error = errorcheck(Xprevious,Xi)
//     console.log("Iteration " + i)
//     console.log("X" + (i+1) + " = " + Xi)
//     console.log("error(X" + i + ",X" + (i+1) + ") = " + error)
// } while( error > 0.000001 )

//-------------------------------------------------------------

import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from "mathjs";
import Swal from "sweetalert2";
import axios from "axios";
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

const OnePoint = () => {
  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueXi, setValueXi] = useState([]);
  const [valueXold, setValueXold] = useState([]);
  const [valueE, setvalueE] = useState([]);
  const [showGraph, setshowGraph] = useState(false);

  const [html, setHtml] = useState(null);
  const [Equation, setEquation] = useState("");
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

  const Calonepoint = (xi) => {
    var xo, ea, scope;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
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
    Calonepoint(xinum);
    setHtml(print());
  };

  const random = (e) =>{
    const equation = e.target.value
    console.log(equation)
    if(equation =="select"){

    }else{
      axios.post("http://localhost:5000/random",{pages:"OnePoint",Equation:equation}).then( res =>{
        setEquation(res.data.eq)
        setXi(res.data.x1)
        let xi = document.getElementById("Xi");
        xi.value = res.data.x1;
        console.log(Xi)
      })
    }
  }

  return (
    <Container>
      <div className="main-section">
      <Form>
        <Form.Group className="form-input">
          <div>
          <h1>One-Point Iteration</h1>
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
            id="Xi"
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
        {/* <Button onClick={''} className="button-random">Random</Button> */}
        <Button onClick={calculateRoot} className="button-calculate">Calculate</Button>
        <select name="random" id="eq" onChange={random}>
          <option value="select">select Equation</option>
          <option value="cos(x)">cos(x)</option>
          <option value="sin(x)">sin(x)</option>
        </select>
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

export default OnePoint;


    


    