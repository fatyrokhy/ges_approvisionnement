const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: "ID invalide" });
  }

  res.status(500).json({
    success: false,
    message: "Une erreur interne est survenue"
  });
};

export default  errorHandler;