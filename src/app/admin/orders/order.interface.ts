import { ShippingInfo } from '../../cart/shipping-info.interface';
import { Status } from "../../cart/card.interface";

export enum OrderStatus {
  open = 'open',
  approved = 'approved',
  confirmed = 'confirmed',
  sent = 'sent',
  completed = 'completed',
  cancelled = 'cancelled',
}

export interface StatusHistory {
  status: OrderStatus;
  timestamp: string;
  comment: string;
}

export interface Order {
  id?: string;
  userId: number,
  cartId: number,
  status: Status,
  payment: any,
  delivery: ShippingInfo,
  total: number,
  comments: string
}
