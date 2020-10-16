import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loginUser() {
    const { username, password } = this.loginForm.value;
    this.authService.signIn(username, password);
  }

  passwordReset(resetForm: NgForm) {
    this.authService.resetPassword(resetForm.value.recoveryEmail);
  }

  ngOnInit() {}
}
