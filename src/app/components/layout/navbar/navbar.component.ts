import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  logOutUser() {
    this._auth.signOut().subscribe(() => {
      this._auth.getUsername().subscribe((data) => console.log(data)); // Temporary
    });
  }

  ngOnInit(): void {}
}
