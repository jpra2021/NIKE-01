import {AwardModel} from "../schemas/award"

class Award{
    static async create(newAward){
        const createAward = await AwardModel.create(newAward)
        return createAward;
    }

    static async findById(id){
        const findAward = await AwardModel.findOne({id})
        return findAward;
    }

    static async update(updateData){

        const {id, fieldToUpdate, newValue} = updateData;
        
        const updateAward = await AwardModel.findOneAndUpdate(id, 
            {
                [fieldToUpdate] : newValue,
                returnOriginal : false
            }
        )

        return updateAward;
    }
}

export {Award}