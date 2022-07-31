import {Role} from './role';


export interface UserToken {
  id: number;
  username: string;
  password: string;
  confirmPassword?: string;
  accessToken?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  phone: string;
  enabled?: boolean;
  roles: Role[];
}
