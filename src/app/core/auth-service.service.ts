import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  setAuth(isLogged: boolean) {
    this.auth$.next(isLogged);
  }
}
