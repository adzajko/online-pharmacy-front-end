import { Injectable } from '@angular/core';
import { Order } from '../interfaces/Order.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _http: HttpClient, private _ts: ToastrService) {}

  postNewOrder(order: Order) {
    this._http.post(`${environment.dbBaseUrl}/orders`, order).subscribe(
      () => {
        this._ts.success('Order placed!', 'Success!');
      },
      (err) => {
        this._ts.error(`${err}`, 'Success!');
      }
    );
  }
}
