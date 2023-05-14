import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, merge, Observable } from "rxjs";
import { Cart, CartItem } from '../cart/card.interface';
import { CartService } from '../cart/cart.service';
import { Product, ProductCheckout } from '../products/product.interface';
import { ProductsService } from '../products/products.service';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CardStoreService {
  cardItems$ = new BehaviorSubject<CartItem[]>([]);
  totalInCart$ = new BehaviorSubject<number>(0);
  products$ = new BehaviorSubject<Product[]>([]);
  totalCount = 0;

  cardProducts: Product[] = [];
  cardItems: CartItem[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductsService
  ) {}

  clearData() {
    this.totalInCart$.next(0)
    this.cardItems = [];
    this.cardItems$.next([]);
  }

  getCheckoutCardItems(): Observable<ProductCheckout[]> {
    return this.cardItems$.pipe(
      map((items) =>
        items.map((cardItem) => {
          const product = this.cardProducts.find(
            (t) => t.id === cardItem.productId
          );
          const count = cardItem?.count || 0;
          const price = product?.price || 0;
          return {
            id: product?.id || '',
            count: product?.count || 0,
            description: product?.description || '',
            price: product?.price || 0,
            title: product?.title || '',
            orderedCount: count,
            totalPrice: count * price,
          };
        })
      )
    );
  }
  loadProducts() {
    this.productService.getProducts().subscribe((prods) => {
      this.products$.next(prods);
    });
  }

  async loadData() {
    const prods$ = await this.productService.getProducts();
    const products = await lastValueFrom(prods$);
    this.products$.next(products);
    this.cardProducts = products;
    const card$ = await this.cartService.getCard();
    const card = await lastValueFrom(card$);
    this.cardItems$.next(card.items);
    this.cardItems = card.items;
    const uniqItems = new Set(card.items.map((it) => it.productId));
    this.totalInCart$.next(uniqItems.size);
    this.totalCount = uniqItems.size;
  }

  updateTotalCount(delta: number) {
    this.totalInCart$.next(this.totalCount + delta);
    this.totalCount = this.totalCount + delta;
  }

  async addItem(product: Product) {
    const countInCart = this.cardItems.find(a => a.productId === product.id)?.count || 0;
    if (countInCart === 0) {
      await this.cartService.addItem(product.id);
      this.updateTotalCount(1);
      const items = this.cardItems.concat([{productId: product.id, count: 1, cardId: 0}]);
      this.cardItems$.next(items)
      this.cardItems = items;
    } else {
      await this.cartService.updateItem(product.id, countInCart + 1);
      const updatedItems = this.cardItems.map(m => {
        if (m.productId === product.id) {
          return {
            ...m,
            count: m.count + 1,
          }
        }
        return m;
      });
      this.cardItems = updatedItems;
      this.cardItems$.next(updatedItems);
    }
  }

  async removeItem(product: Product) {
    const countInCart = this.cardItems.find(a => a.productId === product.id)?.count || 0;
    if (countInCart >= 2) {
      await this.cartService.updateItem(product.id, countInCart - 1);
      const updatedItems = this.cardItems.map(m => {
        if (m.productId === product.id) {
          return {
            ...m,
            count: m.count - 1,
          }
        }
        return m;
      });
      this.cardItems$.next(updatedItems);
      this.cardItems = updatedItems;
    } else {
      await this.cartService.removeItem(product.id);
      const items = this.cardItems.filter(i => i.productId !== product.id);
      this.cardItems$.next(items);
      this.cardItems = items;
      this.totalInCart$.next(items.length);
      this.totalCount = items.length;
    }

    if (countInCart === 0) {
      this.updateTotalCount(-1);
    }
  }

  placeOrder(order: { delivery: string; comments: string; }) {
    return this.cartService.placeOrder({...order, total: this.totalCount}).pipe(tap(() => {
      this.cardItems$.next([]);
      this.cardItems = [];
      this.totalCount = 0;
      this.totalInCart$.next(0);
    }));
  }
}
