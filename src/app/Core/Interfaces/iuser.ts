import { IRole } from './irole';

export interface Iuser {
  id: string;
  name: string;
  userName: string;

  email: string;

  createdOn: string;

  roles: IRole;
}
