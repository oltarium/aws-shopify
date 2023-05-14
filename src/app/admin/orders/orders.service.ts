import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './order.interface';
import { ApiService } from '../../core/api.service';

@Injectable({
  providedIn: "root"
})
export class OrdersService extends ApiService {
  getOrders(): Observable<Order[]> {
    const url = this.getUrl('cart', 'orders');
    return this.http.get<Order[]>(`${url}`, {
      params: {
        userId: localStorage.getItem('USERID') || '',
      },
    });
  }

  deleteOrder(orderId: string | undefined): Observable<boolean> {
    const url = this.getUrl('cart', 'orders');
    return this.http.delete<boolean>(`${url}/${orderId}`, {
      params: {
        userId: localStorage.getItem('USERID') || '',
      },
    });
  }
}
