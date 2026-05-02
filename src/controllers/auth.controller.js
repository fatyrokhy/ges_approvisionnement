import authService from '../services/auth.service.js';
import { successResponse, errorResponse } from '../utils/reponse.utils.js';

class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      successResponse(res, result, 'Utilisateur créé avec succès', 201);
    } catch (error) {
      errorResponse(res, error.message, 400);
    }
  }

  async login(req, res) {
    try {
      const result = await authService.login(req.body);
      successResponse(res, result, 'Connexion réussie');
    } catch (error) {
      errorResponse(res, error.message, 401);
    }
  }
}

export default new AuthController();