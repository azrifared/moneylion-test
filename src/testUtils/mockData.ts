
import * as mongoDb from 'mongodb';
import { User } from '../entities/User';

export const user: User = {
  id: new mongoDb.ObjectId('61a757da97d0e00bc018e220'),
  name: 'Azri Farid',
  email: 'azrifared8482@gmail.com',
  roleName: 'Product Manager',
  roleId: 1,
  featuresPermission: []
};
