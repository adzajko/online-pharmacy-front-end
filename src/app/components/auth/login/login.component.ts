import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  loginUser() {
    const { username, password } = this.loginForm.value;
    this._auth.signIn(username, password).subscribe(() => {
      this._auth.getUsername().subscribe((data) => console.log(data)); // Temporary
    });
  }

  ngOnInit() {}
}
