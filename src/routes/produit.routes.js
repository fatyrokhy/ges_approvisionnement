import express from 'express';
import produitController from '../controllers/produit.controller.js';
import validate from '../middlewares/validate.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import { createProduitSchema, updateProduitSchema, stockUpdateSchema } from '../validations/produit.schema.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();
router.use(authMiddleware);

/**
 * ====================== ROUTE SPÉCIALE UPLOAD IMAGE ======================
 * @swagger
 * /api/produits/upload:
 *   post:
 *     summary: Créer un produit avec upload d'image sur Cloudinary
 *     tags: [Produits]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [libelle, prixUnitaire, image]
 *             properties:
 *               libelle:
 *                 type: string
 *               prixUnitaire:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201: { description: Produit créé avec image }
 *       400: { description: Données invalides }
 */
router.post('/upload',
  authorize('admin'),
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Aucune image envoyée" });
      }

      const produitData = {
        libelle: req.body.libelle,
        prixUnitaire: parseFloat(req.body.prixUnitaire),
        image: req.file.path // URL Cloudinary
      };

      // On passe les données au controller
      req.body = produitData;
      next();
    } catch (error) {
      next(error);
    }
  },
  validate(createProduitSchema),
  produitController.create
);

 /* @swagger
 * /api/produits:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [libelle, prixUnitaire]
 *             properties:
 *               libelle: { type: string }
 *               prixUnitaire: { type: number }
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201: { description: Produit créé }
 */
router.post('/', authorize('admin'), validate(createProduitSchema), produitController.create);

/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Liste tous les produits
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Liste des produits }
 */
router.get('/', produitController.getAll);

/**
 * @swagger
 * /api/produits/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.get('/:id', produitController.getById);

/**
 * @swagger
 * /api/produits/{id}:
 *   put:
 *     summary: Modifier un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.put('/:id', authorize('admin'), validate(updateProduitSchema), produitController.update);
router.patch('/:id', authorize('admin'), validate(updateProduitSchema), produitController.update);

/**
 * @swagger
 * /api/produits/{id}/increment:
 *   patch:
 *     summary: Augmenter le stock d'un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.patch('/:id/increment', authorize('admin'), validate(stockUpdateSchema), produitController.incrementStock);

/**
 * @swagger
 * /api/produits/{id}/decrement:
 *   patch:
 *     summary: Diminuer le stock d'un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.patch('/:id/decrement', authorize('admin'), validate(stockUpdateSchema), produitController.decrementStock);

/**
 * @swagger
 * /api/produits/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.delete('/:id', authorize('admin'), produitController.delete);

export default router;