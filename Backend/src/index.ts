import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cookieParser  from 'cookie-parser';
import userRout from './routes/api.routes'; 
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

const PORT:number = Number(process.env.PORT) || 3001;

const publicPath = path.join(__dirname, '../public');
app.use('/public',express.static(publicPath));
app.use(express.json());
app.use(cookieParser()); 
app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
app.use('/api', userRout);


try{
    app.listen(PORT,()=>{
        console.log(`Backend server started on port ${PORT}`)
    })
}catch(e){
    console.error(e);
}
