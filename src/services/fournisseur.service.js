import fournisseurRepo from '../repositories/fournisseur.repo.js';
import { createFournisseurSchema, updateFournisseurSchema } from '../validations/fournisseur.schema.js';

class FournisseurService {
  async create(data) {
    const validated = createFournisseurSchema.parse(data);
    return await fournisseurRepo.create(validated);
  }

  async getAll() {
    return await fournisseurRepo.findAll();
  }

  async getById(id) {
    const fournisseur = await fournisseurRepo.findById(id);
    if (!fournisseur) throw new Error("Fournisseur non trouvé");
    return fournisseur;
  }

  async update(id, data) {
    const validated = updateFournisseurSchema.parse(data);
    return await fournisseurRepo.update(id, validated);
  }

  async delete(id) {
    return await fournisseurRepo.delete(id);
  }
}

export default new FournisseurService();