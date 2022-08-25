import {Certificate} from "../db/models/Certificate"


class certificateService{
    static async setCertificate(inputdata){
        const {id} = inputdata;
        const {title, description, getDate} = inputdata

        let isCertificate = await Certificate.findById(id)

        if(!isCertificate){
            const createCertificate = await Certificate.create(inputdata)

            return createCertificate;
        }

        let updateCertificate;

        if(title){
            const fieldToUpdate = "title";
            const newValue = title;

            console.log("🙄title 보이니?", title)

            updateCertificate = await Certificate.update({id, fieldToUpdate, newValue})
        }

        if(description){
            const fieldToUpdate = "description";
            const newValue = description;

            console.log("🙄description 보이니?", description)

            updateCertificate = await Certificate.update({id, fieldToUpdate, newValue})
        }

        if(getDate){
            const fieldToUpdate = "getDate";
            const newValue = getDate;

            console.log("getDate 보이니?", description)

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