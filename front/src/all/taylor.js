import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative, factorial } from "mathjs";
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

const Taylor = () => {
  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [ValueANS, setValueANS] = useState([]);
  const [valueE, setvalueE] = useState([]);
  const [showGraph, setshowGraph] = useState(false);

  const [html, setHtml] = useState(null);
  const [Equation, setEquation] = useState("(x^2)-7");
  const [X, setX] = useState(0);
  const [X0, setX0] = useState(0);
  const [N, setN] = useState(0);
  const print = () => {
    console.log(data);
    setValueIter(data.map((x) => x.iteration));
    setValueANS(data.map((x) => x.ans));
    setvalueE(data.map((x) => x.E));
    return (
      <Container>
        <Table striped bordered hover variant="dark" className="tab">
          <thead>
            <tr className="table-head">
              <th width="12%">N</th>
              <th width="44%">Answer</th>
              <th width="44%">Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.ans}</td>
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
        label: "ANS",
        data: ValueANS,
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  const error = (xo, xn) => Math.abs((xn - xo) / xn) * 100;

  
const Caltaylor = (x,x0,n) => {
    var ea, scope, derformula;
    var ans=0;
    var Equ = Equation;
    var i = 0;
    const e = 0.00001;
    var cal ;
    var obj = {};
    do {
      scope = {
        x: x
      };
      cal = evaluate(Equation,scope);
      console.log("cal = "+cal);
      console.log("i = "+i);
        scope = {
            x: x0
        };
        if(i==0){
          Equ = Equation;
        }else{
          derformula = derivative(Equ,'x');
          Equ = derformula.toString();
        }
        console.log("derformula "+derformula)
        ans += (evaluate(Equ,scope))*(Math.pow((x-x0),i)/factorial(i));
        console.log("fun = "+Math.pow((x-x0),i)/factorial(i));
        console.log("ans = "+ans);
        i++;
        ea = error(cal, ans);
        obj = {
            iteration: i,
            ans: ans,
            E: ea
        };
        data.push(obj);
        console.log(data)
        console.log("i = "+i);
        n--;
    } while (n>0);
      setValueIter(i);
      setValueANS(ans);
      setshowGraph(true);
      setvalueE(ea);
      console.log("-------------------------")
  };


  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputX = (event) => {
    console.log(event.target.value);
    setX(event.target.value);
  };

  const inputX0 = (event) => {
    console.log(event.target.value);
    setX0(event.target.value);
  };

  const inputN = (event) => {
    console.log(event.target.value);
    setN(event.target.value);
  };

  const calculateRoot = () => {
    const xnum = parseFloat(X);
    const x0num = parseFloat(X0);
    const nnum = parseFloat(N);
    Caltaylor(xnum,x0num,nnum);
    setHtml(print());
  };

  return (
    <Container>
      <div className="main-section">
      <Form>
        <Form.Group className="form-input">
          <div>
          <h1>Taylor Series</h1>
          </div>
          <div>
          <div className="form-all-i">
            <div className="form-i">
          <Form.Label htmlFor="equation">Input f(x)</Form.Label>
          <input
            type="text"
            id="equation"
            data-testid="fx"
            value={Equation}
            onChange={inputEquation}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            width=""
            defaultValue={Equation}
          ></input>
            </div>
            <div className="form-i">
          <Form.Label htmlFor="X1">Input x</Form.Label>
          <input
            type="number"
            id="X1"
            data-testid="X1"
            onChange={inputX}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            maxlength="4"
            size="4"
          ></input>
          </div>
          <div className="form-i">
          <Form.Label htmlFor="X0">Input x0</Form.Label>
          <input
            type="number"
            id="X0"
            data-testid="X0"
            onChange={inputX0}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            maxlength="4"
            size="4"
          ></input>
          </div>
          <div className="form-i">
          <Form.Label htmlFor="N">Input n</Form.Label>
          <input
            type="number"
            id="N"
            data-testid="N"
            onChange={inputN}
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
        <Button onClick={calculateRoot} className="button-calculate" data-testid="cal">Calculate</Button>
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
                {/* Error : {valueE[valueE.length-1]}<br></br><br></br> */}
                <div data-testid="ans">Answer : {ValueANS[ValueANS.length-1]}</div><br></br><br></br>
                {/* Answer = {X.toPrecision(7)}<br></br> */}

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

export default Taylor;
    

    