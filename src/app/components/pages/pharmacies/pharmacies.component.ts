import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pharmacy } from '../../../interfaces/Pharmacy.interface';
import { PharmacyService } from '../../../services/pharmacy.service';
import * as uuid from 'uuid';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.scss'],
})
export class PharmaciesComponent implements OnInit, OnDestroy, AfterViewInit {
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    worksFrom: new FormControl('', Validators.required),
    worksTo: new FormControl('', Validators.required),
    f_NightShift: new FormControl(false, Validators.required),
  });

  pharmaciesSubscription: Subscription;
  pharmaciesDataSource = new MatTableDataSource<Pharmacy>();
  columnsToDisplay = [
    'name',
    'address',
    'worksFrom',
    'worksTo',
    'f_NightShift',
  ];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _ps: PharmacyService) {}

  ngAfterViewInit() {
    this.pharmaciesDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this._ps.getAllPharmacies();
    this.pharmaciesSubscription = this._ps.pharmaciesChanged.subscribe(
      (pharmacies: Pharmacy[]) => {
        this.pharmaciesDataSource.data = pharmacies;
      }
    );
  }

  ngOnDestroy() {
    this.pharmaciesSubscription.unsubscribe();
  }

  filterPharmacies(filterInput: string) {
    this.pharmaciesDataSource.filter = filterInput.trim().toLowerCase();
  }

  onSubmitPharmacy() {
    this._ps.postPharmacy({
      id: uuid(),
      ...this.productForm.value,
    });
  }
}
