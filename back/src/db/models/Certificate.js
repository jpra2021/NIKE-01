import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create(newAward) {
    const createCertificate = await CertificateModel.create(newAward);
    return createCertificate;
  }

  static async findById(id) {
    const findCertificate = await CertificateModel.findOne({ id });
    return findCertificate;
  }

  static async update(updateData) {
    const { id, fieldToUpdate, newValue } = updateData;

    const filter = id;
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updateCertificate;
  }
}

export { Certificate };
