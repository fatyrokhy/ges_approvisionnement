import { z } from 'zod';

export const createApprovisionnementSchema = z.object({
  quantite: z.number().int().positive("La quantité doit être supérieure à 0"),
  fournisseurId: z.number().int().positive("ID fournisseur invalide"),
  produitId: z.number().int().positive("ID produit invalide"),
  // date sera gérée automatiquement par le backend
});