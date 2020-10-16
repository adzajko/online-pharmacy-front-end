import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// [Services]
import { AuthService } from '../../../services/auth.service';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private sidenavService: SidenavService
  ) {}

  toggleActive: boolean = false;
  currentUser: Subscription;
  isLogged: boolean = false;

  logOutUser() {
    this.authService.signOut();
  }

  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    this.sidenavService.toggle();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser().subscribe((user) => {
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
