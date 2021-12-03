import { signToken } from '../utils/jwt';
import { User } from '../entities/User';
import { JWT_SECRET } from '../config';

export async function generateToken(user: User) {
  try {
    const token = await signToken(user, JWT_SECRET);
    return token;
  } catch (error) {
    console.error(`Error! Failed during token signing. ${error.message}`);
  }
}
