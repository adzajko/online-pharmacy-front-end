import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Pharmacy } from '../interfaces/Pharmacy.interface';
import { from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  pharmaciesChanged = new Subject<Pharmacy[]>();

  constructor(private _http: HttpClient, private _ts: ToastrService) {}

  getAllPharmacies() {
    return from(
      this._http.get(`${environment.dbBaseUrl}/pharmacies`)
    ).subscribe((pharmacies: Pharmacy[]) => {
      this.pharmaciesChanged.next(pharmacies);
    });
  }

  getPharmacyById(id: string) {
    return this._http.get(`${environment.dbBaseUrl}/pharmacies?id=${id}`);
  }

  postPharmacy(pharmacy: Pharmacy) {
    this._http.post(`${environment.dbBaseUrl}/pharmacies`, pharmacy).subscribe(
      () => {
        this.getAllPharmacies();
        this._ts.success('Pharmacy added!', 'Success!');
      },
      (err) => {
        this._ts.error(`${err}`, 'Error!');
      }
    );
  }
}
