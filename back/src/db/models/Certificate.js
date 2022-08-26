import { CertificateModel } from "../schemas/certificate";

class Certificate {

  /*--- CREATE ---*/
  static async create(newCerti) {
    const createNewCertis = await CertificateModel.create(newCerti);

    console.log("모데=>", createNewCertis)
    return createNewCertis;
  }

  /* --UPDATE -- */
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { _id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateCerti = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updateCerti;
  }

  /* ---FIND ---*/
  //to get all docs of the user
  static async find(id) {
    const users = await CertificateModel.find({ id: id });
    return users;
  }

  /* -- Delete -- */
  static async delete(user_id) {
    const filter = { _id: user_id };
    const deleteCerti = await CertificateModel.findOneAndDelete(filter);

    return deleteCerti;
  }

  
}

export { Certificate };
