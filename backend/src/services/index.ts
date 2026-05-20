// Auth Service placeholder - será implementado em Story 2.1
export class AuthService {
  static async validateToken(_token: string): Promise<boolean> {
    // To be implemented in Story 2.1
    return false;
  }

  static async generateToken(_userId: string): Promise<string> {
    // To be implemented in Story 2.1
    throw new Error('Not implemented');
  }
}

export default AuthService;
