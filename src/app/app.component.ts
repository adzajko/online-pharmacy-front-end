import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { AuthService } from './services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rightSidenav') public sidenav: MatSidenav;

  currentUser: Subscription;
  isLogged: boolean = false;

  constructor(private _sidenav: SidenavService, private _auth: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this._auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  ngAfterViewInit() {
    this._sidenav.setSidenav(this.sidenav);
  }

  ngOnDestroy() {
    this.currentUser.unsubscribe();
  }
}
