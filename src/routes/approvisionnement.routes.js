import express from 'express';
import approvisionnementController from '../controllers/approvisionnement.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createApprovisionnementSchema } from '../validations/approvisionnement.schema.js';

const router = express.Router();

/**
 * @swagger
 * /api/approvisionnements:
 *   post:
 *     summary: Enregistrer un nouvel approvisionnement (et incrémente le stock)
 *     tags: [Approvisionnements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantite, fournisseurId, produitId]
 *             properties:
 *               quantite: { type: integer }
 *               fournisseurId: { type: integer }
 *               produitId: { type: integer }
 *     responses:
 *       201: { description: Approvisionnement créé et stock mis à jour }
 */
router.post('/', validate(createApprovisionnementSchema), approvisionnementController.create);

/**
 * @swagger
 * /api/approvisionnements:
 *   get:
 *     summary: Liste tous les approvisionnements
 *     tags: [Approvisionnements]
 *     responses:
 *       200: { description: Liste des approvisionnements }
 */
router.get('/', approvisionnementController.getAll);

/**
 * @swagger
 * /api/approvisionnements/{id}:
 *   get:
 *     summary: Récupérer un approvisionnement par ID
 *     tags: [Approvisionnements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.get('/:id', approvisionnementController.getById);

/**
 * @swagger
 * /api/approvisionnements/{id}:
 *   delete:
 *     summary: Supprimer un approvisionnement
 *     tags: [Approvisionnements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.delete('/:id', approvisionnementController.delete);

export default router;