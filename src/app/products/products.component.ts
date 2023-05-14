import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable, of } from 'rxjs';
import { Product } from './product.interface';
import { CardStoreService } from "../core/card-store.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  readonly products$: Observable<Product[]> = this.cardStoreService.products$;

  constructor(private readonly cardStoreService: CardStoreService) {}

  ngOnInit(): void {
    this.cardStoreService.loadData()
  }
}
