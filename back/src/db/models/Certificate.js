import { CertificateModel } from "../schemas/certificate";

class Certificate {
  /*--- CREATE ---*/
  static async create(newCerti) {
    const createNewCertis = await CertificateModel.create(newCerti);

    console.log("모데=>", createNewCertis);
    return createNewCertis;
  }

  /* --UPDATE -- */
  static async update({ obj_id, fieldToUpdate, newValue }) {
    const filter = { _id: obj_id };
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
  static async find(user_id) {
    const users = await CertificateModel.find({ id: user_id });
    return users;
  }

  /* -- Delete -- */
  static async delete(obj_id) {
    const filter = { _id: obj_id };
    const deleteCerti = await CertificateModel.findOneAndDelete(filter);

    return deleteCerti;
  }
}

export { Certificate };
