import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  name: string;
  password: string;
};

// This is mockup, we will replace it with real user data
const users: User[] = [
  {
    id: '1',
    name: 'admin',
    password: 'admin',
  },
  {
    id: '2',
    name: 'Bob Doe',
    password: '654321',
  },
];

@Injectable()
export class UsersService {
  async findUserByName(name: string): Promise<User | undefined> {
    return users.find((user) => user.name === name);
  }
}
