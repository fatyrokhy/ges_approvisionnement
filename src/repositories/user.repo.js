import { createBaseRepository } from './BaseRepository.js';
import prisma from '../config/prisma.js';

const BaseRepository = createBaseRepository('user');

class UserRepository extends BaseRepository {
  constructor() {
    super();
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export default new UserRepository();