import is from "@sindresorhus/is";
import {Router} from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();


const createAndUpdate = async (req, res, next) =>{
    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const {title, description, getDate} = req.body;
        const id = req.currentUserId;
        const newInput = {id, title, description, getDate}

        

        const newCertificate = await certificateService.setCertificate(newInput)

        console.log("👀잘 넘겨주니?", newCertificate)

        if(newCertificate.errorMessage){
            throw new Error(newCertificate.errorMessage)
        }

        res.status(201).json(newCertificate)

    }catch(err){
        next(err)
    }

}   

const getData= async (req, res, next) =>{
    try{
        const id = req.currentUserId;

        const getCertificate = await certificateService.getCertificate(id)

        if(getCertificate.errorMessage){
            throw new Error(getCertificate.errorMessage)
        }
        res.status(201).json(getCertificate)
    }catch(err){
        next(err)
    }
}

certificateRouter
    .route("/user/certificate")
    .all(login_required)
    .post(createAndUpdate)
    .put(createAndUpdate)
    .get(getData)


export {certificateRouter}