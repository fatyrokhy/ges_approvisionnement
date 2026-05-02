import { createBaseRepository } from './BaseRepository.js';
import prisma from '../config/prisma.js';

const BaseRepository = createBaseRepository('approvisionnement');

class ApprovisionnementRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Création d'un approvisionnement + mise à jour automatique du stock
   * Utilise une transaction pour garantir la cohérence des données
   */
  async createWithStockUpdate(data) {
    return prisma.$transaction(async (tx) => {
      // 1. Créer l'approvisionnement
      const approvisionnement = await tx.approvisionnement.create({
        data: {
          quantite: data.quantite,
          fournisseurId: parseInt(data.fournisseurId),
          produitId: parseInt(data.produitId),
        },
        include: {
          fournisseur: true,
          produit: true
        }
      });

      // 2. Mettre à jour le stock du produit
      await tx.produit.update({
        where: { id: parseInt(data.produitId) },
        data: {
          quantiteEnStock: {
            increment: parseInt(data.quantite)
          }
        }
      });

      return approvisionnement;
    });
  }

  async findAllWithRelations() {
    return prisma.approvisionnement.findMany({
      include: {
        fournisseur: true,
        produit: true
      },
      orderBy: {
        date: 'desc'
      }
    });
  }
}

export default new ApprovisionnementRepository();