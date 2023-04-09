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


const Bisection = () => {
  const data = [];
  const [Q, setQ] = useState([]);
  const [valueIter, setValueIter] = useState([]);
  const [valueXl, setValueXl] = useState([]);
  const [valueXm, setValueXm] = useState([]);
  const [valueXr, setValueXr] = useState([]);
  const [valueE, setvalueE] = useState([]);
  const [Token, setToken] = useState("");
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
    setValueXm(data.map((x) => x.Xm));
    setValueXr(data.map((x) => x.Xr));
    setvalueE(data.map((x) => x.E));
    return (
      <Container>
        <Table striped bordered hover variant="dark" className="tab">
          <thead>
            <tr className="table-head">
              <th width="12%">Iteration</th>
              <th width="22%">XL</th>
              <th width="22%">XM</th>
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
                  <td>{element.Xm}</td>
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
        },
        // type: 'logarithmic'
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
        label: "Xm",
        data: valueXm,
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const Calbisection = (xl, xr) => {
    var xm, fXm, fXl, fXr, ea, scope;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
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
    if(fXl < 0 && fXr > 0){
      setX(xm);
      setValueIter(iter);
      setshowGraph(true);
      setvalueE(ea);
    }
    else{
      console.log("fXl:"+fXl+" fXr:"+fXr);
      // alert("XL or XR value is incorrect");
      Swal.fire({
        icon: "error",
        // title: "Oops...",
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
    Calbisection(xlnum, xrnum);
    setHtml(print());
    // axios.post("http://localhost:5000/En",{ password: PWD}).then(res=> {
    //   setPWD(res.data.pwd);
    // })
    console.log(valueIter);
    console.log(valueXl);
  };

  const click_random = (e) =>{
    const eq = e.target.value
    console.log(eq)
    axios.post("http://localhost:5000/token").then(res=> {
      setToken(res.data.token);
      console.log(res.data.token);
    })
    if(eq =='select'){

    }else{
      axios.post("http://localhost:5000/random", {pages: "Bisection", Equation: eq}, {headers: {authorization: `${Token}`}}).then( res => {
            setEquation(res.data.fx)
            setXL(res.data.xl)
            setXR(res.data.xr)
          });
    }
  }

  

  return (
    <Container>
      <div className="main-section">
      <Form>
        <Form.Group className="form-input">
          <div>
          <h1>Bisection</h1>
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
            value={XL}
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
            value={XR}
            onChange={inputXR}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
          ></input>
            </div>
          </div>
          </div>
        </Form.Group>
        <div className="Button">
        {/* <Button onClick={()=>{
          axios.post("http://localhost:5000/random",{ pages: "Bisection",Equation: Equation}).then( res => {
            console.log(res.data.xl)
            setEquation(res.data.fx)
            setXL(res.data.xl)
            setXR(res.data.xr)
          })
        }} className="button-random">Random</Button> */}
        <Button onClick={calculateRoot} className="button-calculate">Calculate</Button>
        </div>
        <select name="random" id="eq" onChange={click_random}>
        <option value="select">select Equation</option>
          <option value="(x^4)-1">(x^4)-1</option>
          <option value="(x^2)-1">(x^2)-1</option>
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
                XL : {valueXl[valueXl.length-1]}<br></br>
                XM : {valueXm[valueXm.length-1]}<br></br>
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

export default Bisection;
