import { Injectable } from '@angular/core';
import { UserCredentials } from '../model/UserCredentials';
import { User, usersList } from '../model/users';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor() { }
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authStatus$ = this.authSubject.asObservable(); 
  private currentUserKey: string = 'currentUser';
  private usersKey: string = 'users';
  users:User[] = usersList;

  getAllUsers(){
    const allUsers = localStorage.getItem(this.usersKey);
    if(allUsers){
      return JSON.parse(allUsers); 
    }
    return null;
  } 

  setCurrentUserCredentials(credentials: UserCredentials): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(credentials)); 
    this.authSubject.next(true);
  }

  registerExistingUser():void{
    localStorage.setItem(this.usersKey,JSON.stringify(this.users));
  }

  getNewUserId(){
    return this.getAllUsers()[this.getAllUsers()?.length - 1].id + 1;
  }

  registerUser(user:User):void{
    usersList.push(user);
    localStorage.setItem(this.usersKey,JSON.stringify(usersList));
  }

  getCurrentUserCredentials(): UserCredentials | null {
    const storedData = localStorage.getItem(this.currentUserKey);
    if (storedData) {
      return JSON.parse(storedData); 
    }
    return null;
  }

  clearCurrentUserCredentials(): void {
    localStorage.removeItem(this.currentUserKey);  
    this.authSubject.next(false);
  }

  isAuthenticated(): boolean {
    const credentials = this.getCurrentUserCredentials();
    return credentials !== null && credentials.email !== '' && credentials.password !== '';
  }

  validateUser(credentials:UserCredentials){
    this.clearCurrentUserCredentials();
    let users = this.getAllUsers();
    let validUser = users.find((val:User)=> val.email ==credentials.email && val.password == credentials.password);
    if(validUser){
      this.setCurrentUserCredentials(validUser);
      return this.isAuthenticated();
    }
    return this.isAuthenticated();
  }

  
}
