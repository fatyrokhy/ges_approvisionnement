import approvisionnementRepo from '../repositories/approvisionnement.repo.js';
import { createApprovisionnementSchema } from '../validations/approvisionnement.schema.js';

class ApprovisionnementService {
  async create(data) {
    try {
      const validated = createApprovisionnementSchema.parse(data);

      // Création avec mise à jour automatique du stock
      const approvisionnement = await approvisionnementRepo.createWithStockUpdate(validated);

      return approvisionnement;
    } catch (error) {
      if (error.name === 'ZodError') {
        throw new Error(error.errors[0].message);
      }
      throw error;
    }
  }

  async getAll() {
    return await approvisionnementRepo.findAllWithRelations();
  }

  async getById(id) {
    const appro = await approvisionnementRepo.findById(id, {
      fournisseur: true,
      produit: true
    });

    if (!appro) {
      throw new Error("Approvisionnement non trouvé");
    }

    return appro;
  }

  async delete(id) {
    // Note : Dans un vrai projet, on pourrait empêcher la suppression 
    // si on veut garder l'historique des stocks
    return await approvisionnementRepo.delete(id);
  }
}

export default new ApprovisionnementService();