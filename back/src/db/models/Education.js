import { EducationModel } from "../schemas/education";

class Education{

    //Create
    static async createOrUpdate({ newEducation }) {
        if(없으면){
            //create
            const createdNewEducation = await EducationModel.create(newEducation);
            return createdNewEducation;
        }else{
            //update
            const updateEducation = await EducationModel.findByIdAndUpdate(filter, update)
        }
        
    }
}

export {Education}