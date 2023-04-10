module.exports = function (app) {

const express = require('express');
var cors = require('cors')
var session = require('express-session');
const bp = require('body-parser');
const MongoStore = require("connect-mongo");
const jwt = require('jsonwebtoken');
// const { MongoClient } = require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://tatams:1234@cluster0.6mlnnkl.mongodb.net/Numer`;

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connect")
    } catch(error){
        console.log(error)
    }
}
connect()

const corsOptions = { origin: '*'}
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(port, ()=> console.log(`port : ${port}`));

// app.post('/au',(req,res) =>{
//     axios.get("http://localhost:5000/token",{ name: "tatams",pasword: "1234"})
    
// })

app.post('/token',(req,res) =>{
    const n ={
        apiKey : 'tatams'
    }
    const token = jwt.sign(n,'1234');
    console.log(token)
    res.json({
        token :token
    })
})

function CheckToken(req,res,next){
    const header = req.headers['authorization'];
    console.log("Check" + header);
    if(!header){
        return res.status(401).send()
    }

    const token = header;
    try{
        const decode = jwt.verify(token,"1234")
        console.log("tryy")
        if(decode.apiKey !== "tatams" ){
            throw new Error("Invalid API KEY")
        }
        next();

    }catch(error){
        return res.status(401).send('Error')
    }
}

app.post('/random',CheckToken,async (req,res) =>{
    // const client = new MongoClient(uri);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    // await client.connect();
    let page = req.body.pages
    let E = req.body.Equation
    console.log("page "+ page)
    console.log("E "+ E)
    let query = await client.db("Numer").collection(page).findOne({ Equation : E  })
    // console.log(query)
     if(page == 'Bisection'){
        let f = query.Equation;
        let r = query.XR;
        let l = query.XL;
        let obj = {
            fx : f,
            xl : l,
            xr : r
        }
        console.log(f)
        res.send(obj)
        
     }
     else if(page == 'Linear'){
        let size = parseFloat(query.Equation);
        let x = query.X;
        const array = query.Metric;
        let obj = {
            Msize : size,
            x : x,
            Met : array
        }
        console.log(obj.Met)
        res.send(obj)
     }
     else if(page == 'OnePoint'){
        let e = query.Equation;
        let x1 = query.X1
        let obj = {
            eq : e,
            x1 : x1,
        }
        console.log(obj)
        res.send(obj)
        
     }
    console.log(page)
})

}