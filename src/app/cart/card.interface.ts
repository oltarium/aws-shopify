

export type CartItem = {
  cardId: number;
  productId: string;
  count: number,
}

export type Cart = {
  id?: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  status?: Status;
  items: CartItem[];
}
export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}
