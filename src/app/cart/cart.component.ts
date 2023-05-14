import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Product, ProductCheckout } from "../products/product.interface";
import { Observable } from "rxjs";
import { CartService } from "./cart.service";
import { map, shareReplay } from "rxjs/operators";
import { CardStoreService } from "../core/card-store.service";
import { ProductsService } from "../products/products.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class CartComponent implements OnInit {
  products$!: Observable<ProductCheckout[]>;
  totalPrice$!: Observable<number>;
  totalInCart$: Observable<number> = this.cardStoreService.totalInCart$;
  cartEmpty$: Observable<boolean> = this.cardStoreService.cardItems$.pipe(map(it => {
    return it.length === 0;
  }));

  shippingInfo!: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly cardStoreService: CardStoreService,
    private readonly router: Router
  ) {
  }

  get fullName(): string {
    const { firstName, lastName } = this.shippingInfo.value;
    return `${firstName} ${lastName}`;
  }

  get address(): string {
    return this.shippingInfo.value.address;
  }

  get comment(): string {
    return this.shippingInfo.value.comment;
  }

  ngOnInit(): void {
    this.shippingInfo = this.fb.group({
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      address: ["", Validators.required],
      comment: ""
    });

    this.products$ = this.cardStoreService.getCheckoutCardItems();

    this.totalPrice$ = this.products$.pipe(
      map((products) => {
        const total = products.reduce((acc, val) => acc + val.totalPrice, 0);
        return +total.toFixed(2);
      })
    );
  }

  async add(product: ProductCheckout) {
    await this.cardStoreService.addItem(product);
  }

  async remove(product: ProductCheckout) {
    await this.cardStoreService.removeItem(product);
  }

  placeOrder() {
    this.cardStoreService.placeOrder({
      delivery: this.shippingInfo.value,
      comments: this.comment,
    }).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
