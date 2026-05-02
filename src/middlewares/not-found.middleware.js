import { errorResponse } from "../utils/reponse.utils.js";

const notFound = (req, res, next) => {
  return errorResponse(res, `Route ${req.originalUrl} introuvable`, 404);
};

export default notFound;
