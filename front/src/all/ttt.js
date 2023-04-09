import { evaluate } from "mathjs";
import { useState } from "react";

const Inputtext =()=>{
    // var fx, xl,xr;
    const [fx,setfx] = useState('(x^2)+5x');
    const [xl,setxl] = useState(0);
    const [xr,setxr] = useState(0);
    const [ans,setans] = useState(0);
    const [show,setshow] = useState(false);

    function inpfx(x){
        // fx=x;
        setfx(x.target.value);
        console.log(x.target.value);
    }

    function inpxl(x){
        // xl=x;
        setxl(x.target.value);
        console.log(x.target.value);
    }

    function inpxr(x){
        // xr=x;
        setxr(x.target.value);
        console.log(x.target.value);
    }
    
    function cal(){
        var scope;
        scope = {
            x:xl
        };
        setans(evaluate(fx,scope))
        setshow(true);
    }

    return(
        <div>
            {/* <form> */}
                <div className="form-input">
                    <legend>Input f(x)</legend>
                    <input type="text" onChange={inpfx} value='(x^2)+5x'></input>
                    <legend>Input X</legend>
                    <input type="number" onChange={inpxl}></input>
                    <legend>ANS</legend>
                    <input type="number" onChange={inpxr} value={ans}></input>
                </div>
                <button onClick={cal}>Calculate</button>
            {/* </form> */}
            <br></br><br></br>
            fx : {fx}<br></br>
            xl : {xl}<br></br>
            xr : {xr}<br></br>
            {(show == true) ? <div>
                <br></br>
                calculate
            </div>:null}
        </div>
    )
}
export default Inputtext