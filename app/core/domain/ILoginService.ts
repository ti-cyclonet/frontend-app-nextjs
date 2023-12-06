export interface ILoginService<T> {
  logIn(username: string, password: string): Promise<T | null>;
  logOut(token:string): Promise<void>;
  getUserRoles(username:string):Promise<string[]>;
}