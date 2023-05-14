import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../core/api.service";
import { Cart } from "./card.interface";

@Injectable({
  providedIn: "root"
})
export class CartService extends ApiService {

  getCard(): Observable<Cart> {
    const url = this.getUrl("cart", "carts");
    return this.http.get<Cart>(`${url}`, {
      params: {
        userId: localStorage.getItem("USERID") || ""
      }
    });
  }

  addItem(productId: string): Promise<any> {
    const url = this.getUrl("cart", "carts");
    const cardId = localStorage.getItem("CARDID");
    return this.http.put(`${url}/${cardId}/items`, {
      userId: localStorage.getItem("USERID"),
      productId
    }).toPromise();
  }

  updateItem(productId: string, count: number): Promise<any> {
    const url = this.getUrl("cart", "carts");
    const cardId = localStorage.getItem("CARDID");
    return this.http.post(`${url}/${cardId}/items`, {
      userId: localStorage.getItem("USERID"),
      productId,
      count: count || 0
    }).toPromise();
  }

  removeItem(productId: string): Promise<any> {
    const url = this.getUrl("cart", "carts");
    const cardId = localStorage.getItem("CARDID");
    return this.http.delete(`${url}/${cardId}/items/${productId}`).toPromise();
  }

  placeOrder(order: any): Observable<any> {
    const url = this.getUrl("cart", "orders");
    const cardId = localStorage.getItem("CARDID");
    return this.http.put(`${url}`, {
      userId: localStorage.getItem("USERID"),
      cardId,
      payment: {},
      delivery: order.delivery,
      total: order.total,
      comments: order.comments
    });
  }
}
