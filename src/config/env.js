import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev_jwt_refresh_secret";

if (isProd && (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET)) {
  throw new Error(
    "Les variables d'environnement JWT_SECRET et JWT_REFRESH_SECRET doivent être définies en production"
  );
}

export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  HOST: isProd ? (process.env.HOST || "") : "localhost",
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_DURATION: process.env.JWT_DURATION || "15m",
  JWT_REFRESH_DURATION: process.env.JWT_REFRESH_DURATION || "30d",
};
