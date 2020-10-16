import { Injectable } from '@angular/core';
import { Order } from '../interfaces/Order.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  postNewOrder(order: Order) {
    this.http.post(`${environment.dbBaseUrl}/orders`, order).subscribe(
      () => {
        this.toastr.success('Order placed!', 'Success!');
      },
      (err) => {
        this.toastr.error(`${err}`, 'Success!');
      }
    );
  }
}
