import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// [Guards]
import { AuthGuard } from '../app/guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
// [Components]

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CatalogueComponent } from './components/pages/catalogue/catalogue.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { PharmaciesComponent } from './components/pages/pharmacies/pharmacies.component';
import { PrescriptionsComponent } from './components/pages/prescriptions/prescriptions.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { SubscriptionsComponent } from './components/pages/subscriptions/subscriptions.component';
import { UsersComponent } from './components/pages/users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'catalogue',
    component: CatalogueComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pharmacies',
    component: PharmaciesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prescriptions',
    component: PrescriptionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
