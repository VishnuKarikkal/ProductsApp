import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //backend URLs
  private _signupUrl='http://localhost:3000/auth/signupUser';
  private _signinUrl='http://localhost:3000/auth/loginCheck';

  constructor(private http:HttpClient) { }
  //to save user details on signup
  signup(user)
  {
    return this.http.post(this._signupUrl,{"user":user});
  }
  //to check for valid user on signin
  signin(user)
  {
    return this.http.post(this._signinUrl,{"user":user});
  }
  //for checking whether user signed in on not
  loggedIn()
  { 
    return !!localStorage.getItem('token');
  }
  //for fetching the token available in the localstorage
  getToken()
  {
    return localStorage.getItem('token');
  }
  //to identify the role of user signed in
  identifyUserRole()
  {
  let token=localStorage.getItem('token');

  if(!!token)
  {
    let decodedToken = jwt_decode(token);
    let userType=decodedToken['role'];
    if(userType=='admin')
    {
      return true;
    }
    else
    {
      return false;
    } 
  }
  else
  {
    return false;
  }

}

}
