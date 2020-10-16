import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserRoles(email: string) {
    return this.http.get(`${environment.dbBaseUrl}/users?email=${email}`);
  }

  createNewUser(user: User) {
    this.http.post(`${environment.dbBaseUrl}/users`, user).subscribe((res) => {
      console.log(res);
    });
  }
}
