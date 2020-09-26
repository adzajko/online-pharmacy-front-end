import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  loginUser() {
    const { username, password } = this.loginForm.value;
    this._auth
      .signIn(username, password)
      .then(() => {
        this._toastr.success('Logged in!', 'Success!');
        this._router.navigate(['dashboard']);
      })
      .catch((e) => this._toastr.error(e.message, `Error: ${e.code}`));
  }

  ngOnInit() {}
}
