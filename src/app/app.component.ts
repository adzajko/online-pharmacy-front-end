import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('rightSidenav') public sidenav: MatSidenav;

  constructor(private _sidenav: SidenavService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._sidenav.setSidenav(this.sidenav);
  }
}
