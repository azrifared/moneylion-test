import * as mongoDb from 'mongodb';
import { User } from '../entities/User';

export const user: User = {
  id: new mongoDb.ObjectId('61a757da97d0e00bc018e220'),
  name: 'Test User',
  email: 'test@user',
  roleName: 'Product Manager',
  roleId: 1,
  featuresPermission: [],
};
