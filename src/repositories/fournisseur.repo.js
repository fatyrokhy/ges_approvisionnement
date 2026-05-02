import { createBaseRepository } from './BaseRepository.js';

const BaseRepository = createBaseRepository('fournisseur');

class FournisseurRepository extends BaseRepository {
  constructor() {
    super();
  }

  async findByTelephone(telephone) {
    return prisma.fournisseur.findUnique({
      where: { telephone }
    });
  }
}

export default new FournisseurRepository();