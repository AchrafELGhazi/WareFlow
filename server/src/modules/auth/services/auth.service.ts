import { PrismaClient, User, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async signup(
    username: string,
    password: string,
    email?: string
  ): Promise<{ user: any; token: string }> {
    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      throw new Error('Username already taken');
    }

    if (email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        throw new Error('Email already registered');
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const role = email === ADMIN_EMAIL ? UserRole.ADMIN : UserRole.CLIENT;

    const result = await this.prisma.$transaction(async prisma => {
      const user = await prisma.user.create({
        data: {
          userId: uuidv4(),
          username,
          passwordHash,
          email,
          role,
        },
      });

      if (role === UserRole.CLIENT) {
        await prisma.client.create({
          data: {
            clientId: uuidv4(),
            userId: user.userId,
            accountStatus: 'active',
          },
        });
      }

      await prisma.profile.create({
        data: {
          profileId: uuidv4(),
          userId: user.userId,
          language: 'en',
          timezone: 'UTC',
        },
      });

      return user;
    });

    const token = this.generateToken(result);

    await this.prisma.user.update({
      where: { userId: result.userId },
      data: { lastLogin: new Date() },
    });

    return {
      user: {
        userId: result.userId,
        username: result.username,
        email: result.email,
        role: result.role,
      },
      token,
    };
  }

  async login(
    username: string,
    password: string
  ): Promise<{ user: any; token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account is disabled. Please contact support.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);

    await this.prisma.user.update({
      where: { userId: user.userId },
      data: { lastLogin: new Date() },
    });

    return {
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, String(JWT_SECRET));
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  private generateToken(user: User): string {
    const payload = {
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const options: SignOptions = {
      expiresIn: '24h',
    };

    return jwt.sign(payload, JWT_SECRET as Secret, options);
  }
}

export default new AuthService();
