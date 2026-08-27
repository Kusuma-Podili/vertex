import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole, UpdateUserProfileDto } from '@enterprise/types';

export interface InternalUser {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  private users: InternalUser[] = [
    {
      id: 'usr-admin-01',
      email: 'admin@ecommerce-enterprise.internal',
      passwordHash: 'salt:hash',
      firstName: 'Alexander',
      lastName: 'Wright',
      role: UserRole.SUPER_ADMIN,
      isActive: true,
      isEmailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr-customer-john',
      email: 'john.doe@enterprise-dev.com',
      passwordHash: 'salt:hash',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CUSTOMER,
      isActive: true,
      isEmailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  async findByEmail(email: string): Promise<InternalUser | undefined> {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  async findById(id: string): Promise<InternalUser | undefined> {
    return this.users.find(u => u.id === id);
  }

  async create(user: Partial<InternalUser>): Promise<InternalUser> {
    const newUser: InternalUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      email: user.email!,
      passwordHash: user.passwordHash!,
      firstName: user.firstName!,
      lastName: user.lastName!,
      phoneNumber: user.phoneNumber,
      role: user.role || UserRole.CUSTOMER,
      isActive: true,
      isEmailVerified: false,
      twoFactorEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateProfile(userId: string, dto: UpdateUserProfileDto) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, dto, { updatedAt: new Date() });
    return user;
  }
}
