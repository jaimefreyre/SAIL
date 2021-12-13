import { Role } from './role';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: number;
  avatar: string;
  role?: Role;
  token?: string;
  is_staff?:boolean;
  is_superuser?:boolean;
  is_admin?:boolean;
  is_concession_admin?:boolean;
  is_business_manager?:boolean;
  is_active?:boolean;
}
