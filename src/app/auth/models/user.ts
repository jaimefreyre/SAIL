import { Role } from './role';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: Role;
  token?: string;
  is_staff?:boolean;
  is_superuser?:boolean;
  is_admin?:boolean;
  is_concession_admin?:boolean;
  is_business_manager?:boolean;
  is_active?:boolean;
}
