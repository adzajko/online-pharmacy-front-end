import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// [Services]
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService,
    private _sidenav: SidenavService
  ) {}

  toggleActive: boolean = false;

  logOutUser() {
    this._auth.signOut();
  }

  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    this._sidenav.toggle();
  }

  ngOnInit(): void {}
}
