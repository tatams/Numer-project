// const Met =() => {
//     const [metsize,setmetsize] = useState(0);
//     const [showinp,setshowinp] = useState(false);
//     const [InpTable,setinpTable] = useState();

//     function inputsize(x){
//         console.log(metsize)
//         setmetsize(x.target.value)
        
//     }

//     function cal(x){
//         setshowinp(true);
//         document.getElementById('inputbox').innerHTML = '';
//         for(var i=0;i<metsize;i++){
//             for(var j=0;j<metsize;j++){
//                 document.getElementById('inputbox').innerHTML += <input type="number" onChange={''} ></input>
//             }
//             document.getElementById('inputbox').innerHTML += <br></br>
//             document.getElementById('inputbox').innerHTML += <br></br>
//         }
//     }

//     return(
//         <div>
//             <div className="form-input">
//             <legend>set size</legend>
//             <input type="number" onChange={inputsize} value={metsize}></input>
//             </div>
//             <button onClick={cal}>Calculate</button>
//             {showinp == true &&
//             <div id="inputbox"></div>
//             }
//         </div>
//     )
// }

import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { inv, multiply, add, random } from "mathjs";
import Swal from "sweetalert2";
import Plot from 'react-plotly.js';
import axios from "axios";

const Linear = () => {
  const [ValueANS, setValueANS] = useState([]);
  const [ValuearrayX, setValuearrayX] = useState([]);
  const [ValuearrayY, setValuearrayY] = useState([]);
  const [Line_plot, setLine_plot] = useState([]);
  const [Final_answer,setfinal_answer] = useState(0);
  const [showGraph, setshowGraph] = useState(false);

  const [html, setHtml] = useState(null);
  const [MatrixSize,setMatrixSize] = useState(2);
  const [Matrix,setMatrix] = useState(Array(MatrixSize).fill().map(() => Array(2).fill()));
  const [X, setX] = useState(0);

  function print(event, row, col) {
        const value = parseFloat(event.target.value);
        setMatrix(Matrix.map((rowValues, i) =>
          i === row ? rowValues.map((colValue, j) =>
            j === col ? value : colValue
          ) : rowValues
        ));
        // for(var k=0;k<Matrix.length;k++){
        //   for(var l=0;l<Matrix.length;l++){
        //     const value = parseFloat(RandomArray[k][l]);
        //     setMatrix(Matrix.map((rowValues, i) =>
        //       k === row ? rowValues.map((colValue, j) =>
        //         l === col ? value : colValue
        //       ) : rowValues
        // ));
        //   }
        // }
    return (
          <div style="display:flex;">
      <table>
        <tbody>
          {Matrix.map((row, i) =>
            <tr key={i}>
              {row.map((value, j) =>
                <td key={j}>
                  <input type="number" value={value} onChange={event => print(event, i, j)} className="matrixtable" step='0.01'/>
                </td>
              )
              }
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
  };

  // const options = {
  //   scaleShowValues: true,
  //   scales: {
  //     y: {
  //       display: true,
  //       ticks: {
  //         // stepSize: 0.000001,
  //         // suggestedMin:0,
          
  //       }
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  // };
  // const plot = [
  //   { x: X, y: Final_answer },
  // ];
  // const dataa = {
  //   labels: ValuearrayX,
  //   datasets: [
  //     {
  //       label: "Linear Line",
  //       data: ValuearrayY,
  //       fill: false,
  //       borderColor: "rgb(75, 192, 192)",
  //       pointRadius: 5,
  //       // tension: 0.1,
  //     },
  //     {
  //       label: "answer",
  //       data: plot.map(point => ({ x: point.x, y: point.y })),
  //       fill: false,
  //       borderColor: "red",
  //       pointRadius: 5,
  //       // tension: 0.1,
  //     },
  //   ],
  // };

  const inputMatrixSize = (event) =>{
    const size = parseInt(event.target.value);
    if(size>=2){
      setMatrixSize(size);
      setMatrix(Array(size).fill().map(() => Array(2).fill()));
    }else{
      Swal.fire({
        icon: "error",
        // title: "Oops...",
        text: "Metrix Size must more than 1",
      });
    }
  }

  const inputX = (event) => {
    console.log(event.target.value);
    setX(event.target.value);
    // showGraph(false)
  };

  const calculateRoot = () => {

    let arr_X =[];
    let arr_Y =[];
    let arr =[];
    let n = Matrix.length;
    let arr_group_row =[];
    let arr_B =[];
    let arr_A=[];
    let ans =0;
    // let a_Answer =[];
    var replace = 0;
    let null_value = false;
    var obj = {};

    console.log(Matrix);
    for(var l=0;l<Matrix.length;l++){
        arr_X.push(Matrix[l][0]);
        arr_Y.push(Matrix[l][1]);
        if(Matrix[l][0] == null || Matrix[l][1] == null){
          null_value = true
        }
    }
    console.log("arr_X");
    console.log(arr_X);
    console.log("arr_Y");
    console.log(arr_Y);

    let sumX = arr_X.reduce(function (prev, curr) {
        return prev + curr;
    }, 0);

    // let sumXX = arr_X.reduce(function (prev, curr) {
    //     return (prev*prev)+ (curr*curr);
    // }, 0);


    let sumY = arr_Y.reduce(function (prev, curr) {
        return prev + curr;
    }, 0);
    
    let sumXX=0;
    let sumXY=0;
    for(var i=0;i<MatrixSize;i++){
        sumXX+=(arr_X[i]*arr_X[i]);
        sumXY+=(arr_X[i]*arr_Y[i]);
    }
    console.log("sum x"+sumX);
    console.log("sum xx"+sumXX);
    console.log("sum y"+sumY);
    console.log("sum xy"+sumXY);

    arr_group_row.push(sumY);
    arr_B.push(arr_group_row);
    arr_group_row =[];
    arr_group_row.push(sumXY);
    arr_B.push(arr_group_row);
    arr_group_row =[];
    console.log("B");
    console.log(arr_B);
    

    arr_group_row.push(n);
    arr_group_row.push(sumX);
    arr_A.push(arr_group_row);
    arr_group_row =[];
    arr_group_row.push(sumX);
    arr_group_row.push(sumXX);
    arr_A.push(arr_group_row);
    arr_group_row=[];
    console.log("A");
    console.log(arr_A);

    let inv_A = inv(arr_A);
    const a_Answer = multiply(inv_A,arr_B);

  if(null_value){
    Swal.fire({
      icon: "error",
      // title: "Oops...",
      text: "Please input vaules",
    });
  }
  else{
    function compareNumbers(a, b) {
      return a - b;
    }
    
    // let check = false;
    // for(i=0;i<arr_X.length;i++){
    //   if(arr_X[i]==X){
    //     check = true;
    //   }
    // }
    // if(!check){
    //   arr_X.push(X);
    // }
    arr_X.sort(); 
    arr_X.sort(compareNumbers);
    console.log("arr_X")
    console.log(arr_X)

    setValuearrayX(arr_X);
    setValuearrayY(arr_Y);
    setshowGraph(true);
    setValueANS(a_Answer);
    let a0 = a_Answer[0];
    let a1 = a_Answer[1];
    ans = add(a0,multiply(a1,X))
    setfinal_answer(ans);
    console.log("a1")
    for(var i=0;i<arr_X.length;i++){
      // let s = add(a0,multiply(a1,arr_X[i]))
      console.log("arr_X[i]")
      console.log(arr_X[i])
      arr.push(parseFloat(add(a0,multiply(a1,arr_X[i]))));
      // console.log("rrr")
    // console.log(y)
    }
    console.log("arr")
    console.log(arr)

    setLine_plot(arr);
  }
    
  };

  const click_random = (e) =>{
    const s = e.target.value
    console.log(s)
    if(s =='select'){

    }else{
      axios.post("http://localhost:5000/random",{ pages: "Linear", Equation: s}).then( res => {
        
            setMatrixSize(res.data.Msize)
            // inputMatrixSize(MatrixSize)
            // setMatrix(Array(MatrixSize).fill().map(() => Array(2).fill()));
            // setMatrix(Array(MatrixSize).fill().map(() => Array(2).fill()));
            // inputMatrixSize(9)

            console.log(Matrix)
            setX(res.data.x)
            setMatrix(res.data.Met)
            // setRandomArray(Matrix.push(...res.data.Met))
            console.log(Matrix)
            // console.log(res.data.Met[0][0])
          })
    }
  }

  return (
    <Container>
      <div className="main-section">
      <Form>
        <Form.Group className="form-input">
          <div>
          <h1>Linear Regrestion</h1>
          </div>
          <div>
          <div className="form-all-i">
            <div className="form-i">
          <Form.Label>Input Matrix size</Form.Label>
          <input
            type="number"
            id="metrixsize"
            value={MatrixSize}
            onChange={inputMatrixSize}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            width=""
          ></input>
            </div>
            <div className="form-i">
            <Form.Label>Input X</Form.Label>
          <input
            type="number"
            id="x"
            value={X}
            onChange={inputX}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
            width=""
          ></input>
            </div>
          </div>
          </div>
        </Form.Group>
        {/* <Button onClick={''} className="button-random">Random</Button>
        <Button onClick={calculateInputValuees} className="button-calculate">Calculate Matrix</Button> */}
      </Form>
      <div className="left-section">
          <div>
            <table id="met-table">
         <tbody>
           {Matrix.map((row, i) =>
            <tr key={i} className="met-tr">
              {row.map((value, j) =>
                <td key={j} className="met-td">
                  <input type="number" placeholder={j == 1  ? "Y"+(i+1) : "X"+(i+1)} value={value} onChange={event => print(event, i, j)} id="met-input" step='0.01'/>
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
        <Button onClick={calculateRoot} className="button-calculate">Calculate</Button>
        <select name="random" onChange={click_random}>
        <option value="select">select Metric size</option>
          <option value="9">size = 9</option>
          <option value="4">size = 4</option>
        </select>
          </div>
      {showGraph == true &&
        <Container>
          <div className="table_answersection">
            <div className="table_answer-dec">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          <div className="table_answer" id="plotly_graph">
          {/* <div className="graph"><Line options={options} data={dataa} /></div> */}
          <div>
          <Plot data={[{
            x : ValuearrayX,
            y : ValuearrayY,
            type : 'scatter',
            mode : 'markers',
            marker : {color : "blue"},
            name : "Data"
          },
          {
            x: [X],
            y: Final_answer,
            type : 'scatter',
            mode : 'markers',
            marker : {color : "red"},
            name : "Answer"
          },
          {
            x: ValuearrayX,
            y: Line_plot,
            type : 'scatter',
            mode : 'lines+markers',
            marker : {color : "green"},
            name : "Calculate"
          },
          
        ]}
        layout ={{width : 600, height : 400}}/>
        </div>
          <div className="graph">
            {/* <Line options={options} data={dataa} /> */}
            </div>
            <div className="result">
              <center><h3>Answer</h3></center><br></br>
                g(x) : {ValueANS[0]} + {ValueANS[1]} x<br></br>
                answer : {Final_answer}
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
            {/* {html} */}
        </Container>
      }
    </Container>
  );
};

export default Linear;