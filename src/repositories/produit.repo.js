import { createBaseRepository } from './BaseRepository.js';
import prisma from '../config/prisma.js';

const BaseRepository = createBaseRepository('produit');

class ProduitRepository extends BaseRepository {
  constructor() {
    super();
  }

  async incrementStock(id, quantite) {
    return prisma.produit.update({
      where: { id: parseInt(id) },
      data: { quantiteEnStock: { increment: parseInt(quantite) } }
    });
  }

  async decrementStock(id, quantite) {
    return prisma.produit.update({
      where: { id: parseInt(id) },
      data: { quantiteEnStock: { decrement: parseInt(quantite) } }
    });
  }
}

export default new ProduitRepository();