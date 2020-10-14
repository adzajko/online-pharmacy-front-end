import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsChanged = new Subject<Product[]>();

  constructor(private _http: HttpClient, private _ts: ToastrService) {}

  getAllProducts() {
    return from(this._http.get(`${environment.dbBaseUrl}/products`)).subscribe(
      (products: Product[]) => {
        this.productsChanged.next(products);
      }
    );
  }

  getProductById(id: number) {
    this._http.get(`${environment.dbBaseUrl}/products?id=${id}`);
  }

  postSingleProduct(product: Product) {
    return this._http
      .post(`${environment.dbBaseUrl}/products`, product)
      .subscribe(
        () => {
          this.getAllProducts();
          this._ts.success('Product saved!', 'Succeess!');
        },
        (err) => {
          this._ts.error(`${err}`, 'Error!');
        }
      );
  }
}
