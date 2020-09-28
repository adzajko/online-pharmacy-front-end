import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/User.interface';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _auth: AngularFireAuth, private _http: HttpClient) {}

  getUsername() {
    return from(this._auth.currentUser);
  }

  getUserRoles(email: string) {
    return this._http.get(`${environment.dbBaseUrl}users?email=${email}`);
  }
}
