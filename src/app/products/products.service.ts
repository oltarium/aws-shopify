import { Injectable } from '@angular/core';

import { EMPTY, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './product.interface';

import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  createNewProduct(product: Product): Observable<Product> {
    const url = this.getUrl('bff', 'products');
    return this.http.post<Product>(url, product);
  }

  editProduct(id: string, changedProduct: Product): Observable<Product> {
    const url = this.getUrl('bff', `products/${id}`);
    return this.http.put<Product>(url, changedProduct);
  }

  getProductById(id: string): Observable<Product | null> {
    const url = this.getUrl('bff', `products/${id}`);
    return this.http.get<{ product: Product }>(url).pipe(
      map(({ productItem, stockItem }: any) => ({
        count: stockItem.count.N,
        description: productItem.description.S,
        id: productItem.id.S,
        price: productItem.price.N,
        title: productItem.title.S,
      }))
    );
  }

  getProducts(): Observable<Product[]> {
    return of([
      { id: "2", title: 'Fishing Rod', price: 50, count: 3, description: 'Modern fishing rod' },
      { id: "3", title: 'Hooks', price: 5, count: 12, description: 'Set of hooks' },
      { id: "4", title: 'Fishing boots', price: 15, count: 4, description: 'Resin boots' },
    ]);
    const url = this.getUrl('bff', 'products');
    return this.http.get<Product[]>(url).pipe(
      map(({ productsList, stocksList }: any) => {
        const it: Product[] = productsList.map((product: any) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const stock: any = stocksList.find(
            (s: any) => s.product_id.S === product.id.S
          );
          return {
            count: stock.count.N,
            description: product.description.S,
            id: product.id.S,
            price: product.price.N,
            title: product.title.S,
          };
        });
        return it;
      })
    );
  }

  getProductsForCheckout(ids: string[]): Observable<Product[]> {
    if (!ids.length) {
      return of([]);
    }

    return this.getProducts().pipe(
      map((products) => products.filter((product) => ids.includes(product.id)))
    );
  }
}
