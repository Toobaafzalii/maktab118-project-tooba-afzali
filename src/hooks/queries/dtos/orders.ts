export interface OrdersDto {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    orders: Array<OrderDto>;
  };
}

export interface OrderDto {
  _id: string;
  user: string;
  products: Array<OrderProductDto>;
  totalPrice: number;
  deliveryDate: Date;
  deliveryStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProductDto {
  product: string;
  count: number;
  _id: string;
}
