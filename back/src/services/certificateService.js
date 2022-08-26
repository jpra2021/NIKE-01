import {Certificate} from "../db/models/Certificate"


class certificateService{
    static async setCertificate(inputdata){
        const {id} = inputdata;
        const {title, detail, date} = inputdata

        let isCertificate = await Certificate.findById(id)

        if(!isCertificate){
            const createCertificate = await Certificate.create(inputdata)

            return createCertificate;
        }

        let updateCertificate;

        if(title){
            const fieldToUpdate = "title";
            const newValue = title;

            updateCertificate = await Certificate.update({id, fieldToUpdate, newValue})
        }

        if(detail){
            const fieldToUpdate = "detail";
            const newValue = detail;

            updateCertificate = await Certificate.update({id, fieldToUpdate, newValue})
        }

        if(date){
            const fieldToUpdate = "date";
            const newValue = date;

            updateCertificate = await Certificate.update({id, fieldToUpdate, newValue})
        }

        return updateCertificate;
    }

    static async getCertificate(id){
        const getCertificate = await Certificate.findById(id)
        return getCertificate
    }
}

export {certificateService}