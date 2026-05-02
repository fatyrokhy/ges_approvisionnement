import { z } from 'zod';

export const createProduitSchema = z.object({
  libelle: z.string().trim().min(2, "Le libellé doit contenir au moins 2 caractères"),
  prixUnitaire: z.number().positive("Le prix unitaire doit être positif"),
  image: z.string().url().optional(),
  // quantiteEnStock n'est pas requis à la création
});

export const updateProduitSchema = z.object({
  libelle: z.string().trim().min(2).optional(),
  prixUnitaire: z.number().positive().optional(),
  image: z.string().url().optional(),
});

export const stockUpdateSchema = z.object({
  quantite: z.number().int().positive("La quantité doit être un nombre positif"),
});