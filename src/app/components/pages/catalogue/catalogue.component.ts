import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/Product.interface';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from '../../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../../shared/order-dialog/order-dialog.component';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSubscription: Subscription;

  constructor(private _pRs: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this._pRs.getAllProducts();
    this.productsSubscription = this._pRs.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  onOpenOrderDialog(product: Product) {
    this.dialog.open(OrderDialogComponent, {
      data: product,
    });
  }
}
