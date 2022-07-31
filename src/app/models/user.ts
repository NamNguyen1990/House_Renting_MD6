import {Role} from './role';


export interface User {
  id?: number;
  username?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  phone: string;
  enabled?: boolean;
  roles?: [Role];
  imageUrls?: string;
}
