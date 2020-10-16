import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pharmacy } from 'src/app/interfaces/Pharmacy.interface';
import { PharmacyService } from '../../../services/pharmacy.service';
import { ProductService } from '../../../services/product.service';
import * as uuid from 'uuid';
import { Product } from 'src/app/interfaces/Product.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  medTypes = [
    'Liquid',
    'Tablet',
    'Capsules',
    'Topical',
    'Suppositories',
    'Drops',
    'Inhalers',
    'Injecitons',
    'Implants',
    'Patches',
  ];

  pharmacies: Pharmacy[];
  pharmacySubscription: Subscription;
  productSubscription: Subscription;
  productDataSource = new MatTableDataSource<Product>();
  displayedColumns = [
    'name',
    'type',
    'pharmacy',
    'price',
    'f_prescriptionOnly',
  ];

  constructor(
    private pharmacyService: PharmacyService,
    private productService: ProductService
  ) {}

  productForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    imagePath: new FormControl(null),
    pharmacy: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    f_prescriptionOnly: new FormControl(false, Validators.required),
  });

  filterProducts(filter: string) {
    this.productDataSource.filter = filter;
  }

  ngOnInit(): void {
    this.pharmacyService.getAllPharmacies();
    this.productService.getAllProducts();
    this.pharmacySubscription = this.pharmacyService.pharmaciesChanged.subscribe(
      (pharmacies: Pharmacy[]) => {
        this.pharmacies = pharmacies;
      }
    );
    this.productSubscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.productDataSource.data = products;
      }
    );
  }

  ngOnDestroy() {
    this.pharmacySubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.productDataSource.sort = this.sort;
  }

  onSubmitProduct() {
    this.productService.postSingleProduct({
      id: uuid(),
      ...this.productForm.value,
    });
    this.productForm.reset();
  }
}
