import approvisionnementService from '../services/approvisionnement.service.js';
import { successResponse, errorResponse } from '../utils/reponse.utils.js';

class ApprovisionnementController {
  async create(req, res) {
    try {
      const approvisionnement = await approvisionnementService.create(req.body);
      successResponse(res, approvisionnement, "Approvisionnement enregistré avec succès", 201);
    } catch (error) {
      errorResponse(res, error.message, 400);
    }
  }

  async getAll(req, res) {
    try {
      const approvisionnements = await approvisionnementService.getAll();
      successResponse(res, approvisionnements);
    } catch (error) {
      errorResponse(res, error.message);
    }
  }

  async getById(req, res) {
    try {
      const appro = await approvisionnementService.getById(req.params.id);
      successResponse(res, appro);
    } catch (error) {
      errorResponse(res, error.message, 404);
    }
  }

  async delete(req, res) {
    try {
      await approvisionnementService.delete(req.params.id);
      successResponse(res, null, "Approvisionnement supprimé");
    } catch (error) {
      errorResponse(res, error.message, 400);
    }
  }
}

export default new ApprovisionnementController();