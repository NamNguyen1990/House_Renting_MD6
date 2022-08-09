import {Role} from './role';


export interface User {
  id?: number;
  username?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  email?: string;
  address?: string;
  fullName?: string;
  avatar?: string;
  enabled?: boolean;
  roles?: [Role];
}
