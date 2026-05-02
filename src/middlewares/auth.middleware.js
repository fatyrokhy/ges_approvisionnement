import { errorResponse } from '../utils/reponse.utils.js';
import TokenGenerator from '../config/jwt.js';

const tokenGenerator = new TokenGenerator();

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return errorResponse(res, 'Token d’authentification manquant', 401);
  }

  const token = authorization.split(' ')[1];

  try {
    const payload = tokenGenerator.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

export default authMiddleware;