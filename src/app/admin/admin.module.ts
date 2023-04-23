import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MatTableModule } from '@angular/material/table';
import { OrdersService } from './orders/orders.service';
import { ManageProductsComponent, SnackComponent } from "./manage-products/manage-products.component";
import { MatButtonModule } from '@angular/material/button';
import { FilePickerModule } from '../shared/file-picker/file-picker.module';
import { ManageProductsService } from './manage-products/manage-products.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatSnackBarModule, MatSnackBarRef } from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    OrdersComponent,
    ManageProductsComponent,
    EditProductComponent,
    SnackComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FilePickerModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [OrdersService, ManageProductsService, {
    provide: MatSnackBarRef,
    useValue: {}
  },],
})
export class AdminModule {}
