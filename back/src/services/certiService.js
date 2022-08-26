import {Certificate} from "../db/models/Certificate"


class certiService{

    /* --- CREATE -----*/
    static async createCertis(newInput) {
        const creatednewCertis = await Certificate.create(newInput);

        console.log("서비스=>", creatednewCertis)
        return creatednewCertis;
      }
    
    /* --- UPDATE -----*/
    static async updateCerti(user_id, newInput) {
        /* for return */
        let certi;
        const { title, detail, date } = newInput;
        //check title
        if (title) {
            const fieldToUpdate = "title";
            const newValue = title;
            certi = await Certificate.update({ user_id, fieldToUpdate, newValue });
        }
        //check detail
        if (detail) {
            const fieldToUpdate = "detail";
            const newValue = detail;
            certi = await Certificate.update({ user_id, fieldToUpdate, newValue });
        }

        //check date
        if (date) {
            const fieldToUpdate = "date";
            const newValue = date;
            certi = await Certificate.update({ user_id, fieldToUpdate, newValue });
        }
        return certi;
    }

    /* --- GET -----*/
    static async getCertis(id){
        const getCertis = await Certificate.find(id)
        return getCertis
    }

    /* --- DELETE -----*/
    static async deleteCerti(user_id) {
        const certi = await Certificate.delete(user_id);
        return certi;
    }
}

export {certiService}
