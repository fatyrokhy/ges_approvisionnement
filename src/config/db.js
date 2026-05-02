import prisma from './prisma.js';

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à PostgreSQL via Prisma réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};

export { connectDB };