import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-bucket-shipping-form',
  templateUrl: './order-shipping-form.component.html',
  styleUrls: ['./order-shipping-form.component.scss'],
})
export class OrderShippingFormComponent {
  @Input() shippingInfo!: UntypedFormGroup;

  @Output() nextStep = new EventEmitter<void>();
}
