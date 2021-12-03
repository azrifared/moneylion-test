import * as mongoDb from 'mongodb';
import { User } from '../entities/User';

export function buildUserData(overrides: Partial<User> = {}): User {
  return {
    id: new mongoDb.ObjectId('61a757da97d0e00bc018e220'),
    name: 'Test User',
    email: 'test@user',
    roleName: 'Product Manager',
    roleId: 1,
    featuresPermission: [
      {
        featureName: 'Booking',
        canAccess: true,
      },
    ],
    ...overrides,
  };
}
