import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { Order } from './order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  readonly columns = ['from', 'count', 'address', 'status', 'action'];

  orders$ = new BehaviorSubject<Order[]>([]);

  constructor(private readonly ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((data) => {
      this.orders$.next(data);
    });
  }

  deleteOrder(order: Order) {
    this.ordersService.deleteOrder(order.id).pipe(switchMap(() => this.ordersService.getOrders())).subscribe(data => {
      this.orders$.next(data);
    })
  }
}
