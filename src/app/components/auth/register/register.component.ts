import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
    deliveryAddress: new FormControl('', Validators.required),
  });

  onRegisterUser() {
    const { username, password, deliveryAddress } = this.registerForm.value;
    this.authService.signUp(username, password);
    this.userService.createNewUser({
      id: uuid(),
      email: username,
      roles: ['User'],
      deliveryAddress: deliveryAddress,
    });
  }

  ngOnInit(): void {}
}
