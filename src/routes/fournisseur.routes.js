import express from 'express';
import fournisseurController from '../controllers/fournisseur.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createFournisseurSchema, updateFournisseurSchema } from '../validations/fournisseur.schema.js';

const router = express.Router();

/**
 * @swagger
 * /api/fournisseurs:
 *   post:
 *     summary: Créer un nouveau fournisseur
 *     tags: [Fournisseurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, telephone, adresse]
 *             properties:
 *               nom: { type: string }
 *               telephone: { type: string }
 *               adresse: { type: string }
 *     responses:
 *       201: { description: Fournisseur créé avec succès }
 *       400: { description: Données invalides }
 */
router.post('/', validate(createFournisseurSchema), fournisseurController.create);

/**
 * @swagger
 * /api/fournisseurs:
 *   get:
 *     summary: Récupérer la liste de tous les fournisseurs
 *     tags: [Fournisseurs]
 *     responses:
 *       200: { description: Liste des fournisseurs }
 */
router.get('/', fournisseurController.getAll);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   get:
 *     summary: Récupérer un fournisseur par son ID
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Détails du fournisseur }
 *       404: { description: Fournisseur non trouvé }
 */
router.get('/:id', fournisseurController.getById);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   put:
 *     summary: Modifier un fournisseur
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom: { type: string }
 *               telephone: { type: string }
 *               adresse: { type: string }
 *     responses:
 *       200: { description: Fournisseur modifié }
 */
router.put('/:id', validate(updateFournisseurSchema), fournisseurController.update);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   delete:
 *     summary: Supprimer un fournisseur
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Fournisseur supprimé }
 */
router.delete('/:id', fournisseurController.delete);

export default router;