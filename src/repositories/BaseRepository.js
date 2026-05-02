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
      return this.model.findUnique({
        where: { id: parseInt(id) },
        include
      });
    }

    async update(id, data) {
      return this.model.update({
        where: { id: parseInt(id) },
        data
      });
    }

    async delete(id) {
      return this.model.delete({
        where: { id: parseInt(id) }
      });
    }
  }

  return BaseRepository;
};

export { createBaseRepository };