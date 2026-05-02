import bcrypt from 'bcrypt';
import TokenGenerator from '../config/jwt.js';
import userRepo from '../repositories/user.repo.js';
import { loginSchema, registerSchema } from '../validations/auth.schema.js';

const tokenGenerator = new TokenGenerator();

class AuthService {
  async register(data) {
    const validated = registerSchema.parse(data);

    const existingUser = await userRepo.findByEmail(validated.email);
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé');
    }

    const passwordHash = await bcrypt.hash(validated.password, 10);
    const user = await userRepo.create({
      email: validated.email,
      passwordHash,
      role: validated.role || 'user',
    });

    const token = tokenGenerator.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      token,
    };
  }

  async login(data) {
    const { email, password } = loginSchema.parse(data);

    const user = await userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const token = tokenGenerator.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      token,
    };
  }
}

export default new AuthService();