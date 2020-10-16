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

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getAllProducts() {
    return from(this.http.get(`${environment.dbBaseUrl}/products`)).subscribe(
      (products: Product[]) => {
        this.productsChanged.next(products);
      }
    );
  }

  getProductById(id: number) {
    this.http.get(`${environment.dbBaseUrl}/products?id=${id}`);
  }

  postSingleProduct(product: Product) {
    return this.http
      .post(`${environment.dbBaseUrl}/products`, product)
      .subscribe(
        () => {
          this.getAllProducts();
          this.toastr.success('Product saved!', 'Succeess!');
        },
        (err) => {
          this.toastr.error(`${err}`, 'Error!');
        }
      );
  }
}
