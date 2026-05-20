// User Service placeholder - será implementado em Story 1.3
import { UserDTO, CreateUserInput, UpdateUserInput } from '../types/User.js';

export class UserService {
  static async getUserById(_id: string): Promise<UserDTO | null> {
    // To be implemented with Prisma in Story 1.3
    return null;
  }

  static async createUser(_data: CreateUserInput): Promise<UserDTO> {
    // To be implemented with Prisma in Story 1.3
    throw new Error('Not implemented');
  }

  static async updateUser(
    _id: string,
    _data: UpdateUserInput
  ): Promise<UserDTO | null> {
    // To be implemented with Prisma in Story 1.3
    return null;
  }

  static async deleteUser(_id: string): Promise<boolean> {
    // To be implemented with Prisma in Story 1.3
    return false;
  }
}

export default UserService;
