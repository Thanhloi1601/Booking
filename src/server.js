import express from "express"
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRouters from './route/web'
import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();


let app = express();
app.use(cors({ credentials: true, origin: true }));


// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


viewEngine(app);
initWebRouters(app);
connectDB();

let port = process.env.PORT || 8080;
// port == undefine => port = 8080
app.listen(port,()=>{
    console.log("Backend Nodejs running  on port : "+ port)
})