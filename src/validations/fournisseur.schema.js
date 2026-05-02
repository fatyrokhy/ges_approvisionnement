import { z } from 'zod';

export const createFournisseurSchema = z.object({
  nom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  telephone: z.string().trim().min(8, "Le numéro de téléphone est invalide"),
  adresse: z.string().trim().min(5, "L'adresse doit contenir au moins 5 caractères"),
});

export const updateFournisseurSchema = createFournisseurSchema.partial();