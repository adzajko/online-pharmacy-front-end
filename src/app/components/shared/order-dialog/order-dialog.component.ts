import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/Product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
  isLogged: boolean = false;

  orderForm = new FormGroup({
    name: new FormControl({ value: this.data.name, disabled: true }),
    pharmacy: new FormControl({ value: this.data.pharmacy, disabled: true }),
    deliveryDateTime: new FormControl(null, Validators.required),
    f_urgent: new FormControl(null, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  onOrderProduct() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.orderService.postNewOrder({
        id: uuid(),
        user: user.email,
        product: this.data.name,
        deliveryDateTime: this.orderForm.value.deliveryDateTime,
        f_urgent: this.orderForm.value.f_urgent,
        status: 'Active',
      });
    });
  }
}
