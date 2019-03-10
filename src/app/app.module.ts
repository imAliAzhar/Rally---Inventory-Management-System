import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { CoreModule } from './core/core.module';

import {
  MatButtonModule,
  MatInputModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatSliderModule
} from '@angular/material';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MaterialsComponent } from './materials/materials.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { OrdersComponent } from './orders/orders.component';
import { TableLoaderComponent } from './shared/table-loader/table-loader.component';
import { SupplierLoaderComponent } from './shared/supplier-loader/supplier-loader.component';
import { OrderLoaderComponent } from './shared/order-loader/order-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    SidebarComponent,
    MaterialsComponent,
    SuppliersComponent,
    OrdersComponent,
    TableLoaderComponent,
    SupplierLoaderComponent,
    OrderLoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatSliderModule,
    FormsModule,
    CoreModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule {}
