import { Injectable } from '@angular/core';
import { Product } from "../products/product.interface";
import { EMPTY, Observable } from "rxjs";
import { User } from "./user.interface";
import { ApiService } from "../core/api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService {
  login(username: string, password: string): Observable<User> {
    const url = this.getUrl('cart', 'users/login');
    return this.http.post<User>(url, {
      username,
      password,
    });
  }

  signUp(username: string, password: string, name: string): Observable<boolean> {
    const url = this.getUrl('cart', 'users/signup');
    return this.http.post<boolean>(url, {
      username,
      password,
      name,
    });
  }

}
