import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cookieParser  from 'cookie-parser';
import userRout from './routes/api.routes';

const app = express();

const PORT:number = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
    next();
  });
app.use('/api', userRout);


try{
    app.listen(PORT,()=>{
        console.log(`Backend server started on port ${PORT}`)
    })
}catch(e){
    console.error(e);
}
