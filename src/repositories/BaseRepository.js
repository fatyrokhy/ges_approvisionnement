import prisma from '../config/prisma.js';

const createBaseRepository = (modelName) => {
  const model = prisma[modelName];

  if (!model) {
    throw new Error(`Modèle ${modelName} non trouvé dans Prisma`);
  }

  class BaseRepository {
    constructor() {
      this.model = model;
    }

    async create(data) {
      return this.model.create({ data });
    }

    async findAll(include = {}) {
      return this.model.findMany({
        include,
        orderBy: { createdAt: 'desc' }
      });
    }

async findById(id, include = {}) {
  const parsedId = Number(id);
  if (isNaN(parsedId)) throw new Error("ID invalide");

  return this.model.findUnique({
    where: { id: parsedId },
    include
  });
}

async update(id, data) {
  const parsedId = Number(id);
  if (isNaN(parsedId)) throw new Error("ID invalide");

  try {
    return await this.model.update({
      where: { id: parsedId },
      data
    });
  } catch (error) {
    throw new Error("Produit non trouvé");
  }
}

async delete(id) {
  const parsedId = Number(id);
  if (isNaN(parsedId)) throw new Error("ID invalide");

  try {
    return await this.model.delete({
      where: { id: parseId(id) }
    });
  } catch {
    throw new Error("Produit non trouvé");
  }
}
}
  return BaseRepository;
};

export { createBaseRepository };