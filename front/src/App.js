import logo from './logo.svg';
import Navbar from './component/nav';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bisection from './all/Bisection';
import FalsePosition from './all/false-position';
import OnePoint from './all/one-point';
import Newton from './all/newton';
import Secant from './all/secant';
import Taylor from './all/taylor';
import Cramer from './all/cramer';
import Linear from './all/linear-reg';
import Inputtext from './all/ttt';
import Met from './all/cramer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/> 
      <div className="layout">
      <Routes>
        <Route path="/" element={''}/>
        <Route path="/Bisection" element={<Bisection/>}/>
        <Route path="/FalsePosition" element={<FalsePosition/>}/>
        <Route path="/onepoint" element={<OnePoint/>}/>
        <Route path="/newton-raphon" element={<Newton/>}/>
        <Route path="/secant" element={<Secant/>}/>
        <Route path="/taylor" element={<Taylor/>}/>
        <Route path="/cramer" element={<Cramer/>}/>
        <Route path="/linear" element={<Linear/>}/>

      </Routes>
      </div>
    </BrowserRouter>
    </div>
    
  );
}

// function App(){
//   return(
//     <div>
//       {/* <Inputtext/> */}
//       <Met/>
//     </div>
//   );
// }

export default App;
