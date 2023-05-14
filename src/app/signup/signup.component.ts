import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  usernameControl = new FormControl('');
  passwordControl = new FormControl('');
  nameControl= new FormControl('');
  constructor(private readonly loginService: LoginService, private readonly router: Router) {}

  signUp() {
    const username = this.usernameControl.getRawValue();
    const password = this.passwordControl.getRawValue();
    const name = this.nameControl.getRawValue();
    if (!username) {
      return;
    }
    if (!password) {
      return;
    }
    if (!name) {
      return;
    }
    this.loginService.signUp(username, password, name).subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
