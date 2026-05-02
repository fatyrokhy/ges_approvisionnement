import fournisseurService from '../services/fournisseur.service.js';
import { successResponse, errorResponse } from '../utils/reponse.utils.js';

class FournisseurController {
  async create(req, res) {
    try {
      const fournisseur = await fournisseurService.create(req.body);
      successResponse(res, fournisseur, "Fournisseur créé avec succès", 201);
    } catch (error) {
      errorResponse(res, error.message, 400);
    }
  }

  async getAll(req, res) {
    try {
      const fournisseurs = await fournisseurService.getAll();
      successResponse(res, fournisseurs);
    } catch (error) {
      errorResponse(res, error.message);
    }
  }

  async getById(req, res) {
    try {
      const fournisseur = await fournisseurService.getById(req.params.id);
      successResponse(res, fournisseur);
    } catch (error) {
      errorResponse(res, error.message, 404);
    }
  }

  async update(req, res) {
    try {
      const fournisseur = await fournisseurService.update(req.params.id, req.body);
      successResponse(res, fournisseur, "Fournisseur modifié avec succès");
    } catch (error) {
      errorResponse(res, error.message, 400);
    }
  }

  async delete(req, res) {
    try {
      await fournisseurService.delete(req.params.id);
      successResponse(res, null, "Fournisseur supprimé avec succès");
    } catch (error) {
      errorResponse(res, error.message, 400);
    }
  }
}

export default new FournisseurController();