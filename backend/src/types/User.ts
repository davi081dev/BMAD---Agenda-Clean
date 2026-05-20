// User interfaces - placeholder para Story 1.3
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name: string;
  role?: 'client' | 'admin';
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  role?: 'client' | 'admin';
}
