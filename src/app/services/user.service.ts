import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUserRoles(email: string) {
    return this._http.get(`${environment.dbBaseUrl}/users?email=${email}`);
  }

  createNewUser(user: User) {
    this._http.post(`${environment.dbBaseUrl}/users`, user).subscribe((res) => {
      console.log(res);
    });
  }
}
