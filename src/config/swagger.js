import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Gestion des Approvisionnements",
    version: "1.0.0",
    description: `
      API RESTful pour la gestion des approvisionnements d'une boutique.
      Développée avec Node.js, Express, Prisma + PostgreSQL.
    `,
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Serveur local",
    },
    // Ajoute ton URL de production ici plus tard
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  // security: [{ bearerAuth: [] }], // Décommente si tu ajoutes l'authentification plus tard
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // On met seulement les routes pour plus de clarté
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;