import produitRepo from '../repositories/produit.repo.js';
import { createProduitSchema, updateProduitSchema, stockUpdateSchema } from '../validations/produit.schema.js';

class ProduitService {
  async create(data) {
    const validated = createProduitSchema.parse(data);
    return await produitRepo.create({
      ...validated,
      quantiteEnStock: 0 // par défaut
    });
  }

  async getAll() {
    return await produitRepo.findAll();
  }

//   async getById(id) {
//     const produit = await produitRepo.findById(id);
//     if (!produit) throw new Error("Produit non trouvé");
//     return produit;
//   }

  async getById(id) {
  const produit = await produitRepo.findById(Number(id));
  if (!produit) throw new Error("Produit non trouvé");
  return produit;
}

  async update(id, data) {
    const produit = await produitRepo.findById(id);
    if (!produit) throw new Error("Produit non trouvé");

    const validated = updateProduitSchema.parse(data);
    return await produitRepo.update(id, validated);
  }

  async delete(id) {
    const produit = await produitRepo.findById(id);
    if (!produit) throw new Error("Produit non trouvé");
    return await produitRepo.delete(id);
  }

  // Gestion du stock
  async incrementStock(id, data) {
    const produit = await produitRepo.findById(id);
    if (!produit) throw new Error("Produit non trouvé");

    const { quantite } = stockUpdateSchema.parse(data);
    return await produitRepo.incrementStock(id, quantite);
  }

  async decrementStock(id, data) {
    const produit = await produitRepo.findById(id);
    if (!produit) throw new Error("Produit non trouvé");

    const { quantite } = stockUpdateSchema.parse(data);

    if (produit.quantiteEnStock < quantite) {
      throw new Error("Stock insuffisant pour cette opération");
    }

    return await produitRepo.decrementStock(id, quantite);
  }
}

export default new ProduitService();