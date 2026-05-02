import produitService from '../services/produit.service.js';
import { successResponse, errorResponse } from '../utils/reponse.utils.js';

class ProduitController {
  async create(req, res) {
    try {
      const produit = await produitService.create(req.body);
      successResponse(res, produit, "Produit créé avec succès", 201);
    } catch (error) {
      errorResponse(res, error.message, 400);
    }
  }

  async getAll(req, res) {
    try {
      const produits = await produitService.getAll();
      successResponse(res, produits);
    } catch (error) {
      errorResponse(res, error.message);
    }
  }

  async getById(req, res) {
    try {
      const produit = await produitService.getById(req.params.id);
      successResponse(res, produit);
    } catch (error) {
      errorResponse(res, error.message, 404);
    }
  }

  async update(req, res) {
    try {
      const produit = await produitService.update(req.params.id, req.body);
      successResponse(res, produit, "Produit modifié avec succès");
    } catch (error) {
      const status = error.message === "Produit non trouvé" ? 404 : 400;
      errorResponse(res, error.message, status);
    }
  }

  async delete(req, res) {
    try {
      await produitService.delete(req.params.id);
      successResponse(res, null, "Produit supprimé avec succès");
    } catch (error) {
      const status = error.message === "Produit non trouvé" ? 404 : 400;
      errorResponse(res, error.message, status);
    }
  }

  async incrementStock(req, res) {
    try {
      const produit = await produitService.incrementStock(req.params.id, req.body);
      successResponse(res, produit, "Stock incrémenté avec succès");
    } catch (error) {
      const status = error.message === "Produit non trouvé" ? 404 : 400;
      errorResponse(res, error.message, status);
    }
  }

  async decrementStock(req, res) {
    try {
      const produit = await produitService.decrementStock(req.params.id, req.body);
      successResponse(res, produit, "Stock décrémenté avec succès");
    } catch (error) {
      const status = error.message === "Produit non trouvé" ? 404 : 400;
      errorResponse(res, error.message, status);
    }
  }
}

export default new ProduitController();