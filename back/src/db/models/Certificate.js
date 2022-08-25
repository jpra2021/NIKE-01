import {CertificateModel} from "../schemas/certificate"

class Certificate{
    static async create(newAward){
        const createCertificate = await CertificateModel.create(newAward)
        return createCertificate;
    }

    static async findById(id){
        const findCertificate = await CertificateModel.findOne({id})
        return findCertificate;
    }

    static async update(updateData){

        const {id, fieldToUpdate, newValue} = updateData;

        const filter = id;
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        console.log("🐸 업데이트할 녀석들 체-크!", updateData)
        
        const updateCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateCertificate;
    }
}

export {Certificate}