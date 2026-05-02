
import { errorResponse } from '../utils/reponse.utils.js';

 const validate = (schema) => (req, res, next) => {
  try {
    // Pour les requêtes avec fichiers (multipart/form-data)
    const data = req.body;
    
    schema.parse(data);
    next();
  } catch (error) {
    const errors = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));

    return errorResponse(res, "Données invalides", 400, errors);
  }
};

export default validate;

// import { error } from '../utils/reponse.utils.js';
// const validate = (schema) => (req, res, next) => {
//   const result = schema.safeParse(req.body);

//   if (!result.success) {
//     const issues = result.error?.errors || result.error?.issues || [];

//     const messages = issues.map(e => e.message).join(', ') || 'Données invalides';

//     return error(res, messages, 400);
//   }

//   req.body = result.data;
//   next();
// };
