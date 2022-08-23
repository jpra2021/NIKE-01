import { Router } from "express";
import {eduService} from '../services/eduService'
//라우터 설정

const eduRouter = Router();

/*------Controller------- */
const createEducation = async (req, res)=>{
    //req.body 값 받아와서 학력 DB 생성
    const {school, major, position} = req.body

    const newEducation = await eduService.addEdu({
        school,
        major,
        position
    })

    return res.json(newEducation);

}

const editEducation = async (req, res)=>{
    //req.body 값 받아오는 것
    const {school, major, position} = req.body

    const updateEdu = await eduService.editEdu({
        school,
        major,
        position
    })

    return res.json(updateEdu)
}

/*-------Router-------*/
eduRouter.route('/userid/:id/edu').post(createEducation)
eduRouter.route('/userid/:id/edu').put(editEducation)

export {eduRouter}