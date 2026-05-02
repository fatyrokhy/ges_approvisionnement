import { errorResponse } from '../utils/reponse.utils.js';

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return errorResponse(res, 'Accès non autorisé', 401);
  }

  if (!allowedRoles.includes(req.user.role)) {
    return errorResponse(res, 'Permission insuffisante', 403);
  }

  next();
};

export default authorize;