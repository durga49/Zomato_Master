import express from "express";
import helmet from "helmet";
import cors from "cors";
const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(helmet());
zomato.use(cors());


zomato.get("/",(req,res)=>{
    res.json({message:"setup success Yay!!"})
});

zomato.listen(4000,()=>{
    console.log("Server is up and running");
})