const successResponse = (res, data, message = "Opération réussie", status = 200) => {
  res.status(status).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, message, status = 400) => {
  res.status(status).json({
    success: false,
    message
  });
};
export  { successResponse, errorResponse };