import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _uService: UserService, private _auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      this._auth.getCurrentUser().subscribe((user) => {
        if (user) {
          this._uService.getUserRoles(user.email).subscribe((data) => {
            if (data[0].roles.includes('Admin')) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        }
      });
    });
  }
}
