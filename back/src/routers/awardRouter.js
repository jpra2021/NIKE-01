import is from "@sindresorhus/is";
import {Router} from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();


const createAndUpdate = async (req, res, next) =>{
    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const {title, description} = req.body;
        const id = req.currentUserId;

        console.log("👀현재 유저 받아오니?", id)

        const newInput = {id, title, description}

        const newAward = await awardService.setAward(newInput)

        if(newAward.errorMessage){
            throw new Error(newAward.errorMessage)
        }

        res.status(201).json(newAward)

    }catch(err){
        next(err)
    }

}   

const getData= async (req, res, next) =>{
    try{
        const id = req.currentUserId;

        const getAward = await awardService.getAward(id)

        if(getAward.errorMessage){
            throw new Error(getAward.errorMessage)
        }
        res.status(201).json(getAward)
    }catch(err){
        next(err)
    }
}

awardRouter
    .route("/user/award")
    .all(login_required)
    .post(createAndUpdate)
    .put(createAndUpdate)
    .get(getData)


export {awardRouter}