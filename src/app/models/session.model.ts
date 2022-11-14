import { User } from './user.model';

export class Session {
    public access_token: string;
    public token_type: string;
    public expires_in: number;
    public user: User;
    //public Menu: User;
  }
