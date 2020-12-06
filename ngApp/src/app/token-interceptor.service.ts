import { Injectable,Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req:HttpRequest<any>,nxt:HttpHandler)
  {
    let usersService=this.injector.get(UsersService);
    if(usersService.getToken())   //check for valid token in localStorage
    {
      let tokenizedReq = req.clone(
        {
          setHeaders:
            {
            Authorization : `Bearer ${usersService.getToken()}`
            }
        }
                        );
      return nxt.handle(tokenizedReq);
    }
    else
    {   //if no token found
      return nxt.handle(req);
    }
                               
  }
}
