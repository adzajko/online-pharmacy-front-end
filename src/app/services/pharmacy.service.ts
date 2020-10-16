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

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getAllPharmacies() {
    return from(this.http.get(`${environment.dbBaseUrl}/pharmacies`)).subscribe(
      (pharmacies: Pharmacy[]) => {
        this.pharmaciesChanged.next(pharmacies);
      }
    );
  }

  getPharmacyById(id: string) {
    return this.http.get(`${environment.dbBaseUrl}/pharmacies?id=${id}`);
  }

  postPharmacy(pharmacy: Pharmacy) {
    this.http.post(`${environment.dbBaseUrl}/pharmacies`, pharmacy).subscribe(
      () => {
        this.getAllPharmacies();
        this.toastr.success('Pharmacy added!', 'Success!');
      },
      (err) => {
        this.toastr.error(`${err}`, 'Error!');
      }
    );
  }
}
