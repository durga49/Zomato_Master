import  express  from "express";
import { RestaurantModel } from "../../database/allModels";
import { ValidateRestaurantCity,validateRestaurantSearchString } from "../../validation/restaurant";
import { validateRestaurantId } from "../../validation/food";
const Router =  express.Router();

/*
Route        /
Des          Get all the restaurant details
Params       None
Access       Public
Method       GET
*/

Router.get("/",async(req,res)=>{
    try{
        await ValidateRestaurantCity(req.query);
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city:city});
        res.json({restaurants});

    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});


/*
Route        /
Des          Get a particular restaurant details based on id
Params       _id
Access       Public
Method       GET
*/


Router.get("/:_id",async(req,res)=>{
    try{
        await validateRestaurantId(req.params);
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findOne({_id:_id});
        return res.json({restaurant});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});

/*
Route        /search
Des          Get a particular restaurant details based on id
Params       searchString
Access       Public
Method       GET
*/

Router.get("/search",async(req,res)=>{
    try{
        await validateRestaurantSearchString(req.body);
        const {searchString} = req.body;
        const restaurants = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"}
        });
        return res.json({restaurants});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router;