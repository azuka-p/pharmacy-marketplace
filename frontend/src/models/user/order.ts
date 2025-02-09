export interface OrderPending {
  id: number;
  orders: OrderPendingDetail[];
  total_shipping_cost: string;
  total_price: string;
  address: string;
  created_at: string;
}

export interface OrderPendingDetail {
  id: number;
  pharmacy_id: number;
  pharmacy_name: string;
  shipping_cost: number;
  catalogs: OrderPendingCatalog[];
}

export interface OrderPendingCatalog {
  id: number;
  name: string;
  quantity: number;
  price: string;
}

export interface OrderPendingProps {
  id: number;
  orders: OrderPendingDetail[];
  shipping_cost: string;
  total_price: string;
}

export interface OrderResponse {
  id: number;
  status: string;
  pharmacy_name: string;
  address: string;
  created_at: string;
  total_price_shipping: string;
  total_price_product: string;
  order_items: OrderItems[];
}

export interface OrderItems {
  id: number;
  quantity: number;
  price: string;
  product_name: string;
  product_image: string;
}
