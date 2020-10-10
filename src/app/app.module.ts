// [Modules]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// [Components]
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UsersComponent } from './components/pages/users/users.component';
import { PharmaciesComponent } from './components/pages/pharmacies/pharmacies.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { CatalogueComponent } from './components/pages/catalogue/catalogue.component';
import { SubscriptionsComponent } from './components/pages/subscriptions/subscriptions.component';
import { PrescriptionsComponent } from './components/pages/prescriptions/prescriptions.component';

// [Firebase Imports]
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

// [Environment]
import { environment } from '../environments/environment';

// [Service Providers]
import { SidenavService } from './services/sidenav.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    PharmaciesComponent,
    ProductsComponent,
    OrdersComponent,
    CatalogueComponent,
    SubscriptionsComponent,
    PrescriptionsComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToastrModule,
    HttpClientModule,
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent],
})
export class AppModule {}
