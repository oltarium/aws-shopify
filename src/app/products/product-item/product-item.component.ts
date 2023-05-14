import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Product } from "../product.interface";
import { CartService } from "../../cart/cart.service";
import { BucketCountControlsComponent } from "../../core/bucket-count-controls/bucket-count-controls.component";
import { CardStoreService } from "../../core/card-store.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"]
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() index!: number;

  @ViewChild("cartBtn", { static: false, read: ElementRef }) cartBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild("controls", { static: false }) countControls:
    | BucketCountControlsComponent
    | undefined;

  countInCart = 0;

  constructor(
    private readonly cartService: CartService,
    private readonly cardStoreService: CardStoreService
  ) {
  }

  get id(): string {
    return this.product.id;
  }

  ngOnInit(): void {
    this.cardStoreService.cardItems$
      .pipe(
        map(
          (epics) =>
            epics.filter((epic) => epic.productId === this.product.id)[0]
        )
      )
      .subscribe((card) => {
        this.countInCart = card?.count || 0;
      });
  }

  async add() {
    if (!localStorage.getItem('USERID')) {
      alert('To add items you need to login')
      return;
    }
    this.cardStoreService.addItem(this.product);
  }

  async remove() {
    this.cardStoreService.removeItem(this.product);
  }
}
