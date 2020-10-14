import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

// [Services]
import { AuthService } from '../../../services/auth.service';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private _auth: AuthService, private _sidenav: SidenavService) {}

  toggleActive: boolean = false;
  currentUser: Subscription;
  isLogged: boolean = false;

  logOutUser() {
    this._auth.signOut();
  }

  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    this._sidenav.toggle();
  }

  ngOnInit(): void {
    this.currentUser = this._auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  ngOnDestroy() {
    this.currentUser.unsubscribe();
  }
}
