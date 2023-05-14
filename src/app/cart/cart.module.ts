import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductItemCheckoutComponent } from './product-item-checkout/product-item-checkout.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { BucketCountControlsModule } from "../core/bucket-count-controls/bucket-count-controls.module";
import { OrderShippingFormComponent } from "./order-shipping-form/order-shipping-form.component";

@NgModule({
  declarations: [
    CartComponent,
    ProductItemCheckoutComponent,
    OrderSummaryComponent,
    OrderShippingFormComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BucketCountControlsModule
  ],
  exports: [CartComponent],
})
export class CartModule {}
