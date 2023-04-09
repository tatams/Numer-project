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
import { det, multiply } from "mathjs";
import Swal from "sweetalert2";

const Cramer = () => {
  const data = [];
  const checkAXB =[];
  const [valueIter, setValueIter] = useState([]);
  const [ValueANS, setValueANS] = useState([]);
  const [showGraph, setshowGraph] = useState(false);
  const [CheckAnswer,setCheckAnswer] = useState([]);

  const [html, setHtml] = useState(null);
  const [MatrixSize,setMatrixSize] = useState(2);
  const [Matrix,setMatrix] = useState(Array(MatrixSize).fill().map(() => Array(MatrixSize+1).fill()));

  const print_ans = () => {
    console.log(data);
    setValueIter(data.map((x) => x.iteration));
    setValueANS(data.map((x) => x.ans));
    setCheckAnswer(checkAXB.map((x) => x.checkB));
    setCheckAnswer(checkAXB.map((x) => x.iteration));
    return (
      <Container>
        <Table striped bordered hover variant="dark" className="tab">
          <thead>
            <tr className="table-head">
              <th width="50%">X</th>
              <th width="50%">Answer</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>X{element.iteration}</td>
                  <td>{element.ans.toPrecision(5)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br></br>
        <Table striped bordered hover variant="dark" className="tab">
          <thead>
            <tr className="table-head">
              <th width="50%">check</th>
              <th width="50%">B</th>
            </tr>
          </thead>
          <tbody>
            {checkAXB.map((element, index) => {
              return (
                <tr key={index}>
                  <td>A*X{element.iteration}</td>
                  <td>{element.checkB}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  };

  function print(event, row, col) {
        const value = parseFloat(event.target.value);
        console.log("value :"+value);
        setMatrix(Matrix.map((rowValues, i) =>
          i === row ? rowValues.map((colValue, j) =>
            j === col ? value : colValue
          ) : rowValues
        ));
    return (
          <div style="display:flex;">
      <table>
        <tbody>
          {Matrix.map((row, i) =>
            <tr key={i}>
              {row.map((value, j) =>
                <td key={j}>
                  <input type="number" value={value} onChange={event => print(event, i, j)} className="matrixtable"/>
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

  const options = {
    scaleShowValues: true,
    scales: {
      y: {
        display: true,
        ticks: {
          stepSize: 0.000001,
          suggestedMin:0,
          
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const inputMatrixSize = (event) =>{
    const size = parseInt(event.target.value);
    if(size>=2){
      setMatrixSize(size);
      setMatrix(Array(size).fill().map(() => Array(size+1).fill()));
    }else{
      Swal.fire({
        icon: "error",
        text: "Metrix Size must more than 1",
      });
    }
  }

  const calculateRoot = () => {
    let arr_group_row =[];
    let arr_A =[];
    let arr_group_check =[];
    let arr_check =[];
    let arr_det=[];
    let Cramer_Answer =[];
    var replace = 0;
    var obj = {};
    var obj_check = {};


    console.log(Matrix);
    for(var l=0;l<Matrix.length;l++){
      for(var r=0;r<Matrix.length;r++){
        arr_group_row.push(Matrix[l][r]);
      }
      console.log("grouppp : "+arr_group_row)
      arr_A.push(arr_group_row);
      arr_group_row =[];
    }
    console.log("arr_A");
    console.log(arr_A);

    for(var a=0;a<Matrix.length;a++){
    for(var l=0;l<Matrix.length;l++){
      for(var r=0;r<Matrix.length;r++){
        if(r==replace){
          arr_group_row.push(Matrix[l][Matrix.length]);
        }else{
          arr_group_row.push(Matrix[l][r]);
        }
      }
      console.log("group det : ");
      console.log(arr_group_row);
      arr_det.push(arr_group_row);
      arr_group_row =[];
    }
    console.log("array det");
    console.log(arr_det);
    var up = det(arr_det);
    var down = det(arr_A);
    var dett =up/down;
    Cramer_Answer.push(dett);
    replace++;
    arr_det =[];
    obj = {
        iteration: replace,
        ans: dett,
      };
    data.push(obj);
  }
  console.log("Cramer_Answer : ");
  console.log(Cramer_Answer);

  let checkB = multiply(arr_A,Cramer_Answer);
  setCheckAnswer(checkB);
  console.log("checkB -")
  console.log(checkB)
  console.log(CheckAnswer)
  for(var t=0;t<checkB.length;t++){
    obj_check = {
      iteration : (t+1),
      checkB : checkB[t]
    }
    checkAXB.push(obj_check);
  }

  setshowGraph(true);
  setValueANS(Cramer_Answer);
  setHtml(print_ans());

  };

  return (
    <Container>
      <div className="main-section">
      <Form>
        <Form.Group className="form-input">
          <div>
          <h1>Cramer's Rule</h1>
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
          </div>
          </div>
        </Form.Group>
      </Form>
      <div>
          <div>
            <table id="met-table">
         <tbody>
           {Matrix.map((row, i) =>
            <tr key={i} className="met-tr">
              {row.map((value, j) =>
                <td key={j} className="met-td">
                  <input type="number" placeholder={j == MatrixSize  ? "B"+(i+1) : "A"+(i+1)+(j+1)} value={value} onChange={event => print(event, i, j)} id="met-input"/>
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
        <Button onClick={calculateRoot} className="button-calculate">Calculate</Button>
          </div>
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

export default Cramer;

// function Met() {
//   const [matrixSize, setMatrixSize] = useState(0);
//   const [matrix, setMatrix] = useState([]);

//   function inputMatrixSize(event) {
//     const size = parseInt(event.target.value);
//     setMatrixSize(size);
//     setMatrix(Array(size).fill().map(() => Array(size).fill(0)));
//   }

//   function inputMatrixValue(event, row, col) {
//     const value = parseInt(event.target.value);
//     setMatrix(matrix.map((rowValues, i) =>
//       i === row ? rowValues.map((colValue, j) =>
//         j === col ? value : colValue
//       ) : rowValues
//     ));
//   }

//   return (
//     <div>
//       <label>
//         Matrix size:
//         <input type="number" value={matrixSize} onChange={inputMatrixSize} />
//       </label>
//       <table>
//         <tbody>
//           {matrix.map((row, i) =>
//             <tr key={i}>
//               {row.map((value, j) =>
//                 <td key={j}>
//                   <input type="number" value={value} onChange={event => inputMatrixValue(event, i, j)} />
//                 </td>
//               )}
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Met;