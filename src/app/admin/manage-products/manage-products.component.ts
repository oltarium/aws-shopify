import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../products/product.interface";
import { ProductsService } from "../../products/products.service";
import { ManageProductsService } from "./manage-products.service";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  selector: "app-manage-products",
  templateUrl: "./manage-products.component.html",
  styleUrls: ["./manage-products.component.scss"]
})
export class ManageProductsComponent implements OnInit {
  readonly columns = ["from", "description", "price", "count", "action"];

  selectedFile: File | null = null;

  products$!: Observable<Product[]>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly manageProductsService: ManageProductsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar
  ) {
  }

  openSnackBar(errorCode: number) {
    this.snackBar.open(errorCode === 401 ? 'Missed Token' : 'Invalid token', 'Undo')
  }

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  onUploadCSV(): void {
    if (!this.selectedFile) {
      return;
    }

    this.manageProductsService
      .uploadProductsCSV(this.selectedFile)
      .subscribe((data: any) => {
        this.selectedFile = null;
        this.cdr.markForCheck();
      }, (err: unknown) => {
        // @ts-ignore
        this.openSnackBar(err.status);
      });
  }
}

@Component({
  selector: 'app-snack-bar',
  templateUrl: 'snackbar.component.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class SnackComponent {
  snackBarRef = inject(MatSnackBarRef);

  errorMessage  = "";
}
