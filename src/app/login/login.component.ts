import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LoginService } from "./login.service";
import { User } from "./user.interface";
import { Router } from "@angular/router";
import { AuthService } from "../core/auth-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  usernameControl = new FormControl("");
  passwordControl = new FormControl("");

  constructor(private readonly loginService: LoginService, private readonly router: Router, private readonly authService: AuthService) {
  }

  login() {
    const username = this.usernameControl.getRawValue();
    const password = this.passwordControl.getRawValue();
    if (!username) {
      return;
    }
    if (!password) {
      return;
    }
    this.loginService.login(username, password).subscribe((data: any) => {
      localStorage.setItem("USERID", data.user.id.toString());
      localStorage.setItem("CARDID", data.cardId.toString());
      this.authService.setAuth(true);
      this.router.navigate(["/products"]);
    }, (error: unknown) => {
      alert('Invalid login')
    } );
  }
}
